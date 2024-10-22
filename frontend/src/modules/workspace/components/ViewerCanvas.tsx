import { Bounds, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControlsContext } from "../contexts/ControlsContext";
import { BoundsSetter } from "./BoundsSetter";
import { Lights } from "./Lights";
import { PotreeScene } from "./PotreeScene";
import { PermObjects } from "./objects/PermObjects";
import { ToolHandler } from "./ToolHandler";
import { DelayedOrbitControls } from "./DelayedOrbitControl/DelayedOrbitControl";
import { useLocalStorage } from "@mantine/hooks";
import { Vector3 } from "three";
import { useWorkspaceContext } from "./WorkspaceContext/WorkspaceContext";

export const ViewerCanvas = () => {
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

  return (
    <Canvas
      style={{
        height: "100vh",
        width: "100vw",
      }}
      camera={{
        fov: 60,
        up: [0, 0, 1],
        far: 9999,
        position: initialCamera.position,
      }}
    >
      <Lights />

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
        onStart={() => setMoving(true)}
        onEnd={(_, { position, target }) => {
          setInitialCamera({
            position,
            target,
          });
          setMoving(false);
        }}
      />

      <GizmoHelper alignment="top-right" margin={[100, 100]}>
        <GizmoViewport labelColor="white" axisHeadScale={1} />
      </GizmoHelper>

      <Bounds observe margin={1}>
        <BoundsSetter>
          <ToolHandler />
          <PotreeScene />
          <PermObjects />
        </BoundsSetter>
      </Bounds>
    </Canvas>
  );
};
