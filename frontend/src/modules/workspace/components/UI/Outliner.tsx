import { Paper, styled } from "@mui/material";
import { LayerHandler } from "../LayerManager/LayerHandler";

export const Outliner = () => {
  return (
    <OutlinerPaper>
      <LayerHandler />
    </OutlinerPaper>
  );
};

const OutlinerPaper = styled(Paper)({
  position: "absolute",
  top: "50%",
  right: 10,
  transform: "translate(0, -50%)",
  zIndex: 99,
  height: "50vh",
});
