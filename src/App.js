import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Time from "./pages/Time";
import Data from "./pages/Data";

export default function App() {
  const [timeRange, setTimeRange] = useState("medium_term");
  return (
    <Router>
      <div className={`mx-10 lg:mx-0 flex justify-center`}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/time" element={<Time setTimeRange={setTimeRange} />} />
          <Route path="/data" element={<Data timeRange={timeRange} />} />
        </Routes>
      </div>
    </Router>
  )
};

/*

<Route path="/" element={<Landing />} />
<Route path="/time" element={<Time setTimeRange={setTimeRange} />} />

*/