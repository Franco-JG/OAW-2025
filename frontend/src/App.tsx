import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feeds from "./pages/Feeds";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feeds" element={<Feeds />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
