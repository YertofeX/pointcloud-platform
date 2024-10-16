import { PropsWithChildren } from "react";
import { BoundsProvider } from "../contexts/BoundsContext";
import { ControlsProvider } from "../contexts/ControlsContext";
import { PointCloudsProvider } from "../contexts/PointCloudsContext";
import { ToolProvider } from "../contexts/ToolContext";
import { TooltipProvider } from "../contexts/TooltipContext";

export const ViewerProviders = ({ children }: PropsWithChildren) => {
  return (
    <ControlsProvider>
      <ToolProvider>
        <PointCloudsProvider>
          <BoundsProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </BoundsProvider>
        </PointCloudsProvider>
      </ToolProvider>
    </ControlsProvider>
  );
};
