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

export const HeightMeasureToolView = () => {
  const { toolState, setToolState } = useToolContext();

  const { commitObject, editing: permObjectEditing } = usePermObjectContext();

  const { visiblePcos } = usePointCloudsContext();

  const { moving } = useControlsContext();

  const [cursorPos, setCursorPos] = useState<Vector3 | null>(null);

  if (toolState.name !== "height-measure") {
    return null;
  }

  const { pointsStack, stackIndex } = toolState;

  const addLinePoint = (p: Vector3) => {
    setToolState(
      produce((draft) => {
        if (draft.name !== "height-measure") return;
        // There are no points in the points stack
        if (draft.stackIndex < 0) {
          draft.pointsStack = [[p]];
          draft.stackIndex += 1;
        } else {
          draft.pointsStack = draft.pointsStack.slice(0, draft.stackIndex + 1);
          const nextPoints = produce(
            draft.pointsStack[stackIndex],
            (points) => {
              points.push(p);
            }
          );
          draft.pointsStack.push(nextPoints);
          draft.stackIndex += 1;
        }
      })
    );
  };

  const undo = () => {
    setToolState(
      produce((draft) => {
        if (draft.name !== "height-measure") return;
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
          // Commit measurement if the point placed is the second point
          if (
            stackIndex >= 0 &&
            pointsStack[stackIndex].length === 1 &&
            cursorPos !== null
          ) {
            const commitedPoints = [...pointsStack[stackIndex]];
            commitedPoints.push(cursorPos);
            commitObject("height-measure", commitedPoints);
          } else if (stackIndex < 0 || pointsStack[stackIndex].length < 1) {
            addLinePoint(cursorPos);
          }
        } else if (event.button === 2) {
          // Right click
          event.preventDefault();
          undo();
        }
      },
      [cursorPos, pointsStack, stackIndex, permObjectEditing]
    )
  );

  const pointsFromStack = stackIndex < 0 ? [] : pointsStack[stackIndex];
  const points =
    cursorPos !== null ? [...pointsFromStack, cursorPos] : pointsFromStack;

  // first vec3 is the lower point
  const orderedPoints = points.toSorted((a, b) => a.z - b.z);

  return (
    <mesh>
      {!permObjectEditing && (
        <PolyLineComponent
          line={{
            color: "#fff",
            points,
            width: 3,
          }}
          hasCursor={cursorPos !== null}
          opacity={0.7}
          disableSegmentDistanceLabels
          disableTotalDistanceLabel
        />
      )}
      {orderedPoints.length === 2 && (
        <PolyLineComponent
          line={{
            points: [
              new Vector3(
                orderedPoints[1].x,
                orderedPoints[1].y,
                orderedPoints[0].z
              ),
              orderedPoints[1],
            ],
            width: 3,
            color: "#ff0",
          }}
          disableTotalDistanceLabel
        />
      )}
    </mesh>
  );
};
