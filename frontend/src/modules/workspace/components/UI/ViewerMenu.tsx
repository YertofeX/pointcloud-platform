import { styled } from "@mui/material";
import { WorkspaceMenu } from "./WorkspaceMenu";

export const ViewerMenu = () => {
  return (
    <ViewerMenuPaper>
      <WorkspaceMenu />
    </ViewerMenuPaper>
  );
};

const ViewerMenuPaper = styled("div")({
  position: "absolute",
  top: 10,
  left: 10,
  zIndex: 99,
});
