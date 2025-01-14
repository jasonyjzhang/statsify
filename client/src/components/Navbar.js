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
    <div className={`w-screen md:w-[600px] lg:w-[710px] h-14 flex items-center fixed md:top-4 bg-border-gray/80 backdrop-blur md:rounded z-10`}>
      <div className={`w-full flex flex-row justify-between items-center mx-4`}>
        <button onClick={handleBack} className={`${currentPage === '/data' ? 'flex' : 'hidden'}`}><img src={BackIconWhite} alt="Back Icon" className={`w-6`}/>Select Time</button>
        <p className={`${currentPage === '/data' ? 'hidden' : 'inline'} font-bold border-l-4 border-custom-red pl-1`}>STATSIFY</p>
        <button onClick={handleLogin} className={`${currentPage === '/' ? 'inline' : 'hidden'}`}>Get Started</button>
        <button className={`${currentPage === '/' ? 'hidden' : 'inline'}`} onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  )
};