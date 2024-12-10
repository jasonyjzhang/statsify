import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar({ currentPage }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/time");
  }

  const handleLogout = () => {
    axios.get(`http://192.168.1.71:5001/logout`, { withCredentials: true })
      .then(() => {
        window.open('https://accounts.spotify.com/logout', '_blank');
        window.location.href = 'http://192.168.1.71:3000';
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  }

  return (
    <div className={`${currentPage === '/' ? `hidden` : `absolute w-screen md:w-[500px] ${currentPage === '/data' && `md:w-[600px] lg:w-[700px]`} border-b-4 border-[#303030] h-[8%] flex items-center`}`}>
      <div className={`w-full flex flex-row justify-between mx-10 md:mx-0`}>
        <button onClick={handleBack}>{currentPage === '/data' ? '< Select Time' : 'STATSIFY'}</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  )
};