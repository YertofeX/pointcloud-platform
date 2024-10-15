import { Outliner } from "./Outliner";
import { ViewerMenu } from "./ViewerMenu";
import { ViewerToolbar } from "./ViewerToolbar";
import { ViewerProfile } from "./ViewerProfile";
import { ActionBar } from "./ActionBar";
import { ViewerDataDisplay } from "./ViewerDataDisplay";

export const ViewerUI = () => {
  return (
    <>
      <ViewerMenu />
      <ViewerDataDisplay />
      <ViewerToolbar />
      <ViewerProfile />
      <ActionBar />
      <Outliner />
    </>
  );
};
