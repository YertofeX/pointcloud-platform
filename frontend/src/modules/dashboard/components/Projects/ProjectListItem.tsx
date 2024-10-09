import { Project } from "@api/types";
import { dayjs } from "@lib/dayjs";
import {
  Settings as SettingsIcon,
  ViewInAr as ViewInArIcon,
} from "@mui/icons-material";
import { Avatar, IconButton, Paper, Stack, Typography } from "@mui/material";

type Props = { project: Project };

export const ProjectListItem = ({ project }: Props) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
      }}
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <Avatar variant="rounded">P</Avatar>
        <Stack flexGrow={1}>
          <Typography
            fontSize={16}
            fontWeight="bold"
            noWrap
            maxWidth={367}
            title={project.name}
          >
            {project.name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            created: {dayjs(project.created).format("L LT")}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <IconButton>
            <ViewInArIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};
