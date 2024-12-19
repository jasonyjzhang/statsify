import { useEffect, useState } from "react";
import axios from "axios";
import GradientBlock from "../components/GradientBlock";
import ImageBlock from "../components/ImageBlock";
import SpotifyIcon from "../assets/spotify-white.png";

export default function Data({ timeRange }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    axios.get(`https://statsify-backend.jasonzhang.studio/get-data?time_range=${timeRange}`, { withCredentials: true })
      .then(response => {
        setUserData(response.data);
        setDisplayName(response.data.userProfile.display_name || response.data.userProfile.email || "Spotify User");
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [timeRange]);

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

  const checkStrLength = (string) => {
    let fontSize;
    if (string.length <= 10) {
      fontSize = 'text-[1.5rem] lg:text-[1.75rem]';
    } else if (string.length <= 14) {
      fontSize = 'text-[1.25rem] lg:text-[1.5rem]';
    } else if (string.length <= 20) {
      fontSize = 'text-[1rem] lg:text-[1.25rem]';
    } else {
      fontSize = 'text-[0.75rem] lg:text-[1rem]';
    }
    return fontSize;
  }

  return (
    <div className={`h-[100svh] md:h-[100vh] w-full md:w-[600px] lg:w-[700px] md:flex md:flex-col md:justify-center pt-20 md:pt-14`}>
      {
        loading ?
        (<p className={`flex gradient-text justify-center text-[2rem] text-center`}>we are testing your patience :)</p>) :
        (
          <div className={`grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-6`}>

            <ImageBlock
              image={userData.userProfile.images}
              topSubtitle="Welcome"
              title={displayName}
              bottomSubtitle={`${userData.userProfile.product.charAt(0).toUpperCase() + userData.userProfile.product.slice(1)} Account`}
              order="md:order-[5]"
              textSize={checkStrLength(displayName)}
              profileBlock={true}
            />

            <GradientBlock
              gradient
              topSubtitle="Total of"
              title={userData.userProfile.followers}
              bottomSubtitle={userData.userProfile.followers < 2 ? "Follower" : "Followers"}
              order="md:order-[2]"
            />

            <GradientBlock
              gradient
              topSubtitle="Played"
              title={userData.topTrack.total}
              bottomSubtitle="Unique Tracks"
              order="md:order-[1]"
            />

            <ImageBlock
              image={userData.topTrack.image}
              topSubtitle="Top Track"
              title={userData.topTrack.name}
              bottomSubtitle={`By ${userData.topTrack.artist}`}
              order="md:order-[4]"
              textSize={checkStrLength(userData.topTrack.name)}
            />

            <ImageBlock
              image={userData.topArtist.image}
              topSubtitle="Top Artist"
              title={userData.topArtist.name}
              bottomSubtitle="invisible"
              order="md:order-[6]"
              invisible={true}
              textSize={checkStrLength(userData.topArtist.name)}
            />

            <GradientBlock
              gradient
              topSubtitle="Listened to"
              title={userData.topArtist.total}
              bottomSubtitle="Unique Artists"
              order="md:order-[3]"
            />

            <GradientBlock
              gradient
              topSubtitle="Data from"
              title={timeToDisplay(timeRange)}
              bottomSubtitle="invisible"
              order="md:order-[7]"
              invisible={true}
              time={true}
            />

            <ImageBlock
              image={userData.recentlyPlayed.image}
              topSubtitle="Last Played"
              title={userData.recentlyPlayed.name}
              bottomSubtitle={`By ${userData.recentlyPlayed.artist}`}
              order="md:order-[8]"
              textSize={checkStrLength(userData.recentlyPlayed.name)}
            />

            <GradientBlock
              gradient
              icon={SpotifyIcon}
              order="md:order-[9]"
              spotifyBlock={true}
            />

          </div>
        )
      }
    </div>
  )
};