export default function Popup({ setShowPopup }) {
  return (
    <div className="w-[92%] md:w-[600px] h-[600px] flex flex-col justify-evenly items-center fixed top-1/2 -translate-y-1/2 bg-dark text-center border-2 border-custom-red rounded-xl px-10 md:px-24 z-10 opacity-100">
      <p className="text-xl">Welcome to STATSIFY!</p>
      <p>STATSIFY is currently under review by Spotify and will be available to a wider audience once approved.</p>
      <p>In the meantime, feel free to check out the <a href="https://github.com/jasonyjzhang/statsify" target="_blank" className="underline underline-offset-2">source code</a> on our GitHub page. Otherwise, please give us a little more time and check back soon!</p>
      <button onClick={() => setShowPopup(false)} className="w-full border-2 border-white rounded-full py-3">Close</button>
    </div>
  )
};