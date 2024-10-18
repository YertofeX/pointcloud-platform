import { useEffect, useState } from "react";
import { Box3, Vector3 } from "three";
import { RootState, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { usePointCloudsContext } from "@modules/workspace/contexts/PointCloudsContext";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import { useToolContext } from "@modules/workspace/contexts/ToolContext";
import { CustomPointCloudOctreePicker } from "@modules/workspace/utils/picker/CustomPointCloudOctreePicker";
import { getBounds } from "@modules/workspace/utils/getBounds";
import { PolyLineComponent } from "../PolyLine";
import { calculateCenter } from "@modules/workspace/utils/calculateCenter";
import { calculateArea } from "@modules/workspace/utils/calculateArea";
import { Paper, Typography } from "@mui/material";

export type PermArea = {
  id: number;
  points: Vector3[];
  color: string;
  name: string;
  width: number;
  visible: boolean;
  bounds: Box3;
};

type Props = {
  area: PermArea;
};

const picker = new CustomPointCloudOctreePicker();

export const PermAreaComponent = ({ area }: Props) => {
  const { visiblePcos } = usePointCloudsContext();

  const { setPermAreas, highlighted, highlightedType, setEditing } =
    usePermObjectContext();

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
    setPermAreas((permareas) =>
      permareas.map((cArea) => {
        if (cArea.id !== area.id) {
          return cArea;
        }
        return {
          ...cArea,
          bounds: getBounds(points),
          points,
        };
      })
    );
  };

  const loopAreaPoints = [...points, points[0]];

  return (
    <>
      <PolyLineComponent
        visible={!cull && area.visible}
        onGrab={
          toolState.name == "area-measure" && toolState.measuring
            ? onGrab
            : undefined
        }
        onGrabStart={() => setEditing(true)}
        onGrabEnd={handleGrabEnd}
        line={{
          points: loopAreaPoints,
          width: highlighted === area.id && highlightedType == "area" ? 6 : 3,
          color: area.color,
        }}
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
        <Paper sx={{ px: 1 }}>
          <Typography>
            {Math.round(calculateArea(loopAreaPoints) * 100) / 100}&nbsp;m
            <sup>2</sup>
          </Typography>
        </Paper>
      </Html>
    </>
  );
};
