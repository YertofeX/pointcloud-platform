import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Vector3 } from "three";
import { PermLine } from "../components/objects/permLine/PermLineComponent";
import { PermArea } from "../components/objects/permArea/PermAreaComponent";
import { getBounds } from "../utils/getBounds";
import { randomColor } from "../utils/randomColor";
import { ToolName, useToolContext } from "./ToolContext";

export type PermObjectType = "line" | "area" | "pointcloud";

interface PermObjects {
  permLines: PermLine[];
  setPermLines: React.Dispatch<React.SetStateAction<PermLine[]>>;
  permAreas: PermArea[];
  setPermAreas: React.Dispatch<React.SetStateAction<PermArea[]>>;
  selectedObjectId: number | null;
  setSelectedObjectId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedObjectType: PermObjectType | null;
  setSelectedObjectType: React.Dispatch<
    React.SetStateAction<PermObjectType | null>
  >;
  highlighted: number | null;
  setHighlighted: React.Dispatch<React.SetStateAction<number | null>>;
  highlightedType: "area" | "distance" | null;
  setHighlightedType: React.Dispatch<
    React.SetStateAction<"area" | "distance" | null>
  >;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  commitObject: (tool: Exclude<ToolName, "select">, points: Vector3[]) => void;
}

export const PermObjectContext = createContext<PermObjects>({
  permLines: [],
  setPermLines: () => {},
  permAreas: [],
  setPermAreas: () => {},
  selectedObjectId: null,
  setSelectedObjectId: () => {},
  selectedObjectType: null,
  setSelectedObjectType: () => {},
  highlighted: null,
  setHighlighted: () => {},
  highlightedType: null,
  setHighlightedType: () => {},
  editing: false,
  setEditing: () => {},
  commitObject: () => {},
});

export const usePermObjectContext = () => useContext(PermObjectContext);

export const PermObjectProvider = ({ children }: PropsWithChildren) => {
  const { setTool } = useToolContext();

  const [permLines, setPermLines] = useState<PermLine[]>([]);
  const [permAreas, setPermAreas] = useState<PermArea[]>([]);

  const [selectedObjectId, setSelectedObjectId] = useState<number | null>(null);

  const [selectedObjectType, setSelectedObjectType] =
    useState<PermObjectType | null>(null);

  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [highlightedType, setHighlightedType] = useState<
    "area" | "distance" | null
  >(null);
  const [editing, setEditing] = useState<boolean>(false);

  const commitLine = (points: Vector3[]) => {
    if (points.length < 2) {
      return;
    }
    setPermLines((permLines) => {
      const id =
        permLines.length > 0 ? Math.max(...permLines.map((p) => p.id)) + 1 : 0;

      const bounds = getBounds(points);

      const line: PermLine = {
        id,
        name: `Line #${id}`,
        color: randomColor(),
        width: 3,
        visible: true,
        points,
        bounds,
      };
      return [...permLines, line];
    });
  };

  const commitArea = (points: Vector3[]) => {
    if (points.length < 3) {
      return;
    }

    setPermAreas((permAreas) => {
      const id =
        permAreas.length > 0 ? Math.max(...permAreas.map((p) => p.id)) + 1 : 0;

      const bounds = getBounds(points);

      const area: PermArea = {
        id,
        name: `Area #${id}`,
        color: randomColor(),
        width: 3,
        visible: true,
        points,
        bounds,
      };
      return [...permAreas, area];
    });
  };

  const commitObject = (
    tool: Exclude<ToolName, "select">,
    points: Vector3[]
  ) => {
    switch (tool) {
      case "distance-measure":
        commitLine(points);
        break;
      case "area-measure":
        commitArea(points);
        break;
    }
    setTool("select");
  };

  return (
    <PermObjectContext.Provider
      value={{
        permLines,
        setPermLines,
        permAreas,
        setPermAreas,
        selectedObjectId,
        setSelectedObjectId,
        selectedObjectType,
        setSelectedObjectType,
        highlighted,
        setHighlighted,
        highlightedType,
        setHighlightedType,
        commitObject,
        editing,
        setEditing,
      }}
    >
      {children}
    </PermObjectContext.Provider>
  );
};
