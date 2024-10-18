import { useCallback, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { CustomPointCloudOctreePicker } from "@modules/workspace/utils/picker/CustomPointCloudOctreePicker";
import { useToolContext } from "@modules/workspace/contexts/ToolContext";
import { usePointCloudsContext } from "@modules/workspace/contexts/PointCloudsContext";
import { useCanvasEvent } from "@modules/workspace/utils/useCanvasEvent";
import { useControlsContext } from "@modules/workspace/contexts/ControlsContext";
import { PolyLineComponent } from "../../objects/PolyLine";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import { produce } from "immer";

const picker = new CustomPointCloudOctreePicker();

export const DistanceMeasureToolView = () => {
  const { toolState, setToolState } = useToolContext();

  const { commitObject, editing: permObjectEditing } = usePermObjectContext();

  const { visiblePcos } = usePointCloudsContext();

  const { moving } = useControlsContext();

  const [cursorPos, setCursorPos] = useState<Vector3 | null>(null);

  if (toolState.name !== "distance-measure") {
    return null;
  }

  const { pointsStack, stackIndex } = toolState;

  const addLinePoint = (p: Vector3) => {
    setToolState(
      produce((draft) => {
        if (draft.name !== "distance-measure") return;
        // There are no points in the points stack
        if (draft.stackIndex < 0) {
          draft.pointsStack = [[p]];
          draft.stackIndex += 1;
        } else {
          console.log("uu", { pointsStack: draft.pointsStack });
          draft.pointsStack = draft.pointsStack.slice(0, draft.stackIndex + 1);
          const nextPoints = produce(
            draft.pointsStack[stackIndex],
            (points) => {
              points.push(p);
            }
          );
          console.log({ nextPoints });
          draft.pointsStack.push(nextPoints);
          draft.stackIndex += 1;
        }
      })
    );
  };

  const undo = () => {
    setToolState(
      produce((draft) => {
        if (draft.name !== "distance-measure") return;
        if (draft.stackIndex < 0) return;
        draft.stackIndex -= 1;
      })
    );
  };

  useFrame(({ raycaster, pointer, camera, gl }) => {
    raycaster.setFromCamera(pointer, camera);
    const intersection = picker.pick(gl, camera, raycaster.ray, visiblePcos);
    if (intersection && intersection.position) {
      setCursorPos(intersection.position);
    }
  });

  useCanvasEvent(
    "pointerup",
    useCallback(
      (event) => {
        if (moving) {
          return;
        }
        if (permObjectEditing) {
          return;
        }
        if (event.button === 0) {
          // Left click
          if (cursorPos === null) {
            return;
          }
          addLinePoint(cursorPos);
        } else if (event.button === 2) {
          // Right click
          event.preventDefault();
          undo();
        }
      },
      [cursorPos, pointsStack, permObjectEditing]
    )
  );

  useCanvasEvent(
    "dblclick",
    useCallback(
      (event) => {
        if (moving) {
          return;
        }
        const commitedPoints = [...pointsStack[stackIndex]];
        if (cursorPos !== null) {
          commitedPoints.pop();
          commitedPoints.push(cursorPos);
        }
        if (commitedPoints.length >= 2) {
          event.stopPropagation();
          commitObject("distance-measure", commitedPoints);
        }
      },
      [pointsStack, stackIndex]
    )
  );

  const points = stackIndex < 0 ? [] : pointsStack[stackIndex];

  return (
    <mesh>
      {!permObjectEditing && (
        <PolyLineComponent
          line={{
            color: "#ff0",
            points: cursorPos !== null ? [...points, cursorPos] : points,
            width: 3,
          }}
          hasCursor={cursorPos !== null}
          showTotalDistance
        />
      )}
    </mesh>
  );
};
