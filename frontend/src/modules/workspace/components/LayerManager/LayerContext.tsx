import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { LayerData, LayerGroupList, LayerList, MainLayerGroup } from "./types";
import { ToolName } from "@modules/workspace/contexts/ToolContext";
import { useTranslation } from "react-i18next";
import { AreaMeasurement, DistanceMeasurement } from "@api/types";
import { useGetAreaMeasurements, useGetDistanceMeasurements } from "@api/hooks";
import { useWorkspaceContext } from "../WorkspaceContext/WorkspaceContext";
import { usePointCloudsContext } from "@modules/workspace/contexts/PointCloudsContext";
import { DistanceMeasureActions } from "../tools/distanceMeasureTool/DistanceMeasureActions";
import { AreaMeasureActions } from "../tools/areaMeasureTool/AreaMeasureActions";

type LayerContextType = {
  layerTree: LayerGroupList;
};

const LayerContext = createContext<LayerContextType>({
  layerTree: {},
});

export const useLayerContext = () => useContext(LayerContext);

export const LayerProvider = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();

  const { pointClouds } = usePointCloudsContext();

  const {
    project: { id: projectID },
  } = useWorkspaceContext();

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
        visible: true,
        content: distanceMeasureLayers,
      },
      "area-measure": {
        id: "area-measure",
        title: t("project.layers.area-measurements"),
        visible: true,
        content: areaMeasureLayers,
      },
    }),
    [distanceMeasureLayers, areaMeasureLayers]
  );

  const mainLayerGroups = useMemo<LayerGroupList<MainLayerGroup>>(
    () => ({
      file: {
        id: "file",
        title: t("project.layers.files"),
        content: Object.fromEntries(
          pointClouds.map(({ pco: { id, name }, visible }) => [
            String(id),
            {
              id: String(id),
              title: name,
              visible,
              data: name,
            } as LayerData<string>,
          ])
        ) as LayerList,
        visible: true,
      },
      measurement: {
        id: "measurement",
        title: t("project.layers.measurements"),
        content: measurementLayerGroups,
        visible: true,
      },
    }),
    [measurementLayerGroups, pointClouds]
  );

  return (
    <LayerContext.Provider value={{ layerTree: mainLayerGroups }}>
      {children}
    </LayerContext.Provider>
  );
};
