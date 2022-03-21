/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../pages/game/settings";

const initLives = () => {
  const mm = [];
  for (let i = 0; i < settings.lives; i++) {
    mm.push("");
  }
  return mm;
};

const initialState = {
  lives: initLives(),
  score: 0,
  speed: settings.gameSpeed,
  // tempSpeed: 5,
  // tempSpeedOn: false,
  frame: 1,
  status: "idle",
  error: null,
};

export const gameplaySlice = createSlice({
  name: "gameplay",
  initialState,
  reducers: {
    lostLives: (state, action) => {
      state.lives.pop();
    },
    getLives: (state, action) => {
      state.lives = action.payload;
    },
    updateScore: (state, action) => {
      state.score += settings.scorePerSave;
    },
    updateSpeed: (state, action) => {
      state.speed += action.payload;
    },
    updateFrame: (state, action) => {
      state.frame++;
    },
    // reset: (state, action) => {
    //   state.lives = ["", "", "", "", "", "", "", "", "", ""];
    //   state.score = 0;
    //   state.speed = 5;
    //   state.status = "idle";
    //   state.error = null;
    // },
  },
});

export const { updateFrame, lostLives, getLives, updateScore } =
  gameplaySlice.actions;

// export states
export const status = (state) => state.gameplay.status;
export const error = (state) => state.gameplay.error;

// export data
export const frame = (state) => state.gameplay.frame;
export const lives = (state) => state.gameplay.lives;
export const speed = (state) => state.gameplay.speed;
// export const data = (state) => state.scores.data;

export default gameplaySlice.reducer;
