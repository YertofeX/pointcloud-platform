import { Bounds } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BoundsSetter } from "./BoundsSetter";
import { Lights } from "./Lights";
import { PotreeScene } from "./PotreeScene";
import { PermObjects } from "./objects/PermObjects";
import { ToolHandler } from "./ToolHandler";
import { CameraHandler } from "./CameraHandler";

export const ViewerCanvas = () => {
  return (
    <Canvas
      style={{
        height: "100vh",
        width: "100vw",
        zIndex: 0,
      }}
    >
      <Lights />

      <CameraHandler />

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
