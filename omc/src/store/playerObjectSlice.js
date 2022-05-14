/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../pages/game/settings";

const initialState = {
  boat: {
    x: settings.boat.startPositionX,
    y: settings.boat.startPositionY,
    width: 176,
    height: 74,
    frameX: 0,
    frameY: 0,
    speed: settings.boat.speed,
    moving: false,
    animationSpeed: settings.boat.animationSpeed,
  },
  hitbox: [
    {
      x: settings.boat.startPositionX,
      y: settings.boat.startPositionY,
    },
    {
      x: settings.boat.startPositionX + 134 - 5,
      y: settings.boat.startPositionX + 46 - 5,
    },
  ],
  status: "idle",
  error: null,
};

export const playerObjectSlice = createSlice({
  name: "playerObject",
  initialState,
  reducers: {
    move: (state, action) => {
      const direction = action.payload;
      switch (direction) {
        case "up":
          state.boat.y = state.boat.y - state.boat.speed;
          state.boat.frameY = 3;
          break;

        case "down":
          state.boat.y = state.boat.y + state.boat.speed;
          state.boat.frameY = 1;
          break;

        case "right":
          state.boat.x = state.boat.x + state.boat.speed;
          state.boat.frameY = 0;
          state.hitbox = [
            {
              x: state.boat.x + 5,
              y: state.boat.y,
            },
            {
              x: state.boat.x + state.boat.width - 5,
              y: state.boat.y + state.boat.height - 5,
            },
          ];
          break;

        case "left":
          state.boat.x = state.boat.x - state.boat.speed;
          state.boat.frameY = 2;

          state.hitbox = [
            {
              x: state.boat.x + 5,
              y: state.boat.y + state.boat.height - 5,
            },
            {
              x: state.boat.x + state.boat.width - 5,
              y: state.boat.y + 5,
            },
          ];
          break;

        default:
          state.boat.moving = false;
          break;
      }
      state.boat.moving = direction;
    },
    animateBoat: (state, action) => {
      const newFrame = state.boat.frameX < 2 ? state.boat.frameX + 1 : 0;
      state.boat.frameX = newFrame;
    },
  },
});

export const { move, animateBoat } = playerObjectSlice.actions;

// export states
export const status = (state) => state.playerObject.status;
export const error = (state) => state.playerObject.error;

// export data
export const playerObject = (state) => {
  return {
    boat: state.playerObject.boat,
    hitbox: state.playerObject.hitbox,
  };
};

export default playerObjectSlice.reducer;
