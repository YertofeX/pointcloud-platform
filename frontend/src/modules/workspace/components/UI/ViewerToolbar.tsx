import { Polyline } from "@mui/icons-material";
import { IconButton, Paper, Stack, styled } from "@mui/material";

export const ViewerToolbar = () => {
  return (
    <ToolbarPaper>
      <Stack direction="row" gap={1} px={1}>
        <IconButton color="primary">
          <Polyline />
        </IconButton>
        <IconButton color="primary">
          <Polyline />
        </IconButton>
        <IconButton color="primary">
          <Polyline />
        </IconButton>
      </Stack>
    </ToolbarPaper>
  );
};

const ToolbarPaper = styled(Paper)({
  position: "absolute",
  top: 10,
  left: "50%",
  transform: "translate(-50%)",
  zIndex: 99,
});
