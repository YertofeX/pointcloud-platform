import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { Vector3 } from "three";
import { PermLine } from "../components/objects/permLine/PermLineComponent";
import { PermArea } from "../components/objects/permArea/PermAreaComponent";
import { getBounds } from "../utils/getBounds";
import { randomColor } from "../utils/randomColor";
import { ToolName, useToolContext } from "./ToolContext";
import {
  useCreateAreaMeasurement,
  useCreateDistanceMeasurement,
  useGetAreaMeasurements,
  useGetDistanceMeasurements,
  useUpdateAreaMeasurement,
  useUpdateDistanceMeasurement,
} from "@api/hooks";
import { useWorkspaceContext } from "../components/WorkspaceContext/WorkspaceContext";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "@components/SnackbarManager";
import {
  AreaMeasurementUpdateParams,
  DistanceMeasurementUpdateParams,
} from "@api/types";

export type PermObjectType = "line" | "area" | "pointcloud";

type PermObjectContextType = {
  permLines: PermLine[];
  permAreas: PermArea[];
  selectedObjectId: string | null;
  setSelectedObjectId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedObjectType: PermObjectType | null;
  setSelectedObjectType: React.Dispatch<
    React.SetStateAction<PermObjectType | null>
  >;
  highlighted: string | null;
  setHighlighted: React.Dispatch<React.SetStateAction<string | null>>;
  highlightedType: "area" | "distance" | null;
  setHighlightedType: React.Dispatch<
    React.SetStateAction<"area" | "distance" | null>
  >;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  commitObject: (tool: Exclude<ToolName, "select">, points: Vector3[]) => void;
  updateObject: (
    params:
      | { tool: "line"; data: DistanceMeasurementUpdateParams & { id: string } }
      | { tool: "area"; data: AreaMeasurementUpdateParams & { id: string } }
  ) => void;
};

export const PermObjectContext = createContext<PermObjectContextType>({
  permLines: [],
  permAreas: [],
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
  updateObject: () => {},
});

export const usePermObjectContext = () => useContext(PermObjectContext);

export const PermObjectProvider = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();

  const { openSnackbar } = useSnackbar();

  const { setTool } = useToolContext();

  const {
    project: { id: projectID },
  } = useWorkspaceContext();

  const { data: distanceMeasurements } = useGetDistanceMeasurements({
    projectID,
  });
  const permLines = useMemo<PermLine[]>(
    () =>
      distanceMeasurements?.map(
        ({ id, name, color, created, updated, line }) => {
          const points = line.map(([x, y, z]) => new Vector3(x, y, z));
          return {
            id,
            name,
            color,
            points,
            bounds: getBounds(points),
            visible: true,
            width: 1,
            created,
            updated,
          } as PermLine;
        }
      ) ?? [],
    [distanceMeasurements]
  );

  const { data: areaMeasurements } = useGetAreaMeasurements({ projectID });
  const permAreas = useMemo<PermArea[]>(
    () =>
      areaMeasurements?.map(({ id, name, color, created, updated, line }) => {
        const points = line.map(([x, y, z]) => new Vector3(x, y, z));
        return {
          id,
          name,
          color,
          points,
          bounds: getBounds(points),
          visible: true,
          width: 1,
          created,
          updated,
        } as PermArea;
      }) ?? [],
    [areaMeasurements]
  );

  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

  const [selectedObjectType, setSelectedObjectType] =
    useState<PermObjectType | null>(null);

  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [highlightedType, setHighlightedType] = useState<
    "area" | "distance" | null
  >(null);
  const [editing, setEditing] = useState<boolean>(false);

  const { mutate: createDistanceMeasurement } = useCreateDistanceMeasurement();
  const commitLine = (points: Vector3[]) => {
    if (points.length < 2) {
      return;
    }
    createDistanceMeasurement(
      {
        projectID,
        name: "new distance",
        color: randomColor(),
        line: points.map(({ x, y, z }) => [x, y, z]),
      },
      {
        onSuccess: () => {
          openSnackbar({
            message: t(
              "project.tools.distance-measurement-created-successfully"
            ),
            severity: "success",
          });
        },
      }
    );
  };

  const { mutate: createAreaMeasurement } = useCreateAreaMeasurement();
  const commitArea = (points: Vector3[]) => {
    if (points.length < 3) {
      return;
    }

    createAreaMeasurement(
      {
        projectID,
        name: "new area",
        color: randomColor(),
        line: points.map(({ x, y, z }) => [x, y, z]),
      },
      {
        onSuccess: () => {
          openSnackbar({
            message: t("project.tools.area-measurement-created-successfully"),
            severity: "success",
          });
        },
      }
    );
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

  const { mutate: updateDistanceMeasurement } = useUpdateDistanceMeasurement();
  const { mutate: updateAreaMeasurement } = useUpdateAreaMeasurement();
  const updateObject = ({
    tool,
    data: { id, ...updateData },
  }:
    | { tool: "line"; data: DistanceMeasurementUpdateParams & { id: string } }
    | { tool: "area"; data: AreaMeasurementUpdateParams & { id: string } }) => {
    switch (tool) {
      case "line":
        updateDistanceMeasurement(
          { measurementID: id, ...updateData },
          {
            onSuccess: () => {
              openSnackbar({
                message: t(
                  "project.tools.distance-measurement-updated-successfully"
                ),
                severity: "success",
              });
            },
          }
        );
        break;
      case "area":
        updateAreaMeasurement(
          { measurementID: id, ...updateData },
          {
            onSuccess: () => {
              openSnackbar({
                message: t(
                  "project.tools.area-measurement-updated-successfully"
                ),
                severity: "success",
              });
            },
          }
        );
        break;
      default:
        break;
    }
  };

  return (
    <PermObjectContext.Provider
      value={{
        permLines,
        permAreas,
        selectedObjectId,
        setSelectedObjectId,
        selectedObjectType,
        setSelectedObjectType,
        highlighted,
        setHighlighted,
        highlightedType,
        setHighlightedType,
        editing,
        setEditing,
        commitObject,
        updateObject,
      }}
    >
      {children}
    </PermObjectContext.Provider>
  );
};
