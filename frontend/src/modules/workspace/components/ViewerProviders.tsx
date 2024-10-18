import { PropsWithChildren } from "react";
import { BoundsProvider } from "../contexts/BoundsContext";
import { ControlsProvider } from "../contexts/ControlsContext";
import { PointCloudsProvider } from "../contexts/PointCloudsContext";
import { ToolProvider } from "../contexts/ToolContext";
import { TooltipProvider } from "../contexts/TooltipContext";
import { PermObjectProvider } from "../contexts/PermObjectContext";

export const ViewerProviders = ({ children }: PropsWithChildren) => {
  return (
    <ControlsProvider>
      <ToolProvider>
        <PointCloudsProvider>
          <PermObjectProvider>
            <BoundsProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </BoundsProvider>
          </PermObjectProvider>
        </PointCloudsProvider>
      </ToolProvider>
    </ControlsProvider>
  );
};
