/** @format */

import { useDispatch, useSelector } from "react-redux";

import bg1Pic from "../../../sprite/bg1.png";
import bg2Pic from "../../../sprite/bg2.png";
import bg3Pic from "../../../sprite/bg3.png";
import bg4Pic from "../../../sprite/bg4.png";

import {
  backNforeground,
  updateBackgrounds,
  updateForegrounds,
} from "../../../store/backNforegroundSlice";

export const useHandleBNFground = () => {
  const dispatch = useDispatch();
  const { backgrounds, foregrounds } = useSelector(backNforeground);

  // add back & foregrounds here
  const bg1P = new Image();
  bg1P.src = bg1Pic;
  const bg2P = new Image();
  bg2P.src = bg2Pic;
  const bg3P = new Image();
  bg3P.src = bg3Pic;
  const bg4P = new Image();
  bg4P.src = bg4Pic;

  const backgroundImages = [bg4P, bg3P, bg2P, bg1P];
  const foregroundImages = [];
  // ---

  const draw = (context, o) => {
    context.drawImage(o.image, o.x, o.y, o.width, o.height);
    context.drawImage(o.image, o.x2, o.y, o.width, o.height);
  };

  const updateBackground = (context) => {
    for (let i = 0; i < backgrounds.length; i++) {
      const b = backgrounds[i];
      draw(context, { ...b, image: backgroundImages[i] });
      dispatch(updateBackgrounds());
    }
  };
  const updateForeground = (context) => {
    for (let i = 0; i < foregrounds.length; i++) {
      const b = foregrounds[i];
      draw(context, { ...b, image: foregroundImages[i] });
      dispatch(updateForegrounds());
    }
  };

  return {
    updateBackground,
    updateForeground,
  };
};
