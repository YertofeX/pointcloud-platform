import { Container, Grid2, Paper } from "@mui/material";
import { SkeletonProjectList } from "../../components/Projects/SkeletonProjectList";
import { ProjectListHeader } from "../../components/Projects/ProjectListHeader";
import { useGetProjects } from "@api/hooks";
import { ProjectListItem } from "../../components/Projects/ProjectListItem";

export const ProjectList = () => {
  const { data: projects } = useGetProjects();

  return (
    <>
      <ProjectListHeader />
      <Container component={Paper} sx={{ mt: 1, p: 2 }}>
        {!projects ? (
          <SkeletonProjectList />
        ) : projects.length === 0 ? (
          "no projects to display todo"
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
