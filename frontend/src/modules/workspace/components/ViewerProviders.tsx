import { PropsWithChildren } from "react";
import { BoundsProvider } from "../contexts/BoundsContext";
import { ControlsProvider } from "../contexts/ControlsContext";
import { PointCloudsProvider } from "../contexts/PointCloudsContext";

export const ViewerProviders = ({ children }: PropsWithChildren) => {
  return (
    <ControlsProvider>
      <PointCloudsProvider>
        <BoundsProvider>{children}</BoundsProvider>
      </PointCloudsProvider>
    </ControlsProvider>
  );
};
