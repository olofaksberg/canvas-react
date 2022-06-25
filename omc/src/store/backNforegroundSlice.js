/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../config/settings";

const initialState = {
 backgrounds: [
  {
   x: 0,
   x2: 2400,
   y: 0,
   width: 2400,
   height: settings.background.height,
   speed: settings.background.bg4.speed * settings.background.mainSpeed,
  },
  {
   x: 0,
   x2: 2400,
   y: 0,
   width: 2400,
   height: settings.background.height,
   speed: settings.background.bg3.speed * settings.background.mainSpeed,
  },
  {
   x: 0,
   x2: 2400,
   y: 0,
   width: 2400,
   height: settings.background.height,
   speed: settings.background.bg2.speed * settings.background.mainSpeed,
  },
  {
   x: 0,
   x2: 2400,
   y: 0,
   width: 2400,
   height: settings.background.height,
   speed: settings.background.bg1.speed * settings.background.mainSpeed,
  },
 ],
 foregrounds: [],
};

export const backNforegroundSlice = createSlice({
 name: "backNforeground",
 initialState,
 reducers: {
  updateBackgrounds: (state, action) => {
   state.backgrounds = state.backgrounds.map((b) => {
    return {
     ...b,
     x: b.x > -b.width ? b.x - b.speed : b.width,
     x2: b.x2 > -b.width ? b.x2 - b.speed : b.width,
    };
   });
  },

  updateForegrounds: (state, action) => {
   state.foregrounds = state.foregrounds.map((b) => {
    return {
     ...b,
     x: b.x > -b.width ? b.x - b.speed : b.width,
     x2: b.x2 > -b.width ? b.x2 - b.speed : b.width,
    };
   });
  },
 },
});

export const { updateBackgrounds, updateForegrounds } =
 backNforegroundSlice.actions;

// export data
export const backNforeground = (state) => {
 return {
  backgrounds: state.backNforeground.backgrounds,
  foregrounds: state.backNforeground.foregrounds,
 };
};

export default backNforegroundSlice.reducer;
