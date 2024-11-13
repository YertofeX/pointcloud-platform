import { useCallback, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { Html } from "@react-three/drei";
import { useToolContext } from "@modules/workspace/contexts/ToolContext";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import { usePointCloudsContext } from "@modules/workspace/contexts/PointCloudsContext";
import { useControlsContext } from "@modules/workspace/contexts/ControlsContext";
import { CustomPointCloudOctreePicker } from "@modules/workspace/utils/picker/CustomPointCloudOctreePicker";
import { useCanvasEvent } from "@modules/workspace/utils/useCanvasEvent";
import { calculateArea } from "@modules/workspace/utils/calculateArea";
import { calculateCenter } from "@modules/workspace/utils/calculateCenter";
import { PolyLineComponent } from "../../objects/PolyLine";
import { Paper } from "@mui/material";
import { produce } from "immer";
import { useLocalization } from "@components/LocalizationManager";

const picker = new CustomPointCloudOctreePicker();

export const AreaMeasureToolView = () => {
  const { numberFormatter } = useLocalization();

  const { toolState, setToolState } = useToolContext();

  const { commitObject, editing: permObjectEditing } = usePermObjectContext();

  const { visiblePcos } = usePointCloudsContext();

  const { moving } = useControlsContext();

  const [cursorPos, setCursorPos] = useState<Vector3 | null>(null);

  const endLineRef = useRef(false);

  if (toolState.name !== "area-measure") {
    return null;
  }

  const { pointsStack, stackIndex } = toolState;

  const addAreaPoint = (p: Vector3) => {
    setToolState(
      produce((draft) => {
        if (draft.name !== "area-measure") return;
        // There are no points in the points stack
        if (draft.stackIndex < 0) {
          draft.pointsStack = [[p]];
          draft.stackIndex += 1;
        } else {
          draft.pointsStack = draft.pointsStack.slice(0, draft.stackIndex + 1);
          draft.pointsStack.push(
            produce(draft.pointsStack[stackIndex], (points) => {
              points.push(p);
            })
          );
          draft.stackIndex += 1;
        }
      })
    );
  };

  const undo = () => {
    setToolState(
      produce((draft) => {
        if (draft.name !== "area-measure") return;
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
        if (endLineRef.current) {
          endLineRef.current = false;
          return;
        }
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
          addAreaPoint(cursorPos);
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
        if (commitedPoints.length >= 3) {
          event.stopPropagation();
          commitObject("area-measure", commitedPoints);
        } else {
          //TODO: Alert
        }
      },
      [pointsStack, stackIndex]
    )
  );

  const points = stackIndex < 0 ? [] : pointsStack[stackIndex];

  const cursorAreaPoints = [...points];
  let cursorIndex = -1;

  if (cursorPos !== null) {
    cursorAreaPoints.push(cursorPos);
  }

  const loopAreaPoints = [...cursorAreaPoints];

  if (loopAreaPoints.length >= 2) {
    loopAreaPoints.push(loopAreaPoints[0]);
    cursorIndex = -2;
  }

  const area = calculateArea(loopAreaPoints);
  const areaCenter = calculateCenter(...loopAreaPoints);
  if (
    Number.isNaN(areaCenter.x) ||
    Number.isNaN(areaCenter.y) ||
    Number.isNaN(areaCenter.z)
  ) {
    areaCenter.set(0, 0, 0);
  }

  return (
    <mesh>
      {!permObjectEditing && (
        <>
          <Html
            transform={false}
            position={areaCenter}
            center
            style={{ display: loopAreaPoints.length >= 4 ? "inherit" : "none" }}
          >
            <Paper
              sx={{
                userSelect: "none",
                pointerEvents: "none",
                px: 1,
              }}
            >
              {numberFormatter.format(Math.round(area * 100) / 100)}&nbsp;m
              <sup>2</sup>
            </Paper>
          </Html>
          <PolyLineComponent
            line={{
              color: "#ff0",
              points: loopAreaPoints,
              width: 3,
            }}
            firstClick={
              points.length >= 2
                ? () => {
                    endLineRef.current = true;
                    commitObject("area-measure", points);
                  }
                : undefined
            }
            hasCursor={cursorPos !== null}
            cursorIndex={cursorIndex}
            disableTotalDistanceLabel
          />
        </>
      )}
    </mesh>
  );
};
