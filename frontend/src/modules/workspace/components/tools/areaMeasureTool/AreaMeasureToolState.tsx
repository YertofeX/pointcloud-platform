import { Vector3 } from "three";

export type AreaMeasureToolState = {
  name: "area-measure";
  measuring: boolean;
  areaPoints: Vector3[];
};

export const DefaultAreaMeasureToolState: AreaMeasureToolState = {
  name: "area-measure",
  measuring: true,
  areaPoints: [],
};
