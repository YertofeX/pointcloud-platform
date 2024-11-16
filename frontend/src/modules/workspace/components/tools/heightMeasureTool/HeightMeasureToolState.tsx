import { WithPointsStack } from "@modules/workspace/contexts/ToolContext";

export type HeightMeasureToolState = WithPointsStack<{
  name: "height-measure";
  minPoints: number;
}>;

export const DefaultHeightMeasureToolState: HeightMeasureToolState = {
  name: "height-measure",
  minPoints: 2,
  pointsStack: [],
  stackIndex: -1,
};
