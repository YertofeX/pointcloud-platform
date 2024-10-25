import { LayerData, LayerGroupData } from "./types";
import { useLayerContext } from "./LayerContext";

export const useLayers = () => {
  const { layerTree, setLayerTree } = useLayerContext();

  const handleVisibilityChange = (path: string[]) => {
    setLayerTree((draft) => {
      // Define the initial accumulator
      let obj: LayerData | LayerGroupData = {
        content: draft,
        visible: false,
        id: "",
        title: "",
      };

      // Traverse the path to find the target object
      for (const key of path) {
        if ("content" in obj && obj.content && key in obj.content) {
          obj = obj.content[key] as LayerData | LayerGroupData;
        } else {
          throw new Error("Invalid path");
        }
      }

      // Toggle visibility
      obj.visible = !obj.visible;
    });
  };

  return { layerTree, handleVisibilityChange };
};
