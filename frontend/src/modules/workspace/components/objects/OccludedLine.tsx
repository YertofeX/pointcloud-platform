import { Line, useDepthBuffer } from "@react-three/drei";
import { Mesh, Vector2 } from "three";
import { useShader, glsl } from "./shaderHooks";
import { useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";

type Props = Omit<React.ComponentPropsWithRef<typeof Line>, "forceSinglePass">;

export const OccludedLine = forwardRef(({ ...props }: Props, fref) => {
  const ref = useRef<Mesh>(null!);
  useImperativeHandle(fref, () => ref.current);

  const depth = useDepthBuffer();
  const { gl, camera } = useThree();
  const { uniforms, onBeforeCompile } = useShader({
    uniforms: {
      texDepth: {
        value: depth,
      },
      cameraFar: {
        value: camera.far,
      },
      cameraNear: {
        value: camera.near,
      },
      resolution: {
        value: gl.getSize(new Vector2()),
      },
    },
    vertex: {
      head: "",
      main: "",
    },
    fragment: {
      head: glsl`
          uniform vec2 resolution;
          uniform sampler2D texDepth;
          uniform float cameraFar;
          uniform float cameraNear;
          `,
      main: glsl`
          vec2 coords = gl_FragCoord.xy / resolution;
          float sceneDepth = texture2D(texDepth, coords).r;
          float cameraRange = (cameraFar - cameraNear);
          float currentDepth = gl_FragCoord.z;
          if((currentDepth-sceneDepth)*cameraRange>0.1){
            if(sin(vUv.y*50.0)<0.0){
                discard;
            }
          }
          `,
    },
  });

  useFrame(() => {
    uniforms.texDepth.needsUpdate = true;
  });

  return (
    <mesh ref={ref}>
      <Line
        {...props}
        forceSinglePass={false}
        depthTest={false}
        renderOrder={1}
        lineWidth={3}
        onBeforeCompile={onBeforeCompile}
      ></Line>
    </mesh>
  );
});
