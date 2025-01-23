import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackIconWhite from "../assets/back-icon-white.svg";
export default function Navbar({ currentPage }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/time");
  }

  const handleLogin = () => {
    window.location.href = 'https://statsify-backend.jasonzhang.studio/auth';
    console.log("Spotify OAuth flow started");
  };

  const handleLogout = () => {
    axios.get(`https://statsify-backend.jasonzhang.studio/logout`, { withCredentials: true })
      .then(() => {
        window.open('https://accounts.spotify.com/logout', '_blank');
        window.location.href = 'https://statsify.jasonzhang.studio';
      })
      .catch(error => {
        console.error('Error logging out:', error);
      }
    );
  }

  return (
    <div className={`w-screen md:w-[700px] lg:w-[800px] h-14 bg-dark flex justify-between items-center ${currentPage !== '/' ? 'fixed' : 'absolute'} top-0 md:top-4 border-b-2 md:border-2 border-border-gray md:rounded-xl px-4 z-10`}>
      <p className="font-bold border-l-4 border-custom-red pl-1">STATSIFY</p>
      <button onClick={handleLogin} className={`${currentPage === '/' ? 'lg:hover:text-custom-red lg:duration-300' : 'hidden'}`}>Get Started</button>
      <button onClick={handleLogout} className={`${currentPage === '/' ? 'hidden' : 'inline'}`}>Log Out</button>
      <button onClick={handleBack} className={`${currentPage === '/data' ?  'w-14 h-14 flex justify-center items-center bg-border-gray lg:bg-transparent fixed bottom-4 right-4 lg:absolute lg:-bottom-[2px] lg:-left-16  lg:border-2 lg:border-border-gray rounded-full lg:rounded-xl z-20' : 'hidden'}`}><img src={BackIconWhite} alt="Back Icon" className="w-6"/></button>
    </div>
  )
};