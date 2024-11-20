import { useState } from "react";

export default function Time() {
  const [timeID, setTimeID] = useState(1);
  const times = ["Short Term - Past Month", "Medium Term - Past 6 Months", "Long Term - All Time"];
  return (
    <div className={`h-[100dvh] md:w-[500px] flex flex-col justify-center items-center space-y-20 lg:space-y-28`}>
      <div className={`text-center space-y-6`}>
        <h1 className={`text-[2.5rem] font-bold`}>Hello</h1>
        <h2>Please select a time span:</h2>
      </div>
      <div className={`space-y-8 md:space-y-12`}>
        {
          times.map((time, index) => {
            return (
              <button key={index} onClick={() => setTimeID(index)} className={`w-full rounded-lg p-0.5 ${index === timeID? "bg-gradient-summer" : "bg-dark-gray"}`}>
                <span className={`flex justify-center rounded-lg p-4`}>
                  <p className={`${timeID === index ? "gradient-text" : "text-dark-gray"}`}>{time}</p>
                </span>
              </button>
            )
          })
        }
      </div>
      <button className={`bg-gradient-summer w-full flex justify-center items-center rounded-lg py-4 text-dark font-semibold`}>Continue</button>
    </div>
  )
};