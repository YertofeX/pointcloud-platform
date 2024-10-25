import { useLayers } from "../useLayers";

import { LayerGroupList } from "./LayerGroupList";

export const LayerHandler = () => {
  const { layerTree, handleVisibilityChange } = useLayers();

  return (
    <LayerGroupList
      layerGroups={layerTree}
      forcedInvisible={false}
      onVisibilityChange={handleVisibilityChange}
    />
  );
};
