/** @format */

import { useState } from "react";

import pickUpPic from "../../../../sprite/Person.png";

import { settings } from "../../settings";

import { gameSpeed } from "../../../../store/gameplaySlice";
import { useSelector } from "react-redux";
import { randomMinMax } from "../../../../utils/randomMinMax";
import { obstaclesArray } from "./useHandleObstacles";
import { failSpawnPosition } from "./utils/failSpawnPosition";
import { playerObject } from "../../../../store/playerObjectSlice";

export const pickupsArray = [];

export const useHandlePickups = () => {
  const { boat } = useSelector(playerObject);
  const pickupImage = new Image();
  pickupImage.src = pickUpPic;

  const speed = useSelector(gameSpeed);

  const [pickupsSpeed, setPickupsSpeed] = useState(
    settings.drowningPeople.speed * speed
  );
  const [pickupsSpawnRate, setPickupsSpawnRate] = useState(
    settings.drowningPeople.spawnRate
  );

  const speedModifier = 0.35;

  const drawPickup = (context, x, y, s) => {
    context.drawImage(pickupImage, x, y, s, s);
  };

  const updatePickup = (context, o, playerObject) => {
    if (boat.moving) {
      if (boat.moving === "down" || boat.moving === "up") {
        setPickupsSpeed(settings.drowningPeople.speed * speed * speedModifier);
      } else {
        if (
          boat.moving === "right" &&
          boat.x < settings.canvasWidth - boat.width
        ) {
          setPickupsSpeed(
            settings.drowningPeople.speedModifier.boatMovement.right *
              speed *
              speedModifier
          );
        }
        if (boat.moving === "left") {
          setPickupsSpeed(
            settings.drowningPeople.speedModifier.boatMovement.left *
              speed *
              speedModifier
          );
        }
      }
    } else {
      setPickupsSpeed(settings.drowningPeople.speed * speed * speedModifier);
    }
    o.x = o.x - pickupsSpeed;
    drawPickup(context, o.x, o.y, o.size);
  };

  const updatePickups = (context, frame, playerObject) => {
    const timeToSpawn = frame % pickupsSpawnRate === 0;
    if (timeToSpawn) {
      const size = randomMinMax(
        settings.drowningPeople.minimumSize,
        settings.drowningPeople.maximumSize
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

      if (pickupsArray.length > 30) {
        pickupsArray.pop();
      }

      pickupsArray.unshift({
        x: x,
        y: y,
        size: size,
      });
    }

    for (let i = 0; i < pickupsArray.length; i++) {
      updatePickup(context, pickupsArray[i], playerObject);
    }
  };

  return {
    updatePickups,
  };
};
