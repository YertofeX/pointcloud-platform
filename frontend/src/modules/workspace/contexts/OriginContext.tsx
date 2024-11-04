import { useLocalStorage } from "@mantine/hooks";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Vector3 } from "three";
import { useWorkspaceContext } from "../components/WorkspaceContext/WorkspaceContext";

type OriginContextType = {
  transform: Vector3;
  setTransform: (newTransform: Vector3) => void;
};

const OriginContext = createContext<OriginContextType>({
  transform: new Vector3(),
  setTransform: () => {},
});

export const useOriginContext = () => useContext(OriginContext);

export const OriginProvider = ({ children }: PropsWithChildren) => {
  const {
    project: { id: projectID },
  } = useWorkspaceContext();
  const [lsTransform, setLsTransform] = useLocalStorage<{
    x: number;
    y: number;
    z: number;
  }>({
    key: `viewer-transform-${projectID}`,
    defaultValue: { x: 0, y: 0, z: 0 },
    getInitialValueInEffect: false,
  });

  const [transform, setTransform] = useState<Vector3>(
    new Vector3(lsTransform.x, lsTransform.y, lsTransform.z)
  );

  const handleSetTransform = (newTransform: Vector3) => {
    const { x, y, z } = newTransform;
    setLsTransform({ x, y, z });
    setTransform(newTransform);
  };

  return (
    <OriginContext.Provider
      value={{ transform, setTransform: handleSetTransform }}
    >
      {children}
    </OriginContext.Provider>
  );
};
