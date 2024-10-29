import { GroupVisibility, useLayerContext } from "../LayerContext";

import { LayerGroupList } from "./LayerGroupList";

export const LayerHandler = () => {
  const { layerTree, toggleGroupVisibility } = useLayerContext();

  return (
    <LayerGroupList
      layerGroups={layerTree}
      forcedInvisible={false}
      onVisibilityChange={(path) =>
        toggleGroupVisibility(path[path.length - 1] as keyof GroupVisibility)
      }
    />
  );
};
