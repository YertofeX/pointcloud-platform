import { Container, Grid2, Paper, Typography } from "@mui/material";
import { SkeletonProjectList } from "../../components/Projects/SkeletonProjectList";
import { ProjectListHeader } from "../../components/Projects/ProjectListHeader";
import { useGetProjects } from "@api/hooks";
import { ProjectListItem } from "../../components/Projects/ProjectListItem";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { ProjectState, ProjectType } from "@api/types";

export const ProjectList = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();

  const { data: projects } = useGetProjects({
    name: searchParams.get("name") ?? undefined,
    onlyFavorite: searchParams.get("starred") === "true",
    states: searchParams.getAll("state") as ProjectState[],
    types: searchParams.getAll("type") as ProjectType[],
  });

  return (
    <>
      <ProjectListHeader />
      <Container component={Paper} sx={{ mt: 1, p: 2 }}>
        {!projects ? (
          <SkeletonProjectList />
        ) : projects.length === 0 ? (
          <Typography textAlign="center">
            {t("dashboard.projects.no-projects")}
          </Typography>
        ) : (
          <Grid2 container spacing={2} columns={2}>
            {projects.map((project) => (
              <Grid2
                size={{ md: 1, xs: 2 }}
                key={project.id}
                justifyContent="start"
                alignItems="start"
              >
                <ProjectListItem project={project} />
              </Grid2>
            ))}
          </Grid2>
        )}
      </Container>
    </>
  );
};
