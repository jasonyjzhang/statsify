const express = require('express');
const session = require('express-session');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5001;

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SESSION_SECRET } = process.env;

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    domain: '.jasonzhang.studio',
  },
}));

app.use(cors({
  origin: 'https://statsify.jasonzhang.studio',
  credentials: true,
}));

app.set('trust proxy', 1);

/*
this code handles the authorization process by checking if the user is already authenticated.
if the user has a valid access token that hasn't expired, they are redirected to time.js
otherwise, the user is redirected to the Spotify authorization page
*/
app.get('/auth', (req, res) => {
  // check access token and its validity
  if (req.session.access_token && !isTokenExpired(req.session.token_expiration)) {
    console.log('existing user, redirecting to /time');
    return res.redirect('https://statsify.jasonzhang.studio/time');
  }
  // authorization request setup
  const scopes = "user-read-private user-read-email user-top-read user-read-recently-played";
  // repsonse_type=code Authorization Code Grant Flow for OAuth
  const authURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes}&response_type=code&show_dialog=true`;
  // redirect
  console.log('new user, redirecting to Spotify Login');
  res.redirect(authURL);
});

// after authorization is complete, Spotify directs the user to REDIRECT_URI (which is the route below) with the query param 'code' which contains the authorization code

/*
this code handles the Spotify OAuth callback. it exchanges the authorization code received from Spotify for an access token,
stores the access token and its expiraton time in the session, and then fetches the user's profile information
finally, it redirects the user to time.js page
*/
app.get('/callback', async (req, res) => {
  try {
    // exchange
    const code = req.query.code;
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
    }));
    // stores access token and expiration in session
    const { access_token, expires_in } = tokenResponse.data;
    req.session.access_token = access_token;
    req.session.token_expiration = Date.now() + expires_in * 1000;
    console.log('successfully retrieved and stored user access token and token expiration');
    // fetches user profile information
    const userProfile = await getUserProfile(access_token);
    req.session.userId = userProfile.id;
    req.session.userData = { userProfile };
    console.log('redirecting from /callback to /time');
    // redirect
    res.redirect('https://statsify.jasonzhang.studio/time')
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while trying to authenticate with Spotify');
  }
});

// this helper function fetches the user's Spotify profile information
async function getUserProfile(access_token) {
  try {
    const userProfileResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const { display_name, email, followers, id, images, product} = userProfileResponse.data;
    console.log('successfully retrieved user profile');
    return {
      display_name,
      email,
      followers: followers.total,
      id,
      images: images && images.length > 0 ? images[0].url : null,
      product,
    };
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred while trying to fetch user profile data');
  }
}

// this helper function fetches the user's top track information
async function getTopTrack(access_token, time_range) {
  try {
    const topTrackResponse = await axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=1&time_range=${time_range}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const { total, items } = topTrackResponse.data;
    console.log('successfully retrieved top track');
    return {
      total,
      image: items[0].album.images[1].url,
      artist: items[0].artists[0].name,
      name: items[0].name,
      popularity: items[0].popularity
    };
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred while trying to fetch top track data');
  }
}

// this helper function fetches the user's top artist information
async function getTopArtist(access_token, time_range) {
  try {
    const topArtistResponse = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=1&time_range=${time_range}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const { total, items } = topArtistResponse.data;
    console.log('successfully retrieved top artist');
    return {
      total,
      image: items[0].images[1].url,
      name: items[0].name,
      popularity: items[0].popularity
    };
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred while trying to fetch top artist data');
  }
}

// this helper function fetches the most recently played song
async function getRecentlyPlayed(access_token) {
  try {
    const recentlyPlayedResponse = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const { items } = recentlyPlayedResponse.data;
    console.log('successfully retrieved recently played');
    return {
      image: items[0].track.album.images[1].url,
      artist: items[0].track.artists[0].name,
      name: items[0].track.name,
      popularity: items[0].track.popularity,
    };
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred while trying to fetch recently played data');
  }
}

/*
this code checks if the user's session is valid and if the session's token is expired (if it is, the session is cleared and the user is redirected to the login page)
if the session is valid, it fetches the user's top track, top artist, and recently played music based on the specified time_range
the data is either retrieved from the session cache or fetched from Spotify's API if not available (and cached)
*/
app.get('/get-data', async(req, res) => {
  console.log(req.session.token_expiration);
  try {
    if (!req.session || isTokenExpired(req.session.token_expiration)) {
      clearSession(req);
      console.log('session not valid or expired, redirecting to landing page');
      return res.redirect('https://statsify.jasonzhang.studio');
    }
    const { time_range = 'medium_term'} = req.query;
    const cachedData = req.session.userData[time_range] || {};
    const [topTrack, topArtist, recentlyPlayed] = await Promise.all([
      cachedData.topTrack || getTopTrack(req.session.access_token, time_range),
      cachedData.topArtist || getTopArtist(req.session.access_token, time_range),
      getRecentlyPlayed(req.session.access_token),
    ]);
    req.session.userData = {
      ...req.session.userData,
      [time_range] : {
        topTrack,
        topArtist,
        recentlyPlayed
      }
    };
    const responseData = {
      userProfile: req.session.userData.userProfile,
      ...req.session.userData[time_range],
    }
    res.json(responseData);
  } catch (error) {
    console.error('Error while fetching user data:', error);
    res.status(500).send('An error occurred while fetching user data');
  }
});

// this helper function checks if a token has expired
const isTokenExpired = (expirationTime) => {
  return Date.now() > expirationTime;
}

// this helper function clears a session
const clearSession = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error('An error occurred while trying to clear session');
      return res.status(500).send('Error clearing session');
    } else {
      res.clearCookie('connect.sid', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        domain: '.jasonzhang.studio',
      });
    }
    console.log('session cleared');
  })
}

app.get('/logout', clearSession);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});