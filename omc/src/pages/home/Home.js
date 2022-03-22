/** @format */

import petter from "../../sprite/petter.png";
import person from "../../sprite/Person.png";
import stones from "../../sprite/Stones.png";
import logotype from "../../sprite/logotype.png";

import { useEffect, useState } from "react";

import { data } from "../../store/scoresSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { If } from "../../components/utils/If";
import { Scoreboard } from "../../components/Scoreboard";
import { gameOver, reset, setGameOver } from "../../store/gameplaySlice";

export const Home = ({ setGameAuth }) => {
  const scores = useSelector(data);
  const gameOverState = useSelector(gameOver);
  const score = useSelector((state) => state.gameplay.score);
  const dispatch = useDispatch();
  const [inputsState, setInputsState] = useState({
    name: false,
    email: false,
    checkbox: false,
  });
  // const [gameOverState, setGameOverState] = useState(false);

  const checkAuth = () => {
    if (Object.values(inputsState).every(Boolean)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (checkAuth()) {
      setGameAuth(true);
    } else {
      setGameAuth(false);
    }
  }, [inputsState]);

  useEffect(() => {
    if (!gameOverState) {
      dispatch(reset());
    }
  }, [gameOverState]);

  return (
    <div class="main">
      <main>
        <img src={petter} alt="" className="petter" />
        <div id="fake-canvas">
          <div id="content">
            <If condition={!gameOverState}>
              <h1>Mission Briefing</h1>
              <Form setInputsState={setInputsState} />
              <Startbutton checkAuth={checkAuth} />
              <Rules />
            </If>
            <If condition={gameOverState}>
              <h1>GAME OVER</h1>
              <h5>Thanks for playing!</h5>
              <h3>Score: {score}</h3>
              <div className="game-over-btns">
                <button
                  onClick={() => {
                    dispatch(setGameOver(false));
                  }}
                >
                  Submit score
                </button>
                <button
                  onClick={() => {
                    dispatch(setGameOver(false));
                  }}
                >
                  Skip
                </button>
              </div>
            </If>
          </div>
        </div>
      </main>
      <aside>
        <img class="logo" src={logotype} />
        <Scoreboard scores={scores.scores} />
      </aside>
    </div>
  );
};

const Form = ({ setInputsState }) => {
  return (
    <form>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Fill in your name..."
        required
        onChange={(e) =>
          setInputsState((prev) => {
            return {
              ...prev,
              name: e.target.value ? true : false,
            };
          })
        }
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Fill in your e-mail..."
        required
        onChange={(e) =>
          setInputsState((prev) => {
            return {
              ...prev,
              email: e.target.validity.valid ? true : false,
            };
          })
        }
      />
      <label htmlFor="">I agree:</label>
      <input
        type="checkbox"
        name=""
        id="privacy"
        onChange={(e) =>
          setInputsState((prev) => {
            return {
              ...prev,
              checkbox: e.target.checked ? true : false,
            };
          })
        }
      />
    </form>
  );
};

const Startbutton = ({ checkAuth }) => {
  return (
    <If condition={checkAuth()}>
      <Link to={`/game`}>
        <button id="startBtn">Gotta save ´em all</button>
      </Link>
    </If>
  );
};

const Rules = () => {
  return (
    <div id="rules">
      <h2>How to play!</h2>
      <div id="instructions">
        <div class="keys">
          <h4>How to stear:</h4>
          <p>Use arrow keys</p>
        </div>
        <div class="object">
          <h4>Pickup:</h4>
          <img src={person} />
        </div>
        <div class="threat">
          <h4>Watch out for:</h4>
          <img src={stones} />
        </div>
      </div>
    </div>
  );
};
