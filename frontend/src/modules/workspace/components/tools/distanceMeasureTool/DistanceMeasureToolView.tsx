import { useCallback, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { DistanceMeasureToolState } from "./DistanceMeasureToolState";
import { CustomPointCloudOctreePicker } from "@modules/workspace/utils/picker/CustomPointCloudOctreePicker";
import { useToolContext } from "@modules/workspace/contexts/ToolContext";
import { usePointCloudsContext } from "@modules/workspace/contexts/PointCloudsContext";
import { useCanvasEvent } from "@modules/workspace/utils/useCanvasEvent";
import { useControlsContext } from "@modules/workspace/contexts/ControlsContext";
import { useTooltipContext } from "@modules/workspace/contexts/TooltipContext";
import { useTranslation } from "react-i18next";
import { PolyLineComponent } from "../../objects/PolyLine";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";

const picker = new CustomPointCloudOctreePicker();

export const DistanceMeasureToolView = () => {
  const { t } = useTranslation();

  const { toolState, setToolState } = useToolContext();

  const { commitLine, editing: permObjectEditing } = usePermObjectContext();

  const { visiblePcos } = usePointCloudsContext();

  const { moving } = useControlsContext();

  const { setTooltip } = useTooltipContext();

  const [cursorPos, setCursorPos] = useState<Vector3 | null>(null);

  if (toolState.name !== "distance-measure") {
    return null;
  }

  useEffect(() => {
    if (toolState.measuring) {
      if (toolState.linePoints.length > 0) {
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
  }, [toolState.linePoints, toolState.measuring]);

  const { linePoints } = toolState;

  const addLinePoint = (p: Vector3) => {
    setToolState((state) =>
      state.name !== "distance-measure"
        ? state
        : ({
            ...state,
            linePoints: [...state.linePoints, p],
          } as DistanceMeasureToolState)
    );
  };

  const clearLinePoints = () => {
    setToolState((state) =>
      state.name !== "distance-measure"
        ? state
        : ({
            ...state,
            linePoints: [],
          } as DistanceMeasureToolState)
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
          addLinePoint(cursorPos);
        } else if (event.button === 2) {
          // Right click
          event.preventDefault();
          if (linePoints.length >= 2) {
            commitLine(linePoints);
            clearLinePoints();
          } else {
            clearLinePoints();
          }
        }
      },
      [cursorPos, toolState.measuring, linePoints, permObjectEditing]
    )
  );

  useCanvasEvent(
    "dblclick",
    useCallback(
      (event) => {
        if (!toolState.measuring) {
          return;
        }
        if (moving) {
          return;
        }
        const commitedPoints = [...linePoints];
        if (cursorPos !== null) {
          commitedPoints.pop();
          commitedPoints.push(cursorPos);
        }
        if (commitedPoints.length >= 2) {
          event.stopPropagation();
          commitLine(commitedPoints);
          clearLinePoints();
        } else {
          //TODO: Alert
        }
      },
      [linePoints, toolState.measuring]
    )
  );

  return (
    <mesh>
      {toolState.measuring && !permObjectEditing && (
        <PolyLineComponent
          line={{
            color: "#ff0",
            points:
              cursorPos !== null ? [...linePoints, cursorPos] : linePoints,
            width: 3,
          }}
          hasCursor={cursorPos !== null}
          showTotalDistance
        />
      )}
    </mesh>
  );
};
