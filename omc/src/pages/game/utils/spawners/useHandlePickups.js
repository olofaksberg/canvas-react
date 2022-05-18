/** @format */

// CV:
// app: new profile pic .com

/** @format */

import pickupPic from "../../../../sprite/Person.png";
import { settings } from "../../settings";

import { useDispatch, useSelector } from "react-redux";
import {
  movePickups,
  spawners,
  spawnPickup,
} from "../../../../store/spawnersSlice";

export const useHandlePickups = () => {
  const dispatch = useDispatch();
  const { pickups } = useSelector(spawners);

  const pickupImage = new Image();
  pickupImage.src = pickupPic;

  // not sure if this actually will be modified, so state seems unnecessary
  const pickupsSpawnRate = settings.drowningPeople.spawnRate;

  const drawPickup = (context, o) => {
    context.drawImage(pickupImage, 0, 0, 60, 51, o.x, o.y, o.size, o.size);
  };

  const updatePickups = (context, frame) => {
    const timeToSpawn = frame % pickupsSpawnRate === 0;
    if (timeToSpawn) {
      dispatch(spawnPickup());
    }
    dispatch(movePickups());

    for (let i = 0; i < pickups.length; i++) {
      drawPickup(context, pickups[i]);
    }
  };

  return {
    updatePickups,
  };
};

// /** @format */

// import { useState } from "react";

// import pickUpPic from "../../../../sprite/Person.png";

// import { settings } from "../../settings";

// import { useSelector } from "react-redux";
// import { randomMinMax } from "../../../../utils/randomMinMax";
// import { obstaclesArray } from "./useHandleObstacles";
// import { failSpawnPosition } from "./utils/failSpawnPosition";
// import { playerObject } from "../../../../store/playerObjectSlice";
// import { gameplayData } from "../../../../store/gameplaySlice";

// export const pickupsArray = [];

// export const useHandlePickups = () => {
//   const { boat } = useSelector(playerObject);
//   const { gameSpeed } = useSelector(gameplayData);
//   const pickupImage = new Image();
//   pickupImage.src = pickUpPic;

//   const [pickupsSpeed, setPickupsSpeed] = useState(
//     settings.drowningPeople.speed * gameSpeed
//   );
//   const [pickupsSpawnRate, setPickupsSpawnRate] = useState(
//     settings.drowningPeople.spawnRate
//   );

//   const speedModifier = 0.35;

//   const drawPickup = (context, x, y, s) => {
//     context.drawImage(pickupImage, x, y, s, s);
//   };

//   const updatePickup = (context, o, playerObject) => {
//     if (boat.moving) {
//       if (boat.moving === "down" || boat.moving === "up") {
//         setPickupsSpeed(
//           settings.drowningPeople.speed * gameSpeed * speedModifier
//         );
//       } else {
//         if (
//           boat.moving === "right" &&
//           boat.x < settings.canvasWidth - boat.width
//         ) {
//           setPickupsSpeed(
//             settings.drowningPeople.speedModifier.boatMovement.right *
//               gameSpeed *
//               speedModifier
//           );
//         }
//         if (boat.moving === "left") {
//           setPickupsSpeed(
//             settings.drowningPeople.speedModifier.boatMovement.left *
//               gameSpeed *
//               speedModifier
//           );
//         }
//       }
//     } else {
//       setPickupsSpeed(
//         settings.drowningPeople.speed * gameSpeed * speedModifier
//       );
//     }
//     o.x = o.x - pickupsSpeed;
//     drawPickup(context, o.x, o.y, o.size);
//   };

//   const updatePickups = (context, frame, playerObject) => {
//     const timeToSpawn = frame % pickupsSpawnRate === 0;
//     if (timeToSpawn) {
//       const size = randomMinMax(
//         settings.drowningPeople.minimumSize,
//         settings.drowningPeople.maximumSize
//       );
//       const x = settings.canvasWidth;
//       let y = randomMinMax(
//         settings.background.height,
//         settings.canvasHeight - size
//       );

//       while (
//         failSpawnPosition(pickupsArray, x, y) ||
//         failSpawnPosition(obstaclesArray, x, y)
//       ) {
//         y = randomMinMax(
//           settings.background.height,
//           settings.canvasHeight - size
//         );
//       }

//       if (pickupsArray.length > 30) {
//         pickupsArray.pop();
//       }

//       pickupsArray.unshift({
//         x: x,
//         y: y,
//         size: size,
//       });
//     }

//     for (let i = 0; i < pickupsArray.length; i++) {
//       updatePickup(context, pickupsArray[i], playerObject);
//     }
//   };

//   return {
//     updatePickups,
//   };
// };
