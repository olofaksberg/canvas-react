/** @format */
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/home/Home";
import { Game } from "./pages/game/Game";

import { useDispatch, useSelector } from "react-redux";

import { getTopScores, scoresData } from "./store/scoresSlice.js";

import "./style/main.scss";

const App = () => {
  const dispatch = useDispatch();
  const [gameAuth, setGameAuth] = useState(false);
  const { status } = useSelector(scoresData);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getTopScores("page=1&limit=10"));
    }
  }, [status, dispatch]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Home setGameAuth={setGameAuth} />} path="/" exact />
          <Route
            element={gameAuth ? <Game /> : <Home setGameAuth={setGameAuth} />}
            path="/game"
            exact
          />
          <Route element={<Home setGameAuth={setGameAuth} />} path="*" />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
