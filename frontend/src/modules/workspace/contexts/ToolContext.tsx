import { createContext, PropsWithChildren, useContext, useState } from "react";
import {
  DefaultDistanceMeasureToolState,
  DistanceMeasureToolState,
} from "../components/tools/distanceMeasureTool/DistanceMeasureToolState";
import {
  DefaultSelectToolState,
  SelectToolState,
} from "../components/tools/selectTool/SelectToolState";
import {
  AreaMeasureToolState,
  DefaultAreaMeasureToolState,
} from "../components/tools/areaMeasureTool/AreaMeasureToolState";
import { Vector3 } from "three";
import {
  DefaultHeightMeasureToolState,
  HeightMeasureToolState,
} from "../components/tools/heightMeasureTool/HeightMeasureToolState";

export type WithPointsStack<T> = T & {
  pointsStack: Vector3[][];
  stackIndex: number;
};

export type ToolState =
  | SelectToolState
  | DistanceMeasureToolState
  | AreaMeasureToolState
  | HeightMeasureToolState;

export type ToolName = ToolState["name"];

type ToolContextType = {
  toolState: ToolState;
  setToolState: React.Dispatch<React.SetStateAction<ToolState>>;
  setTool: (name: ToolName) => void;
};

export const ToolContext = createContext<ToolContextType>({
  toolState: { name: "select" },
  setToolState: () => {},
  setTool: () => {},
});

export const useToolContext = () => useContext(ToolContext);

export const ToolProvider = ({ children }: PropsWithChildren) => {
  const [toolState, setToolState] = useState<ToolState>(DefaultSelectToolState);

  const handleToolChange = (name: ToolName) => {
    switch (name) {
      case "select":
        setToolState(DefaultSelectToolState);
        break;
      case "distance-measure":
        setToolState(DefaultDistanceMeasureToolState);
        break;
      case "area-measure":
        setToolState(DefaultAreaMeasureToolState);
        break;
      case "height-measure":
        setToolState(DefaultHeightMeasureToolState);
        break;
    }
  };

  return (
    <ToolContext.Provider
      value={{ toolState, setToolState, setTool: handleToolChange }}
    >
      {children}
    </ToolContext.Provider>
  );
};
