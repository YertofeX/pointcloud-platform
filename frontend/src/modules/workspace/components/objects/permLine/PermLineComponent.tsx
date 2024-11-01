import { useEffect, useState } from "react";
import { Box3, Vector3 } from "three";
import { RootState, useThree } from "@react-three/fiber";
import { usePointCloudsContext } from "@modules/workspace/contexts/PointCloudsContext";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import { useToolContext } from "@modules/workspace/contexts/ToolContext";
import { CustomPointCloudOctreePicker } from "@modules/workspace/utils/picker/CustomPointCloudOctreePicker";
import { PolyLineComponent } from "../PolyLine";

export type PermLine = {
  id: string;
  points: Vector3[];
  color: string;
  name: string;
  width: number;
  bounds: Box3;
  created: string;
  updated: string;
};

type Props = {
  line: PermLine;
};

const picker = new CustomPointCloudOctreePicker();

export const PermLineComponent = ({ line }: Props) => {
  const { camera } = useThree();

  const { visiblePcos } = usePointCloudsContext();

  const { updateObject, highlighted, setEditing } = usePermObjectContext();

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
    updateObject({
      tool: "line",
      data: { id: line.id, line: points.map(({ x, y, z }) => [x, y, z]) },
    });
  };

  return (
    <PolyLineComponent
      visible={!cull}
      onGrab={toolState.name == "distance-measure" ? onGrab : undefined}
      onGrabStart={() => setEditing(true)}
      onGrabEnd={handleGrabEnd}
      line={{
        points: points,
        width:
          highlighted?.objectId === line.id &&
          highlighted?.objectType === "distance"
            ? 6
            : 3,
        color: line.color,
      }}
      showTotalDistance
    />
  );
};
