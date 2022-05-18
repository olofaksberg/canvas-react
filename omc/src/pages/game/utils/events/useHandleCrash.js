/** @format */

import { useDispatch, useSelector } from "react-redux";
import { playerObject } from "../../../../store/playerObjectSlice";
import { handleHit, spawners } from "../../../../store/spawnersSlice";
import { checkIfHit } from "../../../../utils/checkIfHit";

// NEW
export const useHandleCrash = () => {
  const dispatch = useDispatch();
  const { obstacles } = useSelector(spawners);
  const { hitbox } = useSelector(playerObject);

  const handleCrash = () => {
    let collision = false;
    obstacles.forEach((o, i) => {
      const hit = checkIfHit(hitbox, o.x, o.y, o.size, o.size);
      if (hit) {
        dispatch(handleHit({ index: i, arr: "obstacles" }));
        collision = true;
        return;
      }
    });
    return collision;
  };

  return {
    handleCrash,
  };
};
