import { useEffect, useState } from "react";
import { Box3, Vector3 } from "three";
import { RootState, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { usePointCloudsContext } from "@modules/workspace/contexts/PointCloudsContext";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import { useToolContext } from "@modules/workspace/contexts/ToolContext";
import { CustomPointCloudOctreePicker } from "@modules/workspace/utils/picker/CustomPointCloudOctreePicker";
import { PolyLineComponent } from "../PolyLine";
import { calculateCenter } from "@modules/workspace/utils/calculateCenter";
import { calculateArea } from "@modules/workspace/utils/calculateArea";
import { Paper, Typography } from "@mui/material";
import { getTextColor } from "@modules/workspace/utils/getTextColor";
import { hexToRGBA } from "@modules/workspace/utils/hexToRGBA";
import { useOriginContext } from "@modules/workspace/contexts/OriginContext";
import { useLocalization } from "@components/LocalizationManager";

export type PermArea = {
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
  area: PermArea;
};

const picker = new CustomPointCloudOctreePicker();

export const PermAreaComponent = ({ area }: Props) => {
  const { visiblePcos } = usePointCloudsContext();

  const { transform } = useOriginContext();

  const { numberFormatter } = useLocalization();

  const { updateObject, highlighted, setEditing } = usePermObjectContext();

  const { toolState } = useToolContext();

  const { camera } = useThree();

  const [points, setPoints] = useState<Vector3[]>(area.points);

  useEffect(() => {
    setPoints(area.points);
  }, area.points);

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

  const cull = area.bounds.distanceToPoint(camera.position) >= 5000;

  const handleGrabEnd = () => {
    setEditing(false);
    const reverseTransform = transform.clone().multiplyScalar(-1);
    updateObject({
      tool: "area",
      data: {
        id: area.id,
        line: points
          .map((point) => point.clone().add(reverseTransform))
          .map(({ x, y, z }) => [x, y, z]),
      },
    });
  };

  const loopAreaPoints = [...points, points[0]];

  return (
    <>
      <PolyLineComponent
        visible={!cull}
        onGrab={toolState.name == "area-measure" ? onGrab : undefined}
        onGrabStart={() => setEditing(true)}
        onGrabEnd={handleGrabEnd}
        line={{
          points: loopAreaPoints,
          width:
            highlighted?.objectId === area.id &&
            highlighted?.objectType == "area"
              ? 6
              : 3,
          color: area.color,
        }}
        disableTotalDistanceLabel
      />
      <Html
        position={calculateCenter(...points)}
        style={{
          display: cull ? "none" : "inherit",
          userSelect: "none",
          pointerEvents: "none",
        }}
        center
      >
        <Paper
          sx={{
            px: 1,
            backgroundColor: area.color,
          }}
        >
          <Typography color={getTextColor(hexToRGBA(area.color))}>
            {numberFormatter.format(
              Math.round(calculateArea(loopAreaPoints) * 100) / 100
            )}
            &nbsp;m
            <sup>2</sup>
          </Typography>
        </Paper>
      </Html>
    </>
  );
};
