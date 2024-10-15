import { ViewerCanvas } from "../components/ViewerCanvas";
import { ViewerProviders } from "../components/ViewerProviders";
import { useWorkspaceContext } from "../components/WorkspaceContext/WorkspaceContext";

export const Viewer = () => {
  const { project } = useWorkspaceContext();

  return (
    <ViewerProviders>
      <ViewerCanvas />
    </ViewerProviders>
  );
};
