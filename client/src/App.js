import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Time from "./pages/Time";
import Data from "./pages/Data";

export default function App() {
  const [timeRange, setTimeRange] = useState("medium_term");
  const [currentPage, setCurrentPage] = useState("/");
  const location = useLocation();
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <div className={`flex justify-center mx-10 lg:mx-0`}>
      <Navbar currentPage={currentPage} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/time" element={<Time setTimeRange={setTimeRange} />} />
        <Route path="/data" element={<Data timeRange={timeRange} />} />
      </Routes>
    </div>
  )
};
/*
      <Navbar currentPage={currentPage} />
        <Route path="/" element={<Landing />} />
        <Route path="/time" element={<Time setTimeRange={setTimeRange} />} />
        <Route path="/data" element={<Data timeRange={timeRange} />} />
*/