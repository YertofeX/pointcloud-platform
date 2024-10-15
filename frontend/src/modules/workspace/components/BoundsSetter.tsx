import { PropsWithChildren, useEffect } from "react";
import { useBounds } from "@react-three/drei";
import { useBoundsContext } from "../contexts/BoundsContext";

export const BoundsSetter = ({ children }: PropsWithChildren) => {
  const { setBoundsApi } = useBoundsContext();

  const api = useBounds();

  useEffect(() => {
    setBoundsApi(api);
  }, [api, setBoundsApi]);

  return <>{children}</>;
};
