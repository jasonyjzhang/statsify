import SpotifyIconWhite from "../assets/spotify-icon-white.svg";
import ArrowIcon from "../assets/arrow-icon.svg";
import LandingImg from "../assets/landing.png";
export default function Landing() {
  const handleClick = () => {
    window.location.href = 'https://statsify-backend.jasonzhang.studio/auth';
    console.log("Spotify OAuth flow started");
  };

  return (
    <div className={`md:w-[600px] lg:w-[700px] flex flex-col items-center gap-y-12 md:gap-y-16`}>
      <div className={`flex flex-col items-center text-center space-y-6 mt-24 md:mt-28`}>
        <p className={`bg-custom-red/10 text-custom-red font-light rounded-full px-6 py-2`}>
          powered by <img src={SpotifyIconWhite} alt="Spotify Icon" className={`w-[1.5rem] inline ml-1`}/>
        </p>
        <h2 className={`text-[2.5rem] md:text-6xl font-bold leading-tight md:leading-tight`}>Spotify Stats, <br/>Simplified</h2>
        <h2 className={`w-[90%] lg:w-[70%] md:text-lg`}>
          A <span className={`text-custom-red`}>personalized Spotify dashboard</span> that highlights your listening trends and insights over your selected time range—all in just a few clicks.
        </h2>
      </div>
      <button onClick={handleClick} className={`w-auto bg-gradient-summer rounded-full p-0.5`}>
        <span className={`bg-dark flex justify-center rounded-full py-3 px-8`}>
          <p className={`font-bold`}>Start Discovering</p>
          <img src={ArrowIcon} alt="Arrow Icon" className={`w-6 ml-1`}/>
        </span>
      </button>
      <img src={LandingImg} alt="Application Prototype" className={`rounded-xl`}/>
      <p className={`text-sm md:text-base font-light mb-2`}>Copyright © 2025 STATSIFY. All rights reserved.</p>
    </div>
  )
};