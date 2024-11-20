import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Time from "./pages/Time";

export default function App() {
  return (
    <Router>
      <div className={`mx-10 lg:mx-0 flex justify-center`}>
        <Routes>
          <Route path="/" element={<Time />} />
        </Routes>
      </div>
    </Router>
  )
};

// <Route path="/" element={<Landing />} />