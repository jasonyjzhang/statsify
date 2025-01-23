export default function RankingBlock({ ranking, track, artist, image, popularity, isTrack }) {
  return (
    <div className="w-full flex items-center border-b-2 border-border-gray py-4">
      <span className={`min-w-6 h-16 md:w-8 md:h-20 flex justify-center items-center ${ranking < 4 ? `${ranking === 1 ? 'bg-custom-red' : `${ranking === 2 ? 'bg-custom-orange' : 'bg-custom-yellow'}`}` : 'bg-border-gray'}`}>
        <p className={`text-xl ${ranking < 4 ? 'text-dark font-bold' : 'text-dark-gray'}`}>{ranking}</p>
      </span>
      <img src={image} alt="album cover" className="min-w-16 h-16 md:w-20 md:h-20 mr-4"/>
      <div className="grid grid-cols-[1fr_auto] grow">
        <p className={`${isTrack ? `${ranking < 4 ? `${ranking === 1 ? 'text-custom-red' : `${ranking === 2 ? 'text-custom-orange' : 'text-custom-yellow'}`}` : 'text-white'}` : 'hidden'}`}>{track}</p>
        <p className={`text-dark-gray ${isTrack ? 'hidden md:inline-block' : 'order-2'}`}>{popularity}%</p>
        {isTrack && <span className="md:hidden"></span>}
        <p className={`${isTrack ? ` text-dark-gray` : `order-1 ${ranking < 4 ? `${ranking === 1 ? 'text-custom-red' : `${ranking === 2 ? 'text-custom-orange' : 'text-custom-yellow'}`}` : 'text-white'}`}`}>{artist}</p>
      </div>
    </div>
  )
};