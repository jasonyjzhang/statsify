export default function ImageBlock({ image, topSubtitle, title, bottomSubtitle, order, invisible=false, textSize, profileBlock=false }) {
  return (
    <div
      style={{ backgroundImage: image && `url(${image})`}}
      className={`relative h-[135px] md:h-[175px] lg:h-[200px] bg-cover rounded-lg ${order}`}
    >
      <div className={`absolute inset-0 ${image ? 'bg-dark opacity-70' : 'bg-gradient-gray opacity-100'} rounded-lg`}></div>
      <div className={`relative h-full flex flex-col justify-between items-center text-center py-4 md:py-6 z-10`}>
        <p>{topSubtitle}</p>
        <p className={`gradient-text  ${textSize} font-semibold`}>{title}</p>
        {profileBlock && <a href="https://open.spotify.com/user/spotify" target="_blank" rel="noopener noreferrer" className={`md:hidden underline underline-offset-4`}>Open Spotify</a>}
        <p className={`${invisible && `text-transparent`} ${profileBlock && `hidden md:inline-block`}`}>{bottomSubtitle}</p>

      </div>
    </div>
  )
};