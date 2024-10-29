import { Vector3 } from "three";

export const toVec3 = (coords: [number, number, number]) => {
  const [x, y, z] = coords;
  return new Vector3(x, y, z);
};
