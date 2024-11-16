import {
  Fade,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { LayerHandler } from "../LayerManager/LayerHandler";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CloseFullscreen, Layers as LayersIcon } from "@mui/icons-material";

export const Outliner = () => {
  const { t } = useTranslation();

  const [outlinerOpen, setOutlinerOpen] = useState<boolean>(true);

  return (
    <>
      <OutlinerHeaderPaper variant="outlined" outlinerOpen={outlinerOpen}>
        <Stack direction="row" alignItems="center" gap={1} p={1}>
          {outlinerOpen && <LayersIcon />}
          {outlinerOpen && (
            <Typography fontWeight="bold" flexGrow={1} textAlign="center">
              {t("project.outliner")}
            </Typography>
          )}
          <IconButton
            size="small"
            onClick={() => setOutlinerOpen((open) => !open)}
          >
            {outlinerOpen ? <CloseFullscreen /> : <LayersIcon />}
          </IconButton>
        </Stack>
      </OutlinerHeaderPaper>
      <Fade in={outlinerOpen}>
        <OutlinerPaper variant="outlined">
          <LayerHandler />
        </OutlinerPaper>
      </Fade>
    </>
  );
};

const OutlinerHeaderPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "outlinerOpen",
})<{ outlinerOpen: boolean }>(({ outlinerOpen }) => ({
  position: "absolute",
  top: "calc(25vh - 60px)",
  zIndex: 99,
  right: 10,
  width: outlinerOpen ? "380px" : "50px",
  transition: "width 200ms",
}));

const OutlinerPaper = styled(Paper)({
  position: "absolute",
  top: "50%",
  right: 10,
  transform: "translate(0, -50%)",
  zIndex: 99,
  height: "50vh",
  width: "380px",
  overflow: "auto",
});
