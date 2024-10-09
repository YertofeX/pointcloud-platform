import { Grid2, Skeleton } from "@mui/material";

export const SkeletonProjectList = () => {
  return (
    <Grid2 container spacing={2} columns={2}>
      {[...Array(16)].map((_, index) => (
        <Grid2
          size={{ md: 1, xs: 2 }}
          key={`project-skeleton-${index}`}
          justifyContent="start"
          alignItems="start"
        >
          <Skeleton width="100%" height={100} />
        </Grid2>
      ))}
    </Grid2>
  );
};
