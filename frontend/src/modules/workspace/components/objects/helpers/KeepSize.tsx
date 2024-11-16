import { useFrame } from "@react-three/fiber";
import {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from "react";
import { Mesh, Vector3 } from "three";

type Props = {
  position: Vector3;
};

export const KeepSize = forwardRef(
  (
    { children, position }: PropsWithChildren<Props>,
    fref: React.ForwardedRef<Mesh>
  ) => {
    const ref = useRef<Mesh>(null!);
    useImperativeHandle(fref, () => ref.current);

    useFrame(({ camera }) => {
      const p = position.clone().applyMatrix4(camera.matrix.clone().invert());
      const s = -p.z;
      ref.current.scale.set(s, s, s);
    });

    return (
      <mesh position={position} ref={ref}>
        {children}
      </mesh>
    );
  }
);
