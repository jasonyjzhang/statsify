import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Time({setTimeRange}) {
  const navigate = useNavigate();
  const [timeIndex, setTimeIndex] = useState(1);
  const times = ["Short Term - Past 4 Weeks", "Medium Term - Past 6 Months", "Long Term - All Time"];
  const handleTimeChange = (index) => {
    setTimeIndex(index);
    switch (index) {
      case 0:
        setTimeRange("short_term");
        break;
      case 1:
        setTimeRange("medium_term");
        break;
      case 2:
        setTimeRange("long_term");
        break;
    }
  }
  const handleClick = () => {
    navigate("/data");
  }
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
              <button key={index} onClick={() => handleTimeChange(index)} className={`w-full rounded-lg p-0.5 ${index === timeIndex? "bg-gradient-summer" : "bg-dark-gray"}`}>
                <span className={`flex justify-center rounded-lg p-4`}>
                  <p className={`${index === timeIndex ? "gradient-text" : "text-dark-gray"}`}>{time}</p>
                </span>
              </button>
            )
          })
        }
      </div>
      <button onClick={handleClick} className={`bg-gradient-summer w-full flex justify-center items-center rounded-lg py-4 text-dark font-semibold`}>Continue</button>
    </div>
  )
};