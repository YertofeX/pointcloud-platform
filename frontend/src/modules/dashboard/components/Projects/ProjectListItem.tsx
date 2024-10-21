import { useUpdateProjectFavorite } from "@api/hooks";
import { Project } from "@api/types";
import { dayjs } from "@lib/dayjs";
import { pocketBase } from "@lib/pocketbase";
import {
  CalendarMonth as CalendarMonthIcon,
  Construction as ConstructionIcon,
  Label as LabelIcon,
  Settings as SettingsIcon,
  Star,
  StarOutline,
  Tag as TagIcon,
  ViewInAr as ViewInArIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type Props = { project: Project };

export const ProjectListItem = ({ project }: Props) => {
  const { t } = useTranslation();

  const { mutate: updateProjectFavorite, isPending: isUpdateFavoritePending } =
    useUpdateProjectFavorite();

  const handleStar = () => {
    updateProjectFavorite({
      projectID: project.id,
      favorite: !project.favorite,
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
      }}
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <Avatar
          variant="rounded"
          sx={{ width: 48, height: 48 }}
          src={
            project.thumbnail !== ""
              ? pocketBase.getFileUrl(project, project.thumbnail)
              : undefined
          }
        >
          <ConstructionIcon />
        </Avatar>
        <Stack flexGrow={1} gap={1}>
          <Typography
            fontSize={16}
            fontWeight="bold"
            noWrap
            maxWidth={{ xs: 200, sm: 340, md: 220, lg: 360 }}
            title={project.name}
          >
            {project.name}
          </Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <CalendarMonthIcon
              fontSize="small"
              sx={{ color: "text.disabled" }}
            />
            <Typography variant="caption" color="textSecondary">
              {dayjs(project.created).format("L LT")}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <Chip
              size="small"
              variant="outlined"
              label={t(`project.states.${project.state}`)}
              icon={<LabelIcon />}
            />
            <Chip
              size="small"
              variant="outlined"
              label={t(`project.types.${project.type}`)}
              icon={<TagIcon />}
            />
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <IconButton component={Link} to={`/projects/${project.id}`}>
            <ViewInArIcon />
          </IconButton>
          <IconButton component={Link} to={`/projects/${project.id}/settings`}>
            <SettingsIcon />
          </IconButton>
          <IconButton onClick={handleStar} disabled={isUpdateFavoritePending}>
            {isUpdateFavoritePending ? (
              <CircularProgress size="24px" color="inherit" />
            ) : project.favorite ? (
              <Star color="warning" />
            ) : (
              <StarOutline />
            )}
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};
