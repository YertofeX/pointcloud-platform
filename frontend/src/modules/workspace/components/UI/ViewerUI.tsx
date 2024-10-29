import { Outliner } from "./Outliner";
import { ViewerMenu } from "./ViewerMenu";
import { ViewerToolbar } from "./ViewerToolbar";
import { ViewerProfile } from "./ViewerProfile";
import { ObjectDetails } from "./ObjectDetails";
import { ViewerDataDisplay } from "./ViewerDataDisplay";
import { ActiveMeasurementControls } from "./ActiveMeasurementControls";

export const ViewerUI = () => {
  return (
    <>
      <ViewerMenu />
      <ViewerDataDisplay />
      <ViewerToolbar />
      <ActiveMeasurementControls />
      <ViewerProfile />
      <ObjectDetails />
      <Outliner />
    </>
  );
};
