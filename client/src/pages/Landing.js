import SpotifyIconBlack from "../assets/spotify-icon-black.svg";
import SpotifyIconWhite from "../assets/spotify-icon-white.svg";
import LoginIcon from "../assets/login-icon.svg";
import ListIcon from "../assets/list-icon.svg";
import ResultsIcon from "../assets/results-icon.svg";
export default function Landing() {
  const handleClick = () => {
    window.location.href = 'https://statsify-backend.jasonzhang.studio/auth';
    console.log("Spotify OAuth flow started");
  };

  return (
    <div className={`h-[100svh] md:h-[100vh] md:w-[500px] flex flex-col justify-center items-center space-y-24`}>
      <div className={`text-center tracking-wider md:tracking-widest`}>
        <h1 className={`text-[2.5rem] font-bold leading-tight`}>STATSIFY</h1>
        <p className={`font-light`}>powered by <img src={SpotifyIconWhite} alt="Spotify Icon" className={`w-[1.5rem] inline-block`}/></p>
        <h2 className={`gradient-text text-[1.5rem] font-medium pt-4`}>Rewind. Retrack. Reveal.</h2>
      </div>
      <div className={`md:space-y-12`}>
        <p className={`hidden md:inline-block`}>Wondering what tunes or artists you've been vibing to lately or what your all-time faves are? With Statsify, you can dive into your music trends anytime with just a few clicks.</p>
        <div className={`grid grid-cols-[auto_1fr] gap-x-4 gap-y-8 items-center`}>
          <img src={LoginIcon}/>
          <p>Step 1: Sign in with your Spotify account</p>
          <img src={ListIcon}/>
          <p>Step 2: Select a time range: 4 weeks, 6 months, or all-time</p>
          <img src={ResultsIcon}/>
          <p>Step 3: Sit back, relax, and let your music stats tell the story</p>
        </div>
      </div>
      <button onClick={handleClick} className={`bg-gradient-summer w-full flex justify-center items-center rounded-lg py-4 text-dark font-semibold`}>
        <img src={SpotifyIconBlack} alt="Spotify Icon" className={`w-[1.5rem] mr-3`} />
        Sign in with Spotify
      </button>
    </div>
  )
};