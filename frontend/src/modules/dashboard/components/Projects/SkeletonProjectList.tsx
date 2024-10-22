import { Label as LabelIcon, Star as StarIcon } from "@mui/icons-material";
import {
  Avatar,
  Chip,
  Grid2,
  IconButton,
  Paper,
  Skeleton,
  Stack,
} from "@mui/material";

export const SkeletonProjectList = () => {
  return (
    <Grid2 container spacing={2} columns={2}>
      {[...Array(16)].map((_, index) => (
        <Grid2
          size={{ lg: 1, xs: 2 }}
          key={`project-skeleton-${index}`}
          justifyContent="start"
          alignItems="start"
        >
          <Paper
            elevation={3}
            sx={{
              p: 2,
            }}
          >
            <Stack direction="row" alignItems="center" gap={2}>
              <Skeleton variant="rounded">
                <Avatar variant="rounded" sx={{ width: 48, height: 48 }} />
              </Skeleton>
              <Stack flexGrow={1} gap={1}>
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: 16,
                    width: { xs: 200, sm: 300, md: 600, lg: 320 },
                  }}
                />
                <Stack direction="row" alignItems="center" gap={1}>
                  <Skeleton variant="text" sx={{ fontSize: 14, width: 200 }} />
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Skeleton variant="rounded">
                    <Chip
                      size="small"
                      variant="outlined"
                      icon={<LabelIcon />}
                      sx={{ width: 100 }}
                    />
                  </Skeleton>
                  <Skeleton variant="rounded">
                    <Chip
                      size="small"
                      variant="outlined"
                      icon={<LabelIcon />}
                      sx={{ width: 100 }}
                    />
                  </Skeleton>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                <Skeleton variant="circular">
                  <IconButton>
                    <StarIcon />
                  </IconButton>
                </Skeleton>
                <Skeleton variant="circular">
                  <IconButton>
                    <StarIcon />
                  </IconButton>
                </Skeleton>
                <Skeleton variant="circular">
                  <IconButton>
                    <StarIcon />
                  </IconButton>
                </Skeleton>
              </Stack>
            </Stack>
          </Paper>
        </Grid2>
      ))}
    </Grid2>
  );
};
