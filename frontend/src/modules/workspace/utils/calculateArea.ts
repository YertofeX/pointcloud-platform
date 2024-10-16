import { Vector3 } from "three";

export const calculateArea = (points: Vector3[]): number => {
  let acc = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const signedArea = (a.x * b.y - a.y * b.x) / 2;
    acc += signedArea;
  }
  return Math.abs(acc);
}
