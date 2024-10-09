import { AddCircle as AddCircleIcon } from "@mui/icons-material";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { ProjectListFilters } from "./ProjectListFilters/ProjectListFilters";

type Props = {};

export const ProjectListHeader = ({}: Props) => {
  return (
    <Container component={Paper} sx={{ marginTop: 1, p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack gap={2}>
          <Typography variant="h2" fontSize={24} fontWeight="bold">
            Projects
          </Typography>
          <Button startIcon={<AddCircleIcon />}>Create new project</Button>
        </Stack>
        <ProjectListFilters />
      </Stack>
    </Container>
  );
};
