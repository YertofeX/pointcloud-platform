import { Html, Sphere } from "@react-three/drei";
import { Mesh, Vector3 } from "three";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  MeshProps,
  RenderCallback,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useControlsContext } from "@modules/workspace/contexts/ControlsContext";
import { useCanvasEvent } from "@modules/workspace/utils/useCanvasEvent";
import {
  calculateLength,
  formatLength,
} from "@modules/workspace/utils/calculateLength";
import { calculateCenter } from "@modules/workspace/utils/calculateCenter";
import { Paper, Typography } from "@mui/material";
import { OccludedLine } from "./OccludedLine";
import { KeepSize } from "./helpers/KeepSize";
import { hexToRGBA } from "@modules/workspace/utils/hexToRGBA";
import { getTextColor } from "@modules/workspace/utils/getTextColor";
import { hexToRGBObject } from "@modules/workspace/utils/hexToRGB";

export type PolyLine = {
  points: Vector3[];
  width: number;
  color: string;
};

type OnGrabParams = [pointIndex: number, ...props: Parameters<RenderCallback>];

type Props = MeshProps & {
  line: PolyLine;
  hasCursor?: boolean;
  cursorIndex?: number;
  showTotalDistance?: boolean;
  firstClick?: () => void;
  onGrab?: (...props: OnGrabParams) => void;
  onGrabStart?: () => void;
  onGrabEnd?: () => void;
};

const intervals = <T,>(arr: T[]): [T, T][] => {
  return arr.slice(1).map((val, index) => {
    return [arr[index], val];
  });
};

export const PolyLineComponent = forwardRef(
  (
    {
      line,
      onGrab,
      onGrabEnd,
      onGrabStart,
      hasCursor,
      cursorIndex,
      visible,
      showTotalDistance,
      firstClick,
      ...props
    }: Props,
    fref
  ) => {
    visible = visible === undefined || visible;
    const ref = useRef<Mesh>(null!);
    useImperativeHandle(fref, () => ref.current);

    const [grabbedIndex, setGrabbedIndex] = useState<null | number>(null);

    const { setEnabled: setControlsEnabled } = useControlsContext();

    const { gl } = useThree();

    useFrame((...props) => {
      if (onGrab !== undefined && grabbedIndex !== null) {
        onGrab(grabbedIndex, ...props);
      }
    });

    useCanvasEvent(
      "pointerup",
      useCallback(() => {
        if (onGrab === undefined) {
          return;
        }
        if (grabbedIndex === null) {
          return;
        }
        onGrabEnd?.();
        setGrabbedIndex(null);
        gl.domElement.style.cursor = "";
        setControlsEnabled(true);
      }, [grabbedIndex, onGrab])
    );

    cursorIndex =
      (((cursorIndex ?? -1) % line.points.length) + line.points.length) %
      line.points.length;

    const colorRGB = hexToRGBObject(line.color);

    return (
      <mesh ref={ref} visible={visible} {...props}>
        {/* Line display */}
        {line.points.length > 0 && (
          <OccludedLine
            points={line.points}
            lineWidth={line.width}
            color={line.color}
            renderOrder={1}
            depthTest={false}
          />
        )}
        {/* Control spheres */}
        {line.points.map((point, index) => (
          <KeepSize position={point} key={`${index}`}>
            <Sphere
              scale={0.01}
              renderOrder={2}
              onPointerEnter={() => {
                if (grabbedIndex === null && onGrab !== undefined) {
                  gl.domElement.style.cursor = "grab";
                }
                if (firstClick !== undefined && index == 0) {
                  gl.domElement.style.cursor = "pointer";
                }
              }}
              onPointerLeave={() => {
                if (
                  (firstClick !== undefined && index == 0) ||
                  (grabbedIndex === null && onGrab !== undefined)
                ) {
                  gl.domElement.style.cursor = "";
                }
              }}
              onPointerDown={(ev) => {
                if (firstClick !== undefined && index == 0) {
                  ev.stopPropagation();
                  firstClick();
                }
                if (onGrab !== undefined) {
                  ev.stopPropagation();
                  setGrabbedIndex(index);
                  setControlsEnabled(false);
                  onGrabStart?.();
                }
              }}
            >
              <meshToonMaterial
                color={hasCursor && index === cursorIndex ? "#f00" : line.color}
                depthTest={false}
              />
            </Sphere>
          </KeepSize>
        ))}
        {/* Lengths */}
        {intervals(line.points)
          .filter((points) => calculateLength(points) >= 0.25)
          .map(([from, to], index) => {
            const length = calculateLength([from, to]);
            return (
              <Html
                key={`${index}`}
                position={calculateCenter(from, to)}
                style={{ display: visible ? "inherit" : "none" }}
                center
              >
                <Paper
                  sx={{
                    px: 1,
                    minWidth: "max-content",
                    userSelect: "none",
                    pointerEvents: "none",
                    backgroundColor: colorRGB
                      ? `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, 0.7)`
                      : line.color,
                  }}
                  elevation={0}
                >
                  <Typography
                    noWrap
                    color={getTextColor(hexToRGBA(line.color))}
                    fontSize={12}
                  >
                    {Math.round(length * 100) / 100} m
                  </Typography>
                </Paper>
              </Html>
            );
          })}
        {/* Total length */}
        <Html
          position={line.points[line.points.length - 1]}
          style={{
            display: visible && showTotalDistance ? "inherit" : "none",
            userSelect: "none",
            pointerEvents: "none",
          }}
          center
        >
          <Paper
            sx={{
              px: 1,
              transform: "translateY(-2rem)",
              backgroundColor: line.color,
            }}
          >
            <Typography noWrap color={getTextColor(hexToRGBA(line.color))}>
              {formatLength(calculateLength(line.points))}
            </Typography>
          </Paper>
        </Html>
      </mesh>
    );
  }
);
