/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../pages/game/settings";

const initLives = () => {
  const arr = [];
  for (let i = 0; i < settings.lives; i++) {
    arr.push("");
  }
  return arr;
};

const initialState = {
  playerName: "",
  playerEmail: "",
  lives: initLives(),
  score: 0,
  gameSpeed: settings.gameSpeed,
  gameOver: false,
  status: "idle",
  error: null,
};

export const gameplaySlice = createSlice({
  name: "gameplay",
  initialState,
  reducers: {
    startGame: (state, action) => {
      const { name, email } = action.payload;
      state.playerName = name;
      state.playerEmail = email;
    },
    lostLives: (state, action) => {
      state.lives.pop();
    },
    getLives: (state, action) => {
      state.lives = action.payload;
    },
    updateScore: (state, action) => {
      state.score += settings.scorePerSave;
    },
    updatePlayer: (state, action) => {
      state.playerName = action.payload.name;
      state.playerEmail = action.payload.email;
    },
    updateSpeed: (state, action) => {
      state.speed += 0.3;
      console.log(state.speed);
    },
    updateFrame: (state, action) => {
      state.frame++;
    },
    setGameOver: (state, action) => {
      state.gameOver = action.payload;
    },
    reset: (state, action) => {
      state.playerName = "";
      state.playerEmail = "";
      state.lives = initLives();
      state.score = 0;
      state.speed = settings.gameSpeed;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  startGame,
  updateSpeed,
  updateFrame,
  lostLives,
  getLives,
  updateScore,
  setGameOver,
  reset,
} = gameplaySlice.actions;

export const gameplayData = (state) => {
  const origin = state.gameplay;
  return {
    name: origin.playerName,
    email: origin.playerEmail,
    lives: origin.lives,
    score: origin.score,
    gameSpeed: origin.gameSpeed,
    gameOver: origin.gameOver,
    status: origin.status,
  };
};

export default gameplaySlice.reducer;
