import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Time({ setTimeRange }) {
  const navigate = useNavigate();
  const [timeIndex, setTimeIndex] = useState(1);
  const times = ["Past 4 Weeks", "Past 6 Months", "All Time"];
  const timeRanges = ["short_term", "medium_term", "long_term"];

  useEffect(() => {
    setTimeRange("medium_term");
  }, [setTimeRange]);

  const handleTimeChange = (index) => {
    setTimeIndex(index);
    setTimeRange(timeRanges[index] || "medium_term");
  }

  const handleClick = () => {
    navigate("/data");
  }

  return (
    <div className="h-[100svh] md:w-[500px] flex flex-col justify-evenly items-center pt-14">
      <div>
        <h1 className="text-[2.5rem] font-bold text-center mb-4">Hello</h1>
        <h2>Please select a time range</h2>
      </div>
      <div className="w-full space-y-10 md:space-y-12">
        {
          times.map((time, index) => {
            const isActive = index === timeIndex;
            return (
              <button key={index} onClick={() => handleTimeChange(index)} className={`w-full rounded-full p-0.5 ${isActive ? 'bg-gradient-summer' : 'bg-dark-gray'}`}>
                <span className="bg-dark flex justify-center rounded-full p-4">
                  <p className={isActive ? 'gradient-text' : 'text-dark-gray'}>{time}</p>
                </span>
              </button>
            )
          })
        }
      </div>
      <button onClick={handleClick} className="w-full bg-gradient-summer text-dark font-bold rounded-full p-4">Continue</button>
    </div>
  )
};