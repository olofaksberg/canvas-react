/** @format */

import { useState } from "react";
import obstaclePic from "../../../../sprite/Stones.png";

import { settings } from "../../settings";

import { gameplayData } from "../../../../store/gameplaySlice";
import { useSelector } from "react-redux";
import { randomMinMax } from "../../../../utils/randomMinMax";
import { pickupsArray } from "./useHandlePickups";
import { failSpawnPosition } from "./utils/failSpawnPosition";
import { playerObject } from "../../../../store/playerObjectSlice";

export const obstaclesArray = [];

export const useHandleObstacles = () => {
  const { boat } = useSelector(playerObject);
  const obstacleImage = new Image();
  obstacleImage.src = obstaclePic;
  // const speed = useSelector(gameSpeed);
  const { gameSpeed } = useSelector(gameplayData);

  const [obstaclesSpeed, setObstaclesSpeed] = useState(
    settings.stones.speed * gameSpeed
  );

  // not sure if this actually will be modified, so state seems unnecessary
  const obstaclesSpawnRate = settings.stones.spawnRate;
  // const [obstaclesSpawnRate, setObstaclesSpawnRate] = useState(
  //   settings.obstacles.spawnRate
  // );

  const speedModifier = 0.35;

  const drawObstacle = (context, x, y, s) => {
    context.drawImage(obstacleImage, x, y, s, s);
  };

  const updateObstacle = (context, o) => {
    switch (boat.moving) {
      case "right":
        setObstaclesSpeed(
          settings.stones.speedModifier.boatMovement.right *
            gameSpeed *
            speedModifier
        );
        break;

      case "left":
        setObstaclesSpeed(
          settings.stones.speedModifier.boatMovement.left *
            gameSpeed *
            speedModifier
        );
        break;

      default:
        setObstaclesSpeed(settings.stones.speed * gameSpeed * speedModifier);
        break;
    }
    o.x = o.x - obstaclesSpeed;
    drawObstacle(context, o.x, o.y, o.size);
  };

  const updateObstacles = (context, frame, playerObject) => {
    const timeToSpawn = frame % obstaclesSpawnRate === 0;
    if (timeToSpawn) {
      const size = randomMinMax(
        settings.stones.minimumSize,
        settings.stones.maximumSize
      );
      const x = settings.canvasWidth;
      let y = randomMinMax(
        settings.background.height,
        settings.canvasHeight - size
      );

      while (
        failSpawnPosition(pickupsArray, x, y) ||
        failSpawnPosition(obstaclesArray, x, y)
      ) {
        y = randomMinMax(
          settings.background.height,
          settings.canvasHeight - size
        );
      }

      if (obstaclesArray.length > 30) {
        obstaclesArray.pop();
      }

      obstaclesArray.unshift({
        x: x,
        y: y,
        size: size,
      });
    }

    for (let i = 0; i < obstaclesArray.length; i++) {
      updateObstacle(context, obstaclesArray[i], playerObject);
    }
  };

  return {
    updateObstacles,
  };
};
