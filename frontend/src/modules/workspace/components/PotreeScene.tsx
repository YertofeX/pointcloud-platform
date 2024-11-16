import { useFrame } from "@react-three/fiber";
import {
  PointCloud,
  usePointCloudsContext,
} from "../contexts/PointCloudsContext";
import { useLayerContext } from "./LayerManager/LayerContext";
import { LayerList } from "./LayerManager/types";

export const PotreeScene = () => {
  const { potree, pointCloudsRef } = usePointCloudsContext();

  const { layerTree } = useLayerContext();
  const fileGroup = layerTree["file"];

  const visiblePcosWithId = Object.entries(
    fileGroup.content as LayerList<PointCloud>
  )
    .filter(([_, { visible }]) => visible)
    .map(
      ([
        id,
        {
          data: { pco },
        },
      ]) => ({ id, pco })
    );

  useFrame(({ camera, gl }) => {
    potree.updatePointClouds(
      visiblePcosWithId.map(({ pco }) => pco),
      camera,
      gl
    );
  });

  if (!fileGroup.visible) return null;

  return (
    <group ref={pointCloudsRef}>
      {visiblePcosWithId.map(({ id, pco }) => (
        <primitive key={id} object={pco} />
      ))}
    </group>
  );
};
