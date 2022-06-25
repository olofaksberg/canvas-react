/** @format */

import boatSprite from "../../../../sprite/boat-3.png";

import { settings } from "../../../../config/settings";

import { animateBoat, playerObject } from "../../../../store/playerObjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHandleMovement } from "./utils/movePlayerObject";

export const useHandlePlayerObject = () => {
 const dispatch = useDispatch();
 const { boat, hitbox } = useSelector(playerObject);
 const boatImage = new Image();
 boatImage.src = boatSprite;

 const { movePlayerObject } = useHandleMovement();

 const drawBoat = (context) => {
  context.drawImage(
   boatImage,
   boat.frameX * boat.width,
   boat.frameY * boat.height,
   boat.width,
   boat.height,
   boat.x,
   boat.y,
   boat.width,
   boat.height
  );
 };

 const drawPlayerObject = (context) => {
  drawBoat(context);
 };

 const playerObjectAnimations = (frame) => {
  if (frame % settings.boat.animationSpeed === 0) {
   dispatch(animateBoat());
  }
 };

 return {
  drawPlayerObject,
  movePlayerObject,
  playerObjectAnimations,
  hitbox,
 };
};
