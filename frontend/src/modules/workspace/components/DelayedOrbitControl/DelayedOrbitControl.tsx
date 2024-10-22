import {
  EventManager,
  ReactThreeFiber,
  useFrame,
  useThree,
} from "@react-three/fiber";
import * as React from "react";
import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import {
  Vector3,
  type Camera,
  type Event,
  type OrthographicCamera,
  type PerspectiveCamera,
} from "three";
import { DelayedOrbitControlsImpl } from "./DelayedOrbitControlsImpl";

type ForwardRefComponent<P, T> = ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
>;

export type OrbitControlsChangeEvent = Event & {
  target: EventTarget & { object: Camera };
};

export type OrbitControlsProps = Omit<
  ReactThreeFiber.Overwrite<
    ReactThreeFiber.Object3DNode<
      DelayedOrbitControlsImpl,
      typeof DelayedOrbitControlsImpl
    >,
    {
      camera?: Camera;
      domElement?: HTMLElement;
      enableDamping?: boolean;
      makeDefault?: boolean;
      onChange?: (e?: OrbitControlsChangeEvent) => void;
      onEnd?: (
        e: Event,
        cameraData: {
          position: [number, number, number];
          target: [number, number, number];
        }
      ) => void;
      onStart?: (e?: Event) => void;
      regress?: boolean;
      target?: ReactThreeFiber.Vector3;
      keyEvents?: boolean | HTMLElement;
    }
  >,
  "ref"
>;

export const DelayedOrbitControls: ForwardRefComponent<
  OrbitControlsProps,
  DelayedOrbitControlsImpl
> = /* @__PURE__ */ React.forwardRef<
  DelayedOrbitControlsImpl,
  OrbitControlsProps
>(
  (
    {
      makeDefault,
      camera,
      regress,
      domElement,
      enableDamping = true,
      keyEvents = false,
      onChange,
      onStart,
      onEnd,
      target,
      ...restProps
    },
    ref
  ) => {
    const invalidate = useThree((state) => state.invalidate);
    const defaultCamera = useThree((state) => state.camera);
    const gl = useThree((state) => state.gl);
    const events = useThree(
      (state) => state.events
    ) as EventManager<HTMLElement>;
    const setEvents = useThree((state) => state.setEvents);
    const set = useThree((state) => state.set);
    const get = useThree((state) => state.get);
    const performance = useThree((state) => state.performance);
    const explCamera = (camera || defaultCamera) as
      | OrthographicCamera
      | PerspectiveCamera;
    const explDomElement = (domElement ||
      events.connected ||
      gl.domElement) as HTMLElement;
    const controls = React.useMemo(
      () =>
        new DelayedOrbitControlsImpl(explCamera, target as Vector3 | undefined),
      [explCamera]
    );

    useFrame(() => {
      if (controls.enabled) controls.update();
    }, -1);

    React.useEffect(() => {
      if (keyEvents) {
        controls.connect(keyEvents === true ? explDomElement : keyEvents);
      }

      controls.connect(explDomElement);
      return () => void controls.dispose();
    }, [keyEvents, explDomElement, regress, controls, invalidate]);

    React.useEffect(() => {
      const callback = (e: OrbitControlsChangeEvent) => {
        invalidate();
        if (regress) performance.regress();
        if (onChange) onChange(e);
      };

      const onStartCb = (e: Event) => {
        if (onStart) onStart(e);
      };

      const onEndCb = (e: Event) => {
        const { position } = explCamera;
        const { target } = controls;
        if (onEnd)
          onEnd(e, {
            position: [position.x, position.y, position.z],
            target: [target.x, target.y, target.z],
          });
      };

      controls.addEventListener("change", callback);
      controls.addEventListener("start", onStartCb);
      controls.addEventListener("end", onEndCb);

      return () => {
        controls.removeEventListener("start", onStartCb);
        controls.removeEventListener("end", onEndCb);
        controls.removeEventListener("change", callback);
      };
    }, [onChange, onStart, onEnd, controls, invalidate, setEvents, explCamera]);

    React.useEffect(() => {
      if (makeDefault) {
        const old = get().controls;
        set({ controls });
        return () => set({ controls: old });
      }
    }, [makeDefault, controls]);

    return (
      <primitive
        ref={ref}
        object={controls}
        enableDamping={enableDamping}
        {...restProps}
      />
    );
  }
);
