import { Container, Paper } from "@mui/material";
import { SkeletonProjectList } from "./SkeletonProjectList";
import { ProjectListHeader } from "./ProjectListHeader";

type Props = {};

export const ProjectList = ({}: Props) => {
  return (
    <>
      <ProjectListHeader />
      <Container component={Paper}>
        <SkeletonProjectList />
      </Container>
    </>
  );
};
