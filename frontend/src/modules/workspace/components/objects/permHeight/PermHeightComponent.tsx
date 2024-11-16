import { useEffect, useState } from "react";
import { Box3, Vector3 } from "three";
import { RootState, useThree } from "@react-three/fiber";
import { usePointCloudsContext } from "@modules/workspace/contexts/PointCloudsContext";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import { useToolContext } from "@modules/workspace/contexts/ToolContext";
import { CustomPointCloudOctreePicker } from "@modules/workspace/utils/picker/CustomPointCloudOctreePicker";
import { PolyLineComponent } from "../PolyLine";
import { useOriginContext } from "@modules/workspace/contexts/OriginContext";

export type PermHeight = {
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
  line: PermHeight;
};

const picker = new CustomPointCloudOctreePicker();

export const PermHeightComponent = ({ line }: Props) => {
  const { visiblePcos } = usePointCloudsContext();

  const { transform } = useOriginContext();

  const { updateObject, highlighted, setEditing } = usePermObjectContext();

  const { toolState } = useToolContext();

  const { camera } = useThree();

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
    const reverseTransform = transform.clone().multiplyScalar(-1);
    updateObject({
      tool: "height",
      data: {
        id: line.id,
        line: points
          .map((point) => point.clone().add(reverseTransform))
          .map(({ x, y, z }) => [x, y, z]),
      },
    });
  };

  // first vec3 is the lower point
  const orderedPoints = points.toSorted((a, b) => a.z - b.z);

  return (
    <>
      <PolyLineComponent
        visible={!cull}
        onGrab={toolState.name == "height-measure" ? onGrab : undefined}
        onGrabStart={() => setEditing(true)}
        onGrabEnd={handleGrabEnd}
        line={{
          points,
          width:
            highlighted?.objectId === line.id &&
            highlighted?.objectType == "height"
              ? 6
              : 3,
          color: "#fff",
        }}
        opacity={0.7}
        disableTotalDistanceLabel
        disableSegmentDistanceLabels
      />
      <PolyLineComponent
        line={{
          points: [
            new Vector3(
              orderedPoints[1].x,
              orderedPoints[1].y,
              orderedPoints[0].z
            ),
            orderedPoints[1],
          ],
          width:
            highlighted?.objectId === line.id &&
            highlighted?.objectType == "height"
              ? 6
              : 3,
          color: line.color,
        }}
        disableTotalDistanceLabel
      />
    </>
  );
};
