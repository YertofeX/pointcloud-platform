import { useEffect } from "react";
import { useToolContext } from "../contexts/ToolContext";
import { DistanceMeasureToolView } from "./tools/distanceMeasureTool/DistanceMeasureToolView";
import { SelectToolView } from "./tools/selectTool/SelectToolView";
import { AreaMeasureToolView } from "./tools/areaMeasureTool/AreaMeasureToolView";

export const ToolHandler = () => {
  const { toolState, setTool } = useToolContext();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "s" && toolState.name !== "select") {
        setTool("select");
      }
      if (e.key === "d" && toolState.name !== "distance-measure") {
        setTool("distance-measure");
      }
      if (e.key === "a" && toolState.name !== "area-measure") {
        setTool("area-measure");
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [toolState, setTool]);

  switch (toolState.name) {
    case "select":
      return <SelectToolView />;
    case "distance-measure":
      return <DistanceMeasureToolView />;
    case "area-measure":
      return <AreaMeasureToolView />;
  }
};
