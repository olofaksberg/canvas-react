/** @format */

import { useDispatch, useSelector } from "react-redux";
import { playerObject } from "../../../../store/playerObjectSlice";
import { handleHit, spawners } from "../../../../store/spawnersSlice";
import { checkIfHit } from "../../../../utils/checkIfHit";

export const useHandlePickup = () => {
  const dispatch = useDispatch();
  const { pickups } = useSelector(spawners);
  const { hitbox } = useSelector(playerObject);
  const handlePickup = () => {
    let collision = false;
    pickups.forEach((o, i) => {
      const hit = checkIfHit(hitbox, o.x, o.y, o.size, o.size);
      if (hit) {
        dispatch(handleHit({ index: i, arr: "pickups" }));
        collision = true;
        return;
      }
    });
    return collision;
  };

  return {
    handlePickup,
  };
};
