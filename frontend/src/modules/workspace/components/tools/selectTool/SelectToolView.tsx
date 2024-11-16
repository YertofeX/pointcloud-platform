import { usePointCloudsContext } from "@modules/workspace/contexts/PointCloudsContext";
import { CustomPointCloudOctreePicker } from "@modules/workspace/utils/picker/CustomPointCloudOctreePicker";
import { useCanvasEvent } from "@modules/workspace/utils/useCanvasEvent";
import { Sphere, useBounds } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

export const SelectToolView = () => {
  return <SelectToZoom />;
};

const SelectToZoom = () => {
  const api = useBounds();

  const { pointCloudsRef, visiblePcos } = usePointCloudsContext();

  const spaceCursorRef = useRef<Mesh>(null);

  const minCursorRadius = 3;

  const { camera, raycaster, pointer, gl } = useThree();

  useCanvasEvent("dblclick", (event) => {
    if (pointCloudsRef.current) {
      raycaster.setFromCamera(pointer, camera);
      const picker = new CustomPointCloudOctreePicker();
      const intersection = picker.pick(gl, camera, raycaster.ray, visiblePcos);
      if (intersection && intersection.position) {
        const point = intersection.position;
        if (spaceCursorRef.current && point) {
          const cameraDistance = camera.position.distanceTo(point);
          let cursorScale = cameraDistance * 0.1; //
          if (cursorScale < minCursorRadius) {
            cursorScale = minCursorRadius;
          }
          if (cursorScale > cameraDistance / 2) {
            cursorScale = cameraDistance / 2;
          }
          spaceCursorRef.current.scale.set(
            cursorScale,
            cursorScale,
            cursorScale
          );
          spaceCursorRef.current.position.set(point.x, point.y, point.z);
          api.refresh(spaceCursorRef.current);
          api.fit();
          event.stopPropagation();
        }
      }
    }
  });

  return <Sphere ref={spaceCursorRef} scale={0} visible={false} />;
};
