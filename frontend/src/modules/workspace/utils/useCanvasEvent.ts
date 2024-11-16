import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export const useCanvasEvent = <K extends keyof HTMLElementEventMap>(
  event: K,
  callback: (ev: HTMLElementEventMap[K]) => any
) => {
  const { gl } = useThree();
  useEffect(() => {
    gl.domElement.addEventListener(event, callback);
    return () => {
      gl.domElement.removeEventListener(event, callback);
    };
  }, [gl, callback]);
};
