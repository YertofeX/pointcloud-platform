import { Avatar, Paper, Stack, styled, Typography } from "@mui/material";
import { useWorkspaceContext } from "../WorkspaceContext/WorkspaceContext";
import { pocketBase } from "@lib/pocketbase";
import { Construction as ConstructionIcon } from "@mui/icons-material";

export const ViewerDataDisplay = () => {
  const { project } = useWorkspaceContext();

  return (
    <DataDisplayPaper>
      <Stack direction="row" gap={2} alignItems="center" pr={{ xs: 0, md: 2 }}>
        <Avatar
          sx={{ width: 40, height: 40 }}
          variant="rounded"
          src={
            project.thumbnail !== ""
              ? pocketBase.getFileUrl(project, project.thumbnail, {
                  thumb: "0x64",
                })
              : undefined
          }
        >
          <ConstructionIcon />
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
