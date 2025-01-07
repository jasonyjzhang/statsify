import { useEffect, useState } from "react";
import axios from "axios";
import UserIcon from "../assets/user-icon.svg";
import SpotifyIconWhite from "../assets/spotify-icon-white.svg";
import TrackIcon from "../assets/track-icon.svg";
import ArtistIcon from "../assets/artist-icon.svg";
import RankingIcon from "../assets/ranking-icon.svg";
import RankingBlock from "../components/RankingBlock";
import { waveform } from "ldrs";
waveform.register()

export default function Data({ timeRange }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`https://statsify-backend.jasonzhang.studio/get-data?time_range=${timeRange}`, { withCredentials: true })
      .then(response => {
        setUserData(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const displayName = userData && (userData.userProfile.display_name || userData.userProfile.email || "Spotify User");
  const subscriptionType = userData && `${userData.userProfile.product.charAt(0).toUpperCase() + userData.userProfile.product.slice(1)} Account`;
  const followerCount = userData && `${userData.userProfile.followers} ${userData.userProfile.followers < 2 ? 'Follower' : 'Followers'}`;
  const userPic = userData && (userData.userProfile.images || UserIcon);
  const timeToDisplay = (timeRange) => {
    switch (timeRange) {
      case "short_term":
        return "4 Weeks";
      case "medium_term":
        return "6 Months";
      case "long_term":
        return "All Time";
      default:
        return "6 Months";
    }
  }
  return (
    <div className={`w-full md:w-[600px] lg:w-[700px] ${loading && 'h-[100svh] flex justify-center items-center'}`}>
      {
        loading ?
        (<l-waveform size="50" stroke="5" speed="1" color="white"></l-waveform>) :
        (
          <div className={`mt-24 w-full space-y-16`}>

            <div className={`grid grid-cols-2 md:grid-cols-3 gap-4`}>

              <div className={`col-span-2 order-1 bg-gradient-summer rounded p-0.5`}>
                <span className={`flex items-center bg-dark rounded gap-x-4 p-3 md:p-4`}>
                  <img src={userPic} alt="user profile picture" className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded`}/>
                  <div className={`md:space-y-1`}>
                    <p className={`text-xl font-semibold`}>{displayName || name}</p>
                    <p className={`text-dark-gray`}>{subscriptionType || accountType}</p>
                    <p className={`text-dark-gray`}>{followerCount || followers}</p>
                  </div>
                </span>
              </div>

              <div className={`flex flex-col justify-center items-center order-5 md:order-2 border-2 border-border-gray rounded space-y-2`}>
                <img src={SpotifyIconWhite} alt="Spotify icon in white" className={`w-10 md:w-12`}/>
                <a href="https://open.spotify.com/user/spotify" target="_blank" rel="noopener noreferrer" className={`underline underline-offset-4`}>Open Spotify</a>
              </div>

              <div className={`flex flex-col items-center order-2 border-2 border-border-gray gap-y-2 md:gap-y-4 p-2 md:p-4 rounded`}>
                <img src={TrackIcon} alt="music note icon" className={`w-8 md:w-10`}/>
                <p className={`text-3xl text-custom-red`}>{numTracks || userData.topTrack.total}</p>
                <p className={`text-dark-gray`}>Unique Tracks</p>
              </div>

              <div className={`flex flex-col items-center order-3 border-2 border-border-gray gap-y-2 md:gap-y-4 p-2 md:p-4 rounded`}>
                <img src={ArtistIcon} alt="artist icon" className={`w-8 md:w-10`}/>
                <p className={`text-3xl text-custom-yellow`}>{numArtists || userData.topArtist.total}</p>
                <p className={`text-dark-gray`}>Unique Artists</p>
              </div>

              <div className={`flex flex-col items-center md:justify-end order-4 border-2 border-border-gray gap-y-2 md:gap-y-4 p-2 md:p-4 rounded`}>
                <div className={`text-center`}>
                  <p className={`text-lg`}>{recentSong || userData.recentlyPlayed.name}</p>
                  <p className={`text-dark-gray`}>{recentArtist || userData.recentlyPlayed.artist}</p>
                </div>
                <hr className={`w-full h-[1px] border-t-2 border-border-gray`}/>
                <p className={`text-dark-gray`}>Recently Played</p>
              </div>

            </div>

            <div>
              <div className={`flex items-center space-x-2 mb-4`}>
                <img src={RankingIcon} alt="ranking icon" className={`w-6 md:w-8`}/>
                <h2 className={`text-2xl font-semibold`}>Your Top 10 Tracks</h2>
              </div>
              {
                userData.topTracks.tracks.map((item, index) => {
                  return <RankingBlock key={index} ranking={index+1} track={item.name} artist={item.artist} image={item.image} popularity={item.popularity} isTrack={true}/>
                }
              )}
            </div>

            <div>
              <div className={`flex items-center space-x-2 mb-4`}>
                <img src={RankingIcon} alt="ranking icon" className={`w-6 md:w-8`}/>
                <h2 className={`text-2xl font-semibold`}>Your Top 10 Artists</h2>
              </div>
              {
                userData.topArtists.artists.map((item, index) => {
                  return <RankingBlock key={index} ranking={index+1} artist={item.name} image={item.image} popularity={item.popularity} isTrack={false}/>
                }
              )}
            </div>
          </div>
        )
      }
    </div>
  )
};