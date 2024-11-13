import { HeightMeasurement } from "@api/types";
import { CopyButton } from "@components/CopyButton";
import { dayjs } from "@lib/dayjs";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import { calculateLength } from "@modules/workspace/utils/calculateLength";
import { toVec3 } from "@modules/workspace/utils/toVec3";
import {
  CalendarMonth,
  Close as CloseIcon,
  Edit,
  Polyline as PolylineIcon,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ExportButton } from "@components/ExportButton";
import { useLocalization } from "@components/LocalizationManager";
import { HeightMeasurementEditForm } from "./HeightMeasurementEditForm";
import { Vector3 } from "three";

type Props = {
  measurement: HeightMeasurement;
};

export const HeightMeasurementDetails = ({ measurement }: Props) => {
  const { t } = useTranslation();

  const { numberFormatter } = useLocalization();

  const { name, color, line, created, updated } = measurement;

  const { setSelected } = usePermObjectContext();

  const [editing, setEditing] = useState<boolean>(false);

  const height = useMemo<string>(() => {
    // first vec3 is the lower point
    const orderedPoints = line.map(toVec3).toSorted((a, b) => a.z - b.z);

    const points = [
      new Vector3(orderedPoints[1].x, orderedPoints[1].y, orderedPoints[0].z),
      orderedPoints[1],
    ];

    return `${numberFormatter.format(calculateLength(points))} m`;
  }, [line]);

  const exportData = {
    name,
    color,
    height,
    points: line,
    created,
    updated,
  };

  const details = (
    <>
      <Stack direction="row" alignItems="center" gap={1}>
        <PolylineIcon fontSize="small" />
        <Typography>{`${t("project.details.height")}:`}</Typography>
        <CopyButton sx={{ textTransform: "none" }} copyContent={height}>
          {height}
        </CopyButton>
      </Stack>
      <Divider />
      <Stack direction="row" alignItems="center" gap={1}>
        <CalendarMonth fontSize="small" />
        <Typography variant="caption">
          {`${t("project.details.created")}: ${dayjs(created).format("L LT")}`}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <CalendarMonth fontSize="small" />
        <Typography variant="caption">
          {`${t("project.details.updated")}: ${dayjs(updated).format("L LT")}`}
        </Typography>
      </Stack>
      <Divider />
      <ExportButton fileName={`${name}_export.json`} exportData={exportData}>
        {t("project.details.export-measurement-data")}
      </ExportButton>
    </>
  );

  const editForm = (
    <HeightMeasurementEditForm
      measurement={measurement}
      onClose={() => setEditing(false)}
    />
  );

  return (
    <Stack gap={1} p={1}>
      <Stack direction="row" alignItems="center" gap={1}>
        <Stack direction="row" alignItems="center" gap={1} flexGrow={1}>
          <Box bgcolor={color} width={18} height={18} borderRadius="100%" />
          <Typography maxWidth={240} noWrap>
            {name}
          </Typography>
          {!editing && (
            <IconButton onClick={() => setEditing(true)}>
              <Edit />
            </IconButton>
          )}
        </Stack>
        <IconButton onClick={() => setSelected(null)}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      {editing ? editForm : details}
    </Stack>
  );
};
