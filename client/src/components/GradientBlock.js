export default function GradientBlock({ topSubtitle, title, bottomSubtitle, order, invisible=false, time=false, spotifyBlock=false, icon }) {
  return (
    <div className={`h-[135px] md:h-[175px] lg:h-[200px] bg-gradient-gray flex flex-col justify-between items-center text-center rounded-lg ${order} py-4 md:py-6 ${spotifyBlock && `hidden md:flex`}`}>
      <p>{topSubtitle}</p>
      {spotifyBlock && <img src={icon} alt="White Spotify Logo" className={`w-[40%]`}/>}
      <p className={`gradient-text font-semibold ${time ? `text-[1.5rem] lg:text-[2rem]` : `text-[2.25rem] lg:text-[2.75rem]`}`}>{title}</p>
      <p className={`${invisible && `text-transparent`}`}>{bottomSubtitle}</p>
      {spotifyBlock && <a href="https://open.spotify.com/user/spotify" target="_blank" rel="noopener noreferrer" className={`underline underline-offset-4`}>Open Spotify</a>}
    </div>
  )
};