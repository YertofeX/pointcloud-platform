import { dayjs } from "@lib/dayjs";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import {
  CalendarMonth as CalendarMonthIcon,
  Close as CloseIcon,
  Polyline as PolylineIcon,
  ScatterPlot as ScatterPlotIcon,
} from "@mui/icons-material";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PointCloud } from "@modules/workspace/contexts/PointCloudsContext";
import { PointCloudPointCount } from "./PointCloudPointCount";

type Props = {
  pointCloud: PointCloud;
};

export const PointCloudDetails = ({ pointCloud }: Props) => {
  const { t } = useTranslation();

  const { pco, name, created, updated } = pointCloud;

  const { setSelected } = usePermObjectContext();

  const details = (
    <>
      <Stack direction="row" alignItems="center" gap={1}>
        <PolylineIcon fontSize="small" />
        <Typography>{`${t("project.details.displayed-point-count")}: `}</Typography>
        <PointCloudPointCount pco={pco} />
      </Stack>
      <Divider />
      <Stack direction="row" alignItems="center" gap={1}>
        <CalendarMonthIcon fontSize="small" />
        <Typography variant="caption">
          {`${t("project.details.created")}: ${dayjs(created).format("L LT")}`}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <CalendarMonthIcon fontSize="small" />
        <Typography variant="caption">
          {`${t("project.details.updated")}: ${dayjs(updated).format("L LT")}`}
        </Typography>
      </Stack>
    </>
  );

  return (
    <Stack gap={1} p={1}>
      <Stack direction="row" alignItems="center" gap={1}>
        <Stack direction="row" alignItems="center" gap={1} flexGrow={1}>
          <ScatterPlotIcon />
          <Typography maxWidth={240} noWrap>
            {name}
          </Typography>
        </Stack>
        <IconButton onClick={() => setSelected(null)}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      {details}
    </Stack>
  );
};
