import { Paper, Stack, styled, Typography } from "@mui/material";

export const ActionBar = () => {
  return (
    <ActionbarPaper>
      <Stack gap={2} p={2}>
        <Typography>asd</Typography>
        <Typography>asdasdasd</Typography>
      </Stack>
    </ActionbarPaper>
  );
};

const ActionbarPaper = styled(Paper)({
  position: "absolute",
  top: "50%",
  left: 10,
  transform: "translate(0, -50%)",
  zIndex: 99,
});
