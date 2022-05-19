/** @format */

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useHandlePlayerObject } from "../utils/playerObject/useHandlePlayerObject";

import { useHandleObstacles } from "../utils/spawners/useHandleObstacles";
import { useHandlePickups } from "../utils/spawners/useHandlePickups";
import { useHandleCrash } from "../utils/events/useHandleCrash";
import { useHandlePickup } from "../utils/events/useHandlePickup";

import { useHandleBNFground } from "../utils/useHandleBNFground";

import {
  lostLives,
  updateScore,
  updateSpeed,
} from "../../../store/gameplaySlice";
import { useDispatch, useSelector } from "react-redux";

import { settings } from "../settings";

export const Canvas = () => {
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const score = useSelector((state) => state.gameplay.score);

  const [frame, setFrame] = useState(0);
  const [keysArray, setKeysArray] = useState([]);

  const { movePlayerObject, drawPlayerObject, boat, playerObjectAnimations } =
    useHandlePlayerObject();

  const { updateObstacles } = useHandleObstacles();
  const { updatePickups } = useHandlePickups();
  const { handleCrash } = useHandleCrash();
  const { handlePickup } = useHandlePickup();

  const { updateBackground } = useHandleBNFground();

  useLayoutEffect(() => {
    let timerId;
    const animate = () => {
      setFrame((prev) => prev + 1);
      timerId = requestAnimationFrame(animate);
    };
    timerId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(timerId);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, settings.canvasWidth, settings.canvasHeight);

    updateBackground(context);

    updatePickups(context, frame);
    updateObstacles(context, frame);

    drawPlayerObject(context);
    playerObjectAnimations(frame);
    movePlayerObject(keysArray);

    if (handleCrash()) {
      dispatch(lostLives());
    }
    if (handlePickup()) {
      dispatch(updateScore());
      if (
        (score % settings.difficulty.savings.saves) * settings.scorePerSave ===
          0 &&
        settings.difficulty.savings.saves !== 0 &&
        score !== 0
      ) {
        dispatch(updateSpeed(1));
      }
    }

    if (frame % (settings.difficulty.timer.seconds * 65) === 0) {
      dispatch(updateSpeed(1));
    }
  }, [frame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.focus();
  }, []);

  return (
    <div className="container">
      <canvas
        className="canvas1"
        ref={canvasRef}
        width={settings.canvasWidth}
        height={settings.canvasHeight}
        tabIndex="0"
        onKeyDown={(e) => {
          if (!keysArray.includes(e.code)) {
            setKeysArray((prev) => {
              return [...prev, e.code];
            });
          }
        }}
        onKeyUp={(e) => setKeysArray(keysArray.filter((k) => k !== e.code))}
      />
    </div>
  );
};
