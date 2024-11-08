import { AreaMeasurement } from "@api/types";
import { CopyButton } from "@components/CopyButton";
import { CopyIconButton } from "@components/CopyIconButton";
import { dayjs } from "@lib/dayjs";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import {
  calculateLength,
  formatLength,
} from "@modules/workspace/utils/calculateLength";
import { toVec3 } from "@modules/workspace/utils/toVec3";
import {
  CalendarMonth,
  Close as CloseIcon,
  Edit,
  Polyline as PolylineIcon,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AreaMeasurementEditForm } from "./AreaMeasurementEditForm";
import { calculateArea } from "@modules/workspace/utils/calculateArea";
import { ExportButton } from "@components/ExportButton";
import { useLocalization } from "@components/LocalizationManager";

type Props = {
  measurement: AreaMeasurement;
};

export const AreaMeasurementDetails = ({ measurement }: Props) => {
  const { t } = useTranslation();

  const { numberFormatter } = useLocalization();

  const { id, name, color, line, created, updated } = measurement;

  const { setSelected } = usePermObjectContext();

  const [editing, setEditing] = useState<boolean>(false);

  const area = useMemo<number>(
    () => Math.round(calculateArea([...line, line[0]].map(toVec3)) * 100) / 100,
    [line]
  );

  const circumference = useMemo<string>(
    () =>
      `${numberFormatter.format(calculateLength([...line, line[0]].map(toVec3)))} m`,
    [line]
  );

  const segments = useMemo<string[]>(
    () =>
      [...line, line[0]]
        .slice(1)
        .map(
          (coordinates, index) =>
            `${numberFormatter.format(calculateLength([line[index], coordinates].map(toVec3)))} m`
        ),
    [line]
  );

  const exportData = {
    name,
    color,
    area,
    circumference,
    points: line,
    segments,
    created,
    updated,
  };

  const details = (
    <>
      <Stack direction="row" alignItems="center" gap={1}>
        <PolylineIcon fontSize="small" />
        <Typography>{`${t("project.details.area")}:`}</Typography>
        <CopyButton
          size="small"
          sx={{ textTransform: "none" }}
          copyContent={`${numberFormatter.format(area)} m2`}
        >
          <Typography>
            {area} m<sup>2</sup>
          </Typography>
        </CopyButton>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <PolylineIcon fontSize="small" />
        <Typography>{`${t("project.details.circumference")}:`}</Typography>
        <CopyButton sx={{ textTransform: "none" }} copyContent={circumference}>
          <Typography>{circumference}</Typography>
        </CopyButton>
      </Stack>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t("project.details.segment")}</TableCell>
              <TableCell>{t("project.details.length")}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {segments.map((segment, index) => (
              <TableRow key={`${id}-segmentrow-${index}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{segment}</TableCell>
                <TableCell>
                  <CopyIconButton
                    copyContent={segment}
                    iconButtonProps={{ size: "small" }}
                    iconProps={{ fontSize: "small" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    <AreaMeasurementEditForm
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
