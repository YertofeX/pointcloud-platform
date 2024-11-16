import { useLocalStorage } from "@mantine/hooks";
import {
  GizmoHelper,
  GizmoViewport,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useState } from "react";
import { Vector3 } from "three";
import { useControlsContext } from "../contexts/ControlsContext";
import { toVec3 } from "../utils/toVec3";
import { DelayedOrbitControls } from "./DelayedOrbitControl/DelayedOrbitControl";
import { useWorkspaceContext } from "./WorkspaceContext/WorkspaceContext";

export const CameraHandler = () => {
  const { project } = useWorkspaceContext();

  const { enabled, setMoving } = useControlsContext();

  const [initialCamera, setInitialCamera] = useLocalStorage<{
    position: [number, number, number];
    target: [number, number, number];
  }>({
    key: `viewer-camera-${project.id}`,
    defaultValue: {
      position: [2, 2, 2],
      target: [0, 0, 0],
    },
  });

  const [isSideView, setIsSideView] = useState<boolean>(false);

  const { camera } = useThree();

  const checkSideView = () => {
    if (!isSideView) return;
    const tolerance = 0.00001;
    const cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);
    const { x, y, z } = cameraDirection;

    if (
      Math.abs(x) < tolerance ||
      Math.abs(y) < tolerance ||
      Math.abs(z) < tolerance
    )
      return;

    setIsSideView(false);
  };

  return (
    <>
      {isSideView ? (
        <OrthographicCamera
          far={9999}
          up={[0, 0, 1]}
          position={initialCamera.position}
          zoom={10}
          makeDefault
        />
      ) : (
        <PerspectiveCamera
          fov={60}
          up={[0, 0, 1]}
          far={9999}
          position={initialCamera.position}
          makeDefault
        />
      )}

      <DelayedOrbitControls
        minDistance={0.0001}
        makeDefault
        dampingFactor={0.4}
        enableDamping
        enabled={enabled}
        target={
          new Vector3(
            initialCamera.target[0],
            initialCamera.target[1],
            initialCamera.target[2]
          )
        }
        onStart={() => {
          checkSideView();
          setMoving(true);
        }}
        onEnd={(_, { position, target }) => {
          setInitialCamera({
            position,
            target,
          });
          setMoving(false);
        }}
      />

      <GizmoHelper
        alignment="top-right"
        margin={[100, 100]}
        onTarget={() => {
          setIsSideView(true);
          return toVec3(initialCamera.target);
        }}
      >
        <GizmoViewport labelColor="white" axisHeadScale={1} />
      </GizmoHelper>
    </>
  );
};
