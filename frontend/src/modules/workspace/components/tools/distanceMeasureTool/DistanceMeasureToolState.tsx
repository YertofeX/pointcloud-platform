import { Vector3 } from "three";

export type DistanceMeasureToolState = {
  name: "distance-measure";
  measuring: boolean;
  linePoints: Vector3[];
};

export const DefaultDistanceMeasureToolState: DistanceMeasureToolState = {
  name: "distance-measure",
  measuring: true,
  linePoints: [],
};
