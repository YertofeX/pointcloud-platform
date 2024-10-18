import { Bounds, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControlsContext } from "../contexts/ControlsContext";
import { BoundsSetter } from "./BoundsSetter";
import { Lights } from "./Lights";
import { PotreeScene } from "./PotreeScene";
import { PermObjects } from "./objects/PermObjects";
import { ToolHandler } from "./ToolHandler";
import { DelayedOrbitControls } from "./DelayedOrbitControl/DelayedOrbitControl";

export const ViewerCanvas = () => {
  const { enabled, setMoving } = useControlsContext();

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
        position: [2, 2, 2],
      }}
    >
      <Lights />

      <DelayedOrbitControls
        minDistance={0.0001}
        makeDefault
        dampingFactor={0.4}
        enableDamping
        enabled={enabled}
        onStart={() => setMoving(true)}
        onEnd={() => setMoving(false)}
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
