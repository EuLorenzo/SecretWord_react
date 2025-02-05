import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Game from "./Pages/Game/Game";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
};

export default Router;
