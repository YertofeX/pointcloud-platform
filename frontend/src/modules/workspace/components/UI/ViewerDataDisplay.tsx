import { styled } from "@mui/material";
import { WorkspaceDataDisplay } from "./WorkspaceDataDisplay";

export const ViewerDataDisplay = () => {
  return (
    <DataDisplayPaper>
      <WorkspaceDataDisplay />
    </DataDisplayPaper>
  );
};

const DataDisplayPaper = styled("div")({
  position: "absolute",
  top: 10,
  left: 60,
  zIndex: 99,
});
