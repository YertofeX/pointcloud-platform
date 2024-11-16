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
  useCreateHeightMeasurement,
  useUpdateAreaMeasurement,
  useUpdateDistanceMeasurement,
  useUpdateHeightMeasurement,
} from "@api/hooks";
import { useWorkspaceContext } from "../components/WorkspaceContext/WorkspaceContext";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "@components/SnackbarManager";
import {
  AreaMeasurement,
  AreaMeasurementUpdateParams,
  DistanceMeasurement,
  DistanceMeasurementUpdateParams,
  HeightMeasurement,
  HeightMeasurementUpdateParams,
} from "@api/types";
import { LayerData, LayerGroupData } from "../components/LayerManager/types";
import { useLayerContext } from "../components/LayerManager/LayerContext";
import { useOriginContext } from "./OriginContext";
import { PermHeight } from "../components/objects/permHeight/PermHeightComponent";

export type PermObjectType = "distance" | "area" | "height" | "pointCloud";

type PermObjectData = {
  objectId: string;
  objectType: PermObjectType;
};

type PermObjectContextType = {
  permLines: PermLine[];
  permAreas: PermArea[];
  permHeights: PermHeight[];
  selected: PermObjectData | null;
  setSelected: React.Dispatch<React.SetStateAction<PermObjectData | null>>;
  highlighted: PermObjectData | null;
  setHighlighted: React.Dispatch<React.SetStateAction<PermObjectData | null>>;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  commitObject: (tool: Exclude<ToolName, "select">, points: Vector3[]) => void;
  updateObject: (
    params:
      | { tool: "line"; data: DistanceMeasurementUpdateParams & { id: string } }
      | { tool: "area"; data: AreaMeasurementUpdateParams & { id: string } }
      | {
          tool: "height";
          data: HeightMeasurementUpdateParams & { id: string };
        }
  ) => void;
};

export const PermObjectContext = createContext<PermObjectContextType>({
  permLines: [],
  permAreas: [],
  permHeights: [],
  selected: null,
  setSelected: () => {},
  highlighted: null,
  setHighlighted: () => {},
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

  const { transform } = useOriginContext();

  const { layerTree } = useLayerContext();

  const measurementGroup = layerTree["measurement"];
  const distanceMeasureGroup = measurementGroup.content[
    "distance-measure"
  ] as LayerGroupData;
  const areaMeasureGroup = measurementGroup.content[
    "area-measure"
  ] as LayerGroupData;
  const heightMeasureGroup = measurementGroup.content[
    "height-measure"
  ] as LayerGroupData;

  const permLines = useMemo<PermLine[]>(
    () =>
      measurementGroup.visible && distanceMeasureGroup.visible
        ? Object.entries(distanceMeasureGroup.content)
            .map(
              ([_, { data, visible }]: [
                id: string,
                value: LayerData<string, DistanceMeasurement>,
              ]) => ({ data, visible })
            )
            .filter(({ visible }) => visible)
            .map(({ data: { id, name, color, line, created, updated } }) => {
              const points = line.map(([x, y, z]) =>
                new Vector3(x, y, z).add(transform)
              );
              return {
                id,
                name,
                color,
                points,
                bounds: getBounds(points),
                width: 1,
                created,
                updated,
              } as PermLine;
            })
        : [],
    [measurementGroup.visible, distanceMeasureGroup, transform]
  );

  const permAreas = useMemo<PermArea[]>(
    () =>
      measurementGroup.visible && areaMeasureGroup.visible
        ? Object.entries(areaMeasureGroup.content)
            .map(
              ([_, { data, visible }]: [
                id: string,
                value: LayerData<string, AreaMeasurement>,
              ]) => ({ data, visible })
            )
            .filter(({ visible }) => visible)
            .map(({ data: { id, name, color, line, created, updated } }) => {
              const points = line.map(([x, y, z]) =>
                new Vector3(x, y, z).add(transform)
              );
              return {
                id,
                name,
                color,
                points,
                bounds: getBounds(points),
                width: 1,
                created,
                updated,
              } as PermArea;
            })
        : [],
    [measurementGroup.visible, areaMeasureGroup, transform]
  );

  const permHeights = useMemo<PermArea[]>(
    () =>
      measurementGroup.visible && heightMeasureGroup.visible
        ? Object.entries(heightMeasureGroup.content)
            .map(
              ([_, { data, visible }]: [
                id: string,
                value: LayerData<string, HeightMeasurement>,
              ]) => ({ data, visible })
            )
            .filter(({ visible }) => visible)
            .map(({ data: { id, name, color, line, created, updated } }) => {
              const points = line.map(([x, y, z]) =>
                new Vector3(x, y, z).add(transform)
              );
              return {
                id,
                name,
                color,
                points,
                bounds: getBounds(points),
                width: 1,
                created,
                updated,
              } as PermHeight;
            })
        : [],
    [measurementGroup.visible, heightMeasureGroup, transform]
  );

  const [selected, setSelected] = useState<PermObjectData | null>(null);

  const [highlighted, setHighlighted] = useState<PermObjectData | null>(null);

  const [editing, setEditing] = useState<boolean>(false);

  const { mutate: createDistanceMeasurement } = useCreateDistanceMeasurement();
  const commitLine = (points: Vector3[]) => {
    if (points.length < 2) {
      return;
    }
    const reverseTransform = transform.clone().multiplyScalar(-1);
    createDistanceMeasurement(
      {
        projectID,
        name: "new distance",
        color: randomColor(),
        line: points
          .map((point) => point.clone().add(reverseTransform))
          .map(({ x, y, z }) => [x, y, z]),
        visible: true,
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
    const reverseTransform = transform.clone().multiplyScalar(-1);
    createAreaMeasurement(
      {
        projectID,
        name: "new area",
        color: randomColor(),
        line: points
          .map((point) => point.clone().add(reverseTransform))
          .map(({ x, y, z }) => [x, y, z]),
        visible: true,
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

  const { mutate: createHeightMeasurement } = useCreateHeightMeasurement();
  const commitHeight = (points: Vector3[]) => {
    if (points.length !== 2) {
      return;
    }
    const reverseTransform = transform.clone().multiplyScalar(-1);
    createHeightMeasurement(
      {
        projectID,
        name: "new height",
        color: randomColor(),
        line: points
          .map((point) => point.clone().add(reverseTransform))
          .map(({ x, y, z }) => [x, y, z]),
        visible: true,
      },
      {
        onSuccess: () => {
          openSnackbar({
            message: t("project.tools.height-measurement-created-successfully"),
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
      case "height-measure":
        commitHeight(points);
        break;
    }
    setTool("select");
  };

  const { mutate: updateDistanceMeasurement } = useUpdateDistanceMeasurement();
  const { mutate: updateAreaMeasurement } = useUpdateAreaMeasurement();
  const { mutate: updateHeightMeasurement } = useUpdateHeightMeasurement();
  const updateObject = ({
    tool,
    data: { id, ...updateData },
  }:
    | { tool: "line"; data: DistanceMeasurementUpdateParams & { id: string } }
    | { tool: "area"; data: AreaMeasurementUpdateParams & { id: string } }
    | {
        tool: "height";
        data: HeightMeasurementUpdateParams & { id: string };
      }) => {
    switch (tool) {
      case "line":
        updateDistanceMeasurement(
          {
            measurementID: id,
            projectID,
            ...updateData,
          },
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
          { measurementID: id, projectID, ...updateData },
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
      case "height":
        updateHeightMeasurement(
          { measurementID: id, projectID, ...updateData },
          {
            onSuccess: () => {
              openSnackbar({
                message: t(
                  "project.tools.height-measurement-updated-successfully"
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
        permHeights,
        selected,
        setSelected,
        highlighted,
        setHighlighted,
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
