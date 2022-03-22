/** @format */

import { useEffect, useState } from "react";

export const Scoreboard = ({ scores }) => {
  const [fillOut, setFillOut] = useState([]);
  useEffect(() => {
    if (scores.length < 10) {
      const arr = [];
      const amount = 10 - scores.length;
      for (let i = 0; i < amount; i++) {
        arr.push(<li>...</li>);
      }
      setFillOut(arr);
    }
  }, [scores]);
  return (
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
        {fillOut.map((d) => {
          return d;
        })}
      </ol>
    </div>
  );
};
