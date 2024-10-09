import { Container, Paper } from "@mui/material";
import { SkeletonProjectList } from "./SkeletonProjectList";

type Props = {};

export const ProjectList = ({}: Props) => {
  return (
    <Container component={Paper}>
      <SkeletonProjectList />
    </Container>
  );
};
