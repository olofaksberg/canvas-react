/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../config/settings";

import { randomMinMax } from "../utils/randomMinMax";

export const failSpawnPosition = (arr, x, y) => {
 for (let i = 0; i < arr.length; i++) {
  let s = arr[i];
  if (
   x < s.x + s.size &&
   x + s.size > s.x &&
   y < s.y + s.size &&
   y + s.size > s.y
  ) {
   return true;
  }
  return false;
 }
};

const initialState = {
 obstacles: [],
 pickups: [],
 speed: 1,
};

export const spawnersSlice = createSlice({
 name: "spawners",
 initialState,
 reducers: {
  spawnObstacle: (state, action) => {
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
    failSpawnPosition(state.pickups, x, y) ||
    failSpawnPosition(state.obstacles, x, y)
   ) {
    y = randomMinMax(settings.background.height, settings.canvasHeight - size);
   }
   state.obstacles.unshift({
    x: x,
    y: y,
    size: size,
    frame: Math.floor(Math.random() * 3),
   });
  },
  moveObstacles: (state, action) => {
   state.obstacles = state.obstacles.filter(
    (o, i) => o.x > -settings.stones.maximumSize
   );
   state.obstacles.map((o, i) => {
    o.x = o.x - state.speed;
   });
  },

  spawnPickup: (state, action) => {
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
    failSpawnPosition(state.pickups, x, y) ||
    failSpawnPosition(state.obstacles, x, y)
   ) {
    y = randomMinMax(settings.background.height, settings.canvasHeight - size);
   }
   state.pickups.unshift({
    x: x,
    y: y,
    size: size,
    frame: 0,
   });
  },
  movePickups: (state, action) => {
   state.pickups = state.pickups.filter(
    (o, i) => o.x > -settings.drowningPeople.maximumSize
   );
   state.pickups.map((o, i) => {
    o.x = o.x - state.speed;
   });
  },

  handleHit: (state, action) => {
   action.payload.arr === "obstacles"
    ? (state.obstacles = state.obstacles.filter(
       (o, i) => i !== action.payload.index
      ))
    : (state.pickups = state.pickups.filter(
       (o, i) => i !== action.payload.index
      ));
  },
 },
});

export const {
 spawnObstacle,
 moveObstacles,
 spawnPickup,
 movePickups,
 handleHit,
} = spawnersSlice.actions;

// export data
export const spawners = (state) => {
 return {
  obstacles: state.spawners.obstacles,
  pickups: state.spawners.pickups,
 };
};

export default spawnersSlice.reducer;
