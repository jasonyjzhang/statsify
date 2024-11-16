import SpotifyIcon from "../assets/spotify.png";

export default function Landing() {
  const handleClick = () => {
    console.log("Spotify OAuth flow started");
  };
  return (
    <div className={`h-[100dvh] md:w-[500px] flex flex-col justify-center items-center space-y-20 lg:space-y-28`}>
      <div className={`text-center tracking-wider md:tracking-widest`}>
        <h1 className={`text-[2.5rem] font-bold`}>STATSIFY</h1>
        <h2 className={`gradient-text text-[1.5rem] font-medium`}>Rewind. Retrack. Reveal.</h2>
      </div>
      <div className={`space-y-6 md:space-y-12 leading-relaxed md:leading-normal`}>
        <p>Spotify Wrapped may come only once a year, but your listening trends don't have to wait!</p>
        <p>With Statsify, you can discover your Spotify data anytime, choosing from three time spans: the past month, past 6 months, or all-time.</p>
        <p>In just a few seconds, you'll get a clean, simple breakdown of your stats. The music you love is always just a click away.</p>
      </div>
      <button onClick={handleClick} className={`bg-gradient-summer w-full flex justify-center items-center rounded-lg py-4 text-dark font-semibold`}>
        <img src={SpotifyIcon} alt="Spotify Icon" className={`bg-transparent w-[24px] mr-4`} />
        Sign in with Spotify
      </button>
    </div>
  )
};