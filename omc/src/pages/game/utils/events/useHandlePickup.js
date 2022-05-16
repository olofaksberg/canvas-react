/** @format */

import { useSelector } from "react-redux";
import { playerObject } from "../../../../store/playerObjectSlice";
import { checkIfHit } from "../../../../utils/checkIfHit";
// import { pickUpsArray } from "../spawners/useHandleSpawners";
import { pickupsArray } from "../spawners/useHandlePickups";

export const useHandlePickup = () => {
  const { hitbox } = useSelector(playerObject);
  const handlePickup = () => {
    let collision = false;
    pickupsArray.forEach((o) => {
      const hit = checkIfHit(hitbox, o.x, o.y, o.size, o.size);
      if (hit) {
        o.y = 1000;
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
