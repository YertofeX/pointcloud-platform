import { AddCircle as AddCircleIcon } from "@mui/icons-material";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { ProjectListFilters } from "./ProjectListFilters/ProjectListFilters";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ProjectListHeader = () => {
  const { t } = useTranslation();

  return (
    <Container component={Paper} sx={{ marginTop: 1, p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack gap={2}>
          <Typography variant="h2" fontSize={24} fontWeight="bold">
            {t("project.projects")}
          </Typography>
          <Button
            startIcon={<AddCircleIcon />}
            component={Link}
            to="/dashboard/projects/create"
          >
            {t("project.create-new")}
          </Button>
        </Stack>
        <ProjectListFilters />
      </Stack>
    </Container>
  );
};
