import { createContext, PropsWithChildren, useContext } from "react";
import { LayerData, LayerGroupList, LayerList, MainLayerGroup } from "./types";
import { Updater, useImmer } from "use-immer";
import { ToolName } from "@modules/workspace/contexts/ToolContext";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import { usePointCloudsContext } from "@modules/workspace/contexts/PointCloudsContext";
import { useTranslation } from "react-i18next";

type LayerContextType = {
  layerTree: LayerGroupList;
  setLayerTree: Updater<LayerGroupList>;
};

const LayerContext = createContext<LayerContextType>({
  layerTree: {},
  setLayerTree: () => {},
});

export const useLayerContext = () => useContext(LayerContext);

export const LayerProvider = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();

  const { pointClouds } = usePointCloudsContext();

  const { permLines, permAreas } = usePermObjectContext();

  const measurementLayerGroups: LayerGroupList<Exclude<ToolName, "select">> = {
    "distance-measure": {
      id: "distance-measure",
      title: t("project.layers.distance-measurements"),
      visible: true,
      content: Object.fromEntries(
        permLines.map(({ id, name, visible }) => [
          id,
          {
            id,
            title: name,
            visible,
          } as LayerData,
        ])
      ) as LayerList,
    },
    "area-measure": {
      id: "area-measure",
      title: t("project.layers.area-measurements"),
      visible: true,
      content: Object.fromEntries(
        permAreas.map(({ id, name, visible }) => [
          id,
          {
            id,
            title: name,
            visible,
          } as LayerData,
        ])
      ) as LayerList,
    },
  };

  const mainLayerGroups: LayerGroupList<MainLayerGroup> = {
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
          } as LayerData,
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
  };

  const [layerTree, setLayerTree] = useImmer<LayerGroupList>(mainLayerGroups);

  return (
    <LayerContext.Provider value={{ layerTree, setLayerTree }}>
      {children}
    </LayerContext.Provider>
  );
};
