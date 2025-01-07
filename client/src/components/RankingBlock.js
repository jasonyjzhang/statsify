export default function RankingBlock({ ranking, track, artist, image, popularity, isTrack }) {
  return (
    <div className={`w-full flex items-center border-b-2 border-border-gray py-4`}>
      <span className={`w-6 h-16 md:w-8 md:h-20 flex justify-center items-center ${ranking < 4 ? `${isTrack ? 'bg-custom-red' : 'bg-custom-yellow'}` : 'bg-border-gray'}`}>
        <p className={`text-xl ${ranking < 4 ? 'text-dark font-bold' : 'text-dark-gray'}`}>{ranking}</p>
      </span>
      <img src={image} alt="album cover" className={`w-16 h-16 md:w-20 md:h-20 rounded mr-4`}/>
      <p className={`${isTrack && `w-1/3 md:w-1/4 text-lg ${ranking < 4 ? 'text-custom-red' : 'text-white'}`}`}>{track}</p>
      <p className={`w-1/3 md:w-1/4 ${isTrack ? `text-dark-gray` : `text-lg ${ranking < 4 ? 'text-custom-yellow' : 'text-white'}`}`}>{artist}</p>
      <p className={`md:w-1/4 ${isTrack && 'hidden md:inline-block'}`}>Popularity: {popularity}%</p>
    </div>
  )
};