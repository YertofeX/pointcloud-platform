import { Outliner } from "./Outliner";
import { ViewerMenu } from "./ViewerMenu";
import { ViewerToolbar } from "./ViewerToolbar";
import { ViewerProfile } from "./ViewerProfile";
import { ActionBar } from "./ActionBar";
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
      <ActionBar />
      <Outliner />
    </>
  );
};
