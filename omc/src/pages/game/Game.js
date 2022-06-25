/** @format */

import { setGameOver, gameplayData } from "../../store/gameplaySlice";

import { getTopScores, scoresData } from "../../store/scoresSlice";

import lifeRing from "../../sprite/life-ring.png";
import logotype from "../../sprite/logotype.png";
import { useDispatch, useSelector } from "react-redux";
import { Canvas } from "./canvas/Canvas.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { settings } from "../../config/settings";
import { Scoreboard } from "../../components/Scoreboard";

export const Game = ({}) => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const { scores } = useSelector(scoresData);
 const { lives, score } = useSelector(gameplayData);

 useEffect(() => {
  if (lives.length < 1) {
   navigate("/");
   dispatch(setGameOver(true));
  }
 }, [lives]);

 useEffect(() => {
  dispatch(getTopScores("page=1&limit=10"));
 }, []);

 return (
  <div class="main">
   <main>
    <div id="lives">
     <ul id="livesUl">
      {lives.map((l) => {
       return (
        <li>
         <img src={lifeRing} />
        </li>
       );
      })}
     </ul>
    </div>
    <div id="saves">{score}</div>
    <Canvas
     canvasWidth={settings.canvasWidth}
     canvasHeight={settings.canvasHeight}
    />
   </main>
   <aside>
    <img class="logo" src={logotype} />
    <Scoreboard scores={scores.scores} />
   </aside>
  </div>
 );
};
