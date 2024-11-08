import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { LayerData, LayerGroupList, LayerList, MainLayerGroup } from "./types";
import { ToolName } from "@modules/workspace/contexts/ToolContext";
import { useTranslation } from "react-i18next";
import {
  AreaMeasurement,
  DistanceMeasurement,
  PointCloudData,
} from "@api/types";
import { useGetAreaMeasurements, useGetDistanceMeasurements } from "@api/hooks";
import { useWorkspaceContext } from "../WorkspaceContext/WorkspaceContext";
import { DistanceMeasureActions } from "../tools/distanceMeasureTool/DistanceMeasureActions";
import { AreaMeasureActions } from "../tools/areaMeasureTool/AreaMeasureActions";
import { produce } from "immer";
import { useLocalStorage } from "@mantine/hooks";
import { PointCloudActions } from "../objects/pointCloud/PointCloudActions";
import { usePointCloudsContext } from "@modules/workspace/contexts/PointCloudsContext";

export type GroupVisibility = {
  file: boolean;
  measurement: boolean;
  "distance-measure": boolean;
  "area-measure": boolean;
};

type LayerContextType = {
  layerTree: LayerGroupList;
  toggleGroupVisibility: (key: keyof GroupVisibility) => void;
  distanceMeasurements: DistanceMeasurement[];
  areaMeasurements: AreaMeasurement[];
};

const LayerContext = createContext<LayerContextType>({
  layerTree: {},
  toggleGroupVisibility: () => {},
  distanceMeasurements: [],
  areaMeasurements: [],
});

export const useLayerContext = () => useContext(LayerContext);

export const LayerProvider = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();

  const {
    project: { id: projectID },
  } = useWorkspaceContext();

  const [staticGroupVisibility, setStaticGroupVisibility] = useLocalStorage({
    key: `static-layer-visibility-${projectID}`,
    defaultValue: {
      file: true,
      measurement: true,
      "distance-measure": true,
      "area-measure": true,
    },
  });

  const toggleGroupVisibility = (key: keyof GroupVisibility) => {
    setStaticGroupVisibility(
      produce((draft) => {
        draft[key] = !draft[key];
      })
    );
  };

  const { data: distanceMeasurements } = useGetDistanceMeasurements({
    projectID,
  });
  const distanceMeasureLayers = useMemo<LayerList<DistanceMeasurement>>(
    () =>
      distanceMeasurements
        ? Object.fromEntries(
            distanceMeasurements.map((measurement) => [
              measurement.id,
              {
                id: measurement.id,
                title: measurement.name,
                visible: measurement.visible,
                data: measurement,
                ActionComponent: DistanceMeasureActions,
              } as LayerData<string, DistanceMeasurement>,
            ])
          )
        : {},
    [distanceMeasurements]
  );

  const { data: areaMeasurements } = useGetAreaMeasurements({ projectID });
  const areaMeasureLayers = useMemo<LayerList<AreaMeasurement>>(
    () =>
      areaMeasurements
        ? Object.fromEntries(
            areaMeasurements.map((measurement) => [
              measurement.id,
              {
                id: measurement.id,
                title: measurement.name,
                visible: measurement.visible,
                data: measurement,
                ActionComponent: AreaMeasureActions,
              } as LayerData<string, AreaMeasurement>,
            ])
          )
        : {},
    [areaMeasurements]
  );

  const measurementLayerGroups = useMemo<
    LayerGroupList<Exclude<ToolName, "select">>
  >(
    () => ({
      "distance-measure": {
        id: "distance-measure",
        title: t("project.layers.distance-measurements"),
        visible: staticGroupVisibility["distance-measure"],
        content: distanceMeasureLayers,
      },
      "area-measure": {
        id: "area-measure",
        title: t("project.layers.area-measurements"),
        visible: staticGroupVisibility["area-measure"],
        content: areaMeasureLayers,
      },
    }),
    [distanceMeasureLayers, areaMeasureLayers, staticGroupVisibility]
  );

  const { pointClouds } = usePointCloudsContext();
  const pointCloudLayers = useMemo<LayerList<PointCloudData>>(
    () =>
      pointClouds
        ? (Object.fromEntries(
            pointClouds.map((pointCloud) => [
              String(pointCloud.id),
              {
                id: String(pointCloud.id),
                title: pointCloud.name,
                visible: pointCloud.visible,
                data: pointCloud,
                ActionComponent: PointCloudActions,
              } as LayerData<string, PointCloudData>,
            ])
          ) as LayerList)
        : {},
    [pointClouds]
  );

  const mainLayerGroups = useMemo<LayerGroupList<MainLayerGroup>>(
    () => ({
      file: {
        id: "file",
        title: t("project.layers.files"),
        content: pointCloudLayers,
        visible: staticGroupVisibility.file,
      },
      measurement: {
        id: "measurement",
        title: t("project.layers.measurements"),
        content: measurementLayerGroups,
        visible: staticGroupVisibility.measurement,
      },
    }),
    [measurementLayerGroups, pointCloudLayers, staticGroupVisibility]
  );

  return (
    <LayerContext.Provider
      value={{
        layerTree: mainLayerGroups,
        toggleGroupVisibility,
        distanceMeasurements: distanceMeasurements ?? [],
        areaMeasurements: areaMeasurements ?? [],
      }}
    >
      {children}
    </LayerContext.Provider>
  );
};
