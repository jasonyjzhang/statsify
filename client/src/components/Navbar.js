import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackIcon from "../assets/back-icon.svg";

export default function Navbar({ currentPage }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/time");
  }

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
    <div className={`${currentPage === '/' ? `hidden` : `absolute w-screen md:w-[500px] ${currentPage === '/data' && `md:w-[600px] lg:w-[700px]`} border-b-4 border-[#303030] h-14 flex items-center`}`}>
      <div className={`w-full flex flex-row justify-between mx-10 md:mx-0`}>
        <button onClick={handleBack} className={`${currentPage === '/data' ? 'flex' : 'hidden'}`}><img src={BackIcon} alt="Back Icon" className={`w-6`}/>Select Time</button>
        <p className={`${currentPage === '/time' ? 'inline-block' : 'hidden'}`}>STATSIFY</p>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  )
};