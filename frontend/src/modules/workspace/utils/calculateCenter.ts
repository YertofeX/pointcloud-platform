import { Vector3 } from "three";

export const calculateCenter = (...points: Vector3[]): Vector3 => {
  return points.reduce((l, r) => l.clone().add(r), new Vector3()).divideScalar(points.length);
}
