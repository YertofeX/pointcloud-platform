import { Project } from "@api/types";
import { dayjs } from "@lib/dayjs";
import {
  CalendarMonth,
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
        <Avatar variant="rounded" sx={{ width: 48, height: 48 }}>
          P
        </Avatar>
        <Stack flexGrow={1} gap={1}>
          <Typography
            fontSize={16}
            fontWeight="bold"
            noWrap
            maxWidth={367}
            title={project.name}
          >
            {project.name}
          </Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <CalendarMonth fontSize="small" sx={{ color: "text.disabled" }} />
            <Typography variant="caption" color="textSecondary">
              {dayjs(project.created).format("L LT")}
            </Typography>
          </Stack>
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
