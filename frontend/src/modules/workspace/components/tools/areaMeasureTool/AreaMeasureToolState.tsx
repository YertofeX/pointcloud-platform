import { WithPointsStack } from "@modules/workspace/contexts/ToolContext";

export type AreaMeasureToolState = WithPointsStack<{
  name: "area-measure";
  minPoints: number;
}>;

export const DefaultAreaMeasureToolState: AreaMeasureToolState = {
  name: "area-measure",
  minPoints: 3,
  pointsStack: [],
  stackIndex: -1,
};
