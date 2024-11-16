import { styled } from "@mui/material";
import { WorkspaceProfile } from "./WorkspaceProfile";

export const ViewerProfile = () => {
  return (
    <ViewerProfilePosition>
      <WorkspaceProfile />
    </ViewerProfilePosition>
  );
};

const ViewerProfilePosition = styled("div")({
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 99,
});
