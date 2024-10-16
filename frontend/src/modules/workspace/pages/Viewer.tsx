import { ViewerUI } from "../components/UI/ViewerUI";
import { ViewerCanvas } from "../components/ViewerCanvas";
import { ViewerProviders } from "../components/ViewerProviders";

export const Viewer = () => {
  return (
    <ViewerProviders>
      <ViewerUI />
      <ViewerCanvas />
    </ViewerProviders>
  );
};
