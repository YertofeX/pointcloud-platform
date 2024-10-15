import { Paper, Stack, styled, Typography } from "@mui/material";

export const Outliner = () => {
  return (
    <OutlinerPaper>
      <Stack gap={2} p={2}>
        <Typography>asd</Typography>
        <Typography>asdasdasd</Typography>
      </Stack>
    </OutlinerPaper>
  );
};

const OutlinerPaper = styled(Paper)({
  position: "absolute",
  top: "50%",
  right: 10,
  transform: "translate(0, -50%)",
  zIndex: 99,
});
