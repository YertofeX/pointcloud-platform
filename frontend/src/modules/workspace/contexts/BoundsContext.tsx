import { BoundsApi } from "@react-three/drei";
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface Bounds {
  boundsApi: BoundsApi | undefined;
  setBoundsApi: React.Dispatch<React.SetStateAction<BoundsApi | undefined>>;
}

export const BoundsContext = createContext<Bounds>({
  boundsApi: undefined,
  setBoundsApi: () => {},
});

export const useBoundsContext = () => useContext(BoundsContext);

export const BoundsProvider = ({ children }: PropsWithChildren) => {
  const [boundsApi, setBoundsApi] = useState<BoundsApi>();

  return (
    <BoundsContext.Provider value={{ boundsApi, setBoundsApi }}>
      {children}
    </BoundsContext.Provider>
  );
};