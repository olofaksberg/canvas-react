/** @format */

import { useDispatch, useSelector } from "react-redux";
import { move, playerObject } from "../../../../../store/playerObjectSlice";
import { settings } from "../../../../../config/settings";

export const useHandleMovement = () => {
 const dispatch = useDispatch();
 const { boat } = useSelector(playerObject);

 const movePlayerObject = (keysArray) => {
  if (keysArray.length !== 0) {
   if (keysArray.includes("ArrowUp")) {
    const check1 = () => {
     return boat.y > settings.background.height - 30;
    };
    if (check1()) {
     dispatch(move("up"));
    } else {
     dispatch(move("nope"));
    }
   }

   if (keysArray.includes("ArrowDown")) {
    const check1 = () => {
     return boat.y < settings.canvasHeight - boat.height;
    };
    if (check1()) {
     dispatch(move("down"));
    } else {
     dispatch(move("nope"));
    }
   }

   if (keysArray.includes("ArrowRight")) {
    const check1 = () => {
     return boat.x < settings.canvasWidth - boat.width;
    };
    if (check1()) {
     dispatch(move("right"));
    } else {
     dispatch(move("nope"));
    }
   }

   if (keysArray.includes("ArrowLeft")) {
    const check1 = () => {
     return boat.x > 0;
    };
    if (check1()) {
     dispatch(move("left"));
    } else {
     dispatch(move("nope"));
    }
   }
  }
 };
 return {
  movePlayerObject,
 };
};
