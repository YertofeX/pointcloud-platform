import { WithPointsStack } from "@modules/workspace/contexts/ToolContext";

export type DistanceMeasureToolState = WithPointsStack<{
  name: "distance-measure";
  minPoints: number;
}>;

export const DefaultDistanceMeasureToolState: DistanceMeasureToolState = {
  name: "distance-measure",
  minPoints: 2,
  pointsStack: [],
  stackIndex: -1,
};
