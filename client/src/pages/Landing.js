import { useState } from "react";
import FlowCard from "../components/FlowCard";
import Popup from "../components/Popup";
import LandingImg from "../assets/landing.png";
import SpotifyLogo from "../assets/spotify-logo-green.svg";
import ArrowIcon from "../assets/arrow-icon.svg";
import LoginIcon from "../assets/login-icon.svg";
import TimeIcon from "../assets/time-icon.svg";
import DataIcon from "../assets/data-icon.svg";
export default function Landing() {
  const [showPopup, setShowPopup] = useState(true);
  const flow = [{icon: LoginIcon, alt: "user icon", text: "Sign in with your Spotify account"},
                {icon: TimeIcon, alt: "time range icon", text: "Select a time range: 4 weeks, 6 months, all time"},
                {icon: DataIcon, alt: "data icon", text: "Explore your music listening stats"},
               ];

  const handleClick = () => {
    window.location.href = 'https://statsify-backend.jasonzhang.studio/auth';
    console.log("Spotify OAuth flow started");
  };

  return (
    <>
    {showPopup && <Popup setShowPopup={setShowPopup} />}
    <div className={`md:w-[600px] lg:w-[700px] flex flex-col items-center text-center gap-y-8 mt-28 ${showPopup && 'opacity-10 pointer-events-none'}`}>
      {/* Powered By - Spotify Logo */}
      <div className="flex gap-x-2">
        <p className="mt-[1px]">Powered by</p>
        <img src={SpotifyLogo} alt="Spotify Full Logo" className="w-24"/>
      </div>
      {/* Landing Header */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight md:leading-tight lg:leading-tight">Spotify Stats, <br/>Simplified</h1>
      {/* Landing Description */}
      <p className="w-[90%] lg:w-[80%] md:text-lg text-dark-gray">
        A <span className="gradient-text">personalized dashboard</span> that highlights your listening trends and insights over your selected time range—all in just a few clicks.
      </p>
      {/* CTA Button */}
      <button onClick={handleClick} className="bg-gradient-summer rounded-full p-0.5 my-4 md:my-8 lg:transition lg:hover:scale-110 lg:duration-300">
        <span className="bg-dark flex justify-center rounded-full py-4 px-10">
          <p className="font-bold">Start Discovering</p>
          <img src={ArrowIcon} alt="Arrow Icon" className="w-6 ml-1"/>
        </span>
      </button>
      {/* Landing Image */}
      <img src={LandingImg} alt="Mobile Prototype of the Application" className="rounded-xl mb-4 md:mb-8"/>
      {/* Application Flow Section */}
      <p className="text-3xl font-semibold">How Does It Work?</p>
      <div className="w-full flex flex-col md:flex-row md:justify-between">
        {flow.map((step, index) => {
          return <FlowCard key={index} number={index+1} icon={step.icon} alt={step.alt} text={step.text} />
        })}
      </div>
      {/* Bottom CTA Section */}
      <div className="w-full bg-[#202020] rounded-xl py-12 px-10">
        <p className="text-3xl font-semibold">Start Discovering Your Trends Now</p>
        <p className="text-dark-gray my-8"><span className="md:hidden text-dark-gray">What are you waiting for? </span>Blast some music on Spotify, and let's roll!</p>
        <button onClick={handleClick} className="bg-gradient-summer rounded-full p-0.5 lg:transition lg:hover:scale-110 lg:duration-300">
          <span className="bg-[#202020] flex justify-center rounded-full py-4 px-10">
            <p className="font-bold">Get Started</p>
            <img src={ArrowIcon} alt="Arrow Icon" className="w-6 ml-1"/>
          </span>
        </button>
      </div>
      <a href="https://github.com/jasonyjzhang/statsify" target="_blank" className="text-dark-gray text-sm md:text-base font-light mb-2 underline underline-offset-4">Github</a>
    </div>
    </>
  )
};