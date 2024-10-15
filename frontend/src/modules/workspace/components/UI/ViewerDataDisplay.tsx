import { Avatar, Paper, Stack, styled, Typography } from "@mui/material";
import { useWorkspaceContext } from "../WorkspaceContext/WorkspaceContext";

export const ViewerDataDisplay = () => {
  const { project } = useWorkspaceContext();

  return (
    <DataDisplayPaper>
      <Stack direction="row" gap={2} alignItems="center" pr={{ xs: 0, md: 2 }}>
        <Avatar sx={{ width: 40, height: 40 }} variant="rounded">
          {project.name[0]}
        </Avatar>
        <Typography maxWidth={200} noWrap display={{ xs: "none", md: "block" }}>
          {project.name}
        </Typography>
      </Stack>
    </DataDisplayPaper>
  );
};

const DataDisplayPaper = styled(Paper)({
  position: "absolute",
  top: 10,
  left: 60,
  zIndex: 99,
});
