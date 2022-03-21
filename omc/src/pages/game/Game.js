/** @format */

import { lives, getLives } from "../../store/gameplaySlice";

import lifeRing from "../../sprite/life-ring.png";
import logotype from "../../sprite/logotype.png";
import { useDispatch, useSelector } from "react-redux";
import { Canvas } from "./canvas/Canvas.js";
import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { settings } from "./settings";

export const Game = ({ gameState, setGameState }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lives = useSelector((state) => state.gameplay.lives);
  const score = useSelector((state) => state.gameplay.score);

  useEffect(() => {
    if (lives.length < 1) {
      navigate("/");
    }
  }, [lives]);

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
        <div class="scoreboard">
          <h3>Scoreboard</h3>
          <ol id="scoreB">
            <li>
              Mattias <span>1200</span>
            </li>
            <li>
              Olof <span>1200</span>
            </li>
            <li>
              Petter <span>1200</span>
            </li>
            <li>
              Niklas <span>1200</span>
            </li>
            <li>...</li>
            <li>...</li>
            <li>...</li>
            <li>...</li>
            <li>...</li>
            <li>...</li>
          </ol>
        </div>
      </aside>
    </div>
  );
};
