import { Box3, Vector3 } from "three";

export const getBounds = (points: Vector3[]): Box3 => {
  if (points.length <= 0) {
    return new Box3(new Vector3(0, 0, 0));
  }
  const bounds = new Box3(points[0].clone());
  for (const point of points) {
    bounds.expandByPoint(point);
  }
  return bounds;
}
