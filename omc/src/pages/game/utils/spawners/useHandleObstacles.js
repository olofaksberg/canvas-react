/** @format */

import obstaclePic from "../../../../sprite/stones-sprite.png";
import { settings } from "../../../../config/settings";

import { useDispatch, useSelector } from "react-redux";
import {
 moveObstacles,
 spawners,
 spawnObstacle,
} from "../../../../store/spawnersSlice";

export const obstaclesArray = [];

export const useHandleObstacles = () => {
 const dispatch = useDispatch();
 const { obstacles } = useSelector(spawners);

 const obstacleImage = new Image();
 obstacleImage.src = obstaclePic;

 // not sure if this actually will be modified, so state seems unnecessary
 const obstaclesSpawnRate = settings.stones.spawnRate;

 const drawObstacle = (context, o) => {
  context.drawImage(
   obstacleImage,
   0,
   o.frame * 24,
   24,
   24,
   o.x,
   o.y,
   o.size,
   o.size
  );
 };

 const updateObstacles = (context, frame) => {
  const timeToSpawn = frame % obstaclesSpawnRate === 0;
  if (timeToSpawn) {
   dispatch(spawnObstacle());
  }
  dispatch(moveObstacles());

  for (let i = 0; i < obstacles.length; i++) {
   drawObstacle(context, obstacles[i]);
  }
 };

 return {
  updateObstacles,
 };
};
