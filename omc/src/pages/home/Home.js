/** @format */

import petter from "../../sprite/petter.png";
import person from "../../sprite/Person.png";
import stones from "../../sprite/Stones.png";
import logotype from "../../sprite/logotype.png";

import { useEffect, useState } from "react";

import { useArrayRef } from "../../utils/useArrayRef";

import { data } from "../../store/scoresSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { If } from "../../components/utils/If";

export const Home = ({ setGameAuth }) => {
  const [inputs, ref] = useArrayRef();
  const scores = useSelector(data);
  const [inputsState, setInputsState] = useState({
    name: false,
    email: false,
    checkbox: false,
  });

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

  return (
    <div class="main">
      <main>
        <img src={petter} alt="" class="petter" />
        <div id="fake-canvas">
          <div id="content">
            <h1>Mission Briefing</h1>
            <form>
              <input
                type="text"
                name="name"
                ref={ref}
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
                ref={ref}
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
                ref={ref}
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
            <If condition={checkAuth()}>
              <Link to={`/game`}>
                <button id="startBtn">Gotta save ´em all</button>
              </Link>
            </If>
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
          </div>
        </div>
      </main>
      <aside>
        <img class="logo" src={logotype} />
        <div class="scoreboard">
          <h3>Scoreboard</h3>
          <ol id="scoreB">
            {scores.map((d) => {
              return (
                <li>
                  {d.name} <span>{d.score}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </aside>
    </div>
  );
};
