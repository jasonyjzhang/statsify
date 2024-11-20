const express = require('express');
const session = require('express-session');
const axios = require('axios');
const dotenv = require('dotenv');

const app = express();
const port = 5001;

dotenv.config();
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // false for testing, remember to change this to true for production
}))

const CLIENT_ID = process.env.CLIENT_ID; // Spotify Client ID
const CLIENT_SECRET = process.env.CLIENT_SECRET; // Spotify Client Secret
const REDIRECT_URI = 'http://localhost:5001/callback'; // URI to redirect the user after authentication

// this block of code is responsible for setting up the authorization request and directing the user to the Spotify authorzation page
app.get('/auth', (req, res) => {
  // if user is already authenticated, direct them back to Time.js
  if (req.session.access_token && !isTokenExpired(req.session.token_expiration)) {
    console.log('already authenticated, redirecting to time.js');
    return res.redirect('http://localhost:3000/time');
  }
  // setup
  const scopes = "user-read-private user-read-email user-top-read user-read-recently-played";
  const authURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes}&response_type=code`; //repsonse_type=code Authorization Code Grant Flow for OAuth
  // redirect
  res.redirect(authURL);
});

// after authorization is complete, Spotify directs the user to REDIRECT_URI (which is the route below) with the query param 'code' which contains the authorization code

// this block of code is repsonsible for exchanging the authorization code for the access token and redirect the user to the frontend
app.get('/callback', async (req, res) => {
  const code = req.query.code;
  try {
    // exchange
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }));
    // extract access token
    const { access_token, expires_in} = tokenResponse.data;
    req.session.access_token = access_token;
    req.session.token_expiration = Date.now() + expires_in * 1000;
    res.redirect('http://localhost:3000/time')
    console.log('successfully received user access token');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while trying to authenticate with Spotify');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error('An error occurred while trying to log out');
      return res.status(500).send('Error logging out');
    }
    res.redirect('http://localhost:3000/');
  });
})

// checks if the access token is expired or not
const isTokenExpired = (expirationTime) => {
  return Date.now() > expirationTime;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});