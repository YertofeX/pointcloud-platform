import { useLayerContext } from "../LayerContext";

import { LayerGroupList } from "./LayerGroupList";

export const LayerHandler = () => {
  const { layerTree } = useLayerContext();

  return (
    <LayerGroupList
      layerGroups={layerTree}
      forcedInvisible={false}
      onVisibilityChange={() => {}}
    />
  );
};
