import { useEffect, useState } from "react";
import { Box3, Vector3 } from "three";
import { RootState, useThree } from "@react-three/fiber";
import { usePointCloudsContext } from "@modules/workspace/contexts/PointCloudsContext";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import { useToolContext } from "@modules/workspace/contexts/ToolContext";
import { CustomPointCloudOctreePicker } from "@modules/workspace/utils/picker/CustomPointCloudOctreePicker";
import { PolyLineComponent } from "../PolyLine";
import { getBounds } from "@modules/workspace/utils/getBounds";

export type PermLine = {
  id: number;
  points: Vector3[];
  color: string;
  name: string;
  width: number;
  visible: boolean;
  bounds: Box3;
};

interface Props {
  line: PermLine;
}

const picker = new CustomPointCloudOctreePicker();

export const PermLineComponent = ({ line }: Props) => {
  const { camera } = useThree();

  const { visiblePcos } = usePointCloudsContext();

  const { setPermLines, highlighted, setEditing, highlightedType } =
    usePermObjectContext();

  const { toolState } = useToolContext();

  const [points, setPoints] = useState<Vector3[]>(line.points);

  useEffect(() => {
    setPoints(line.points);
  }, line.points);

  const onGrab = (
    pointIndex: number,
    { raycaster, pointer, camera, gl }: RootState
  ) => {
    raycaster.setFromCamera(pointer, camera);
    const intersection = picker.pick(gl, camera, raycaster.ray, visiblePcos);
    if (intersection && intersection.position !== undefined) {
      setPoints((points) =>
        points.map((p, index) => {
          if (index !== pointIndex) {
            return p;
          }
          return intersection.position as unknown as Vector3;
        })
      );
    }
  };

  const cull = line.bounds.distanceToPoint(camera.position) >= 5000;

  const handleGrabEnd = () => {
    setEditing(false);
    setPermLines((permlines) =>
      permlines.map((cline) => {
        if (cline.id !== line.id) {
          return cline;
        }
        return {
          ...cline,
          bounds: getBounds(points),
          points,
        };
      })
    );
  };

  return (
    <PolyLineComponent
      visible={!cull && line.visible}
      onGrab={
        toolState.name == "distance-measure" && toolState.measuring
          ? onGrab
          : undefined
      }
      onGrabStart={() => setEditing(true)}
      onGrabEnd={handleGrabEnd}
      line={{
        points: points,
        width: highlighted === line.id && highlightedType == "distance" ? 6 : 3,
        color: line.color,
      }}
      showTotalDistance
    />
  );
};
