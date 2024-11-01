import { pocketBase } from "@lib/pocketbase";
import { Stack, Avatar, Typography, Paper } from "@mui/material";
import { useWorkspaceContext } from "../WorkspaceContext/WorkspaceContext";
import { Construction as ConstructionIcon } from "@mui/icons-material";

export const WorkspaceDataDisplay = () => {
  const { project } = useWorkspaceContext();

  return (
    <Paper variant="outlined">
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
    </Paper>
  );
};
