import { useCallback, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { AreaMeasureToolState } from "./AreaMeasureToolState";
import { Html } from "@react-three/drei";
import { useToolContext } from "@modules/workspace/contexts/ToolContext";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import { usePointCloudsContext } from "@modules/workspace/contexts/PointCloudsContext";
import { useControlsContext } from "@modules/workspace/contexts/ControlsContext";
import { useTooltipContext } from "@modules/workspace/contexts/TooltipContext";
import { CustomPointCloudOctreePicker } from "@modules/workspace/utils/picker/CustomPointCloudOctreePicker";
import { useCanvasEvent } from "@modules/workspace/utils/useCanvasEvent";
import { calculateArea } from "@modules/workspace/utils/calculateArea";
import { calculateCenter } from "@modules/workspace/utils/calculateCenter";
import { PolyLineComponent } from "../../objects/PolyLine";
import { Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

const picker = new CustomPointCloudOctreePicker();

export const AreaMeasureToolView = () => {
  const { t } = useTranslation();

  const { toolState, setToolState } = useToolContext();

  const { commitArea, editing: permObjectEditing } = usePermObjectContext();

  const { visiblePcos } = usePointCloudsContext();

  const { moving } = useControlsContext();

  const { setTooltip } = useTooltipContext();

  const [cursorPos, setCursorPos] = useState<Vector3 | null>(null);

  const endLineRef = useRef(false);

  if (toolState.name !== "area-measure") {
    return null;
  }

  useEffect(() => {
    if (toolState.measuring) {
      if (toolState.areaPoints.length > 0) {
        setTooltip(t("project.tools.measuring-tooltip"));
      } else {
        setTooltip(t("project.tools.start-measure-tooltip"));
      }
    } else {
      setTooltip(null);
    }
    return () => {
      setTooltip(null);
    };
  }, [toolState.areaPoints, toolState.measuring]);

  const { areaPoints } = toolState;

  const addAreaPoint = (p: Vector3) => {
    setToolState((state) =>
      state.name !== "area-measure"
        ? state
        : ({
            ...state,
            areaPoints: [...state.areaPoints, p],
          } as AreaMeasureToolState)
    );
  };

  const clearAreaPoints = () => {
    setToolState((state) =>
      state.name !== "area-measure"
        ? state
        : ({
            ...state,
            areaPoints: [],
          } as AreaMeasureToolState)
    );
  };

  useFrame(({ raycaster, pointer, camera, gl }) => {
    if (!toolState.measuring) {
      return;
    }
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
        //TODO: make this prettier
        if (endLineRef.current) {
          endLineRef.current = false;
          return;
        }
        if (!toolState.measuring) {
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
          clearAreaPoints();
        }
      },
      [cursorPos, toolState.measuring, areaPoints, permObjectEditing]
    )
  );

  useCanvasEvent(
    "dblclick",
    useCallback(
      (ev) => {
        if (!toolState.measuring) {
          return;
        }
        if (moving) {
          return;
        }
        const commitedPoints = [...areaPoints];
        if (cursorPos !== null) {
          commitedPoints.pop();
          commitedPoints.push(cursorPos);
        }
        if (commitedPoints.length >= 3) {
          ev.stopPropagation();
          commitArea(commitedPoints);
          clearAreaPoints();
        } else {
          //TODO: Alert
        }
      },
      [areaPoints, toolState.measuring]
    )
  );

  const cursorAreaPoints = [...areaPoints];
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
      {toolState.measuring && !permObjectEditing && (
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
              {Math.round(area * 100) / 100}&nbsp;m<sup>2</sup>
            </Paper>
          </Html>
          <PolyLineComponent
            line={{
              color: "#ff0",
              points: loopAreaPoints,
              width: 3,
            }}
            firstClick={
              areaPoints.length >= 2
                ? () => {
                    endLineRef.current = true;
                    commitArea(areaPoints);
                    clearAreaPoints();
                  }
                : undefined
            }
            hasCursor={cursorPos !== null}
            cursorIndex={cursorIndex}
          />
        </>
      )}
    </mesh>
  );
};
