import { DistanceMeasurement } from "@api/types";
import { CopyButton } from "@components/CopyButton";
import { CopyIconButton } from "@components/CopyIconButton";
import { dayjs } from "@lib/dayjs";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import {
  calculateLength,
  formatLength,
} from "@modules/workspace/utils/calculateLength";
import { toVec3 } from "@modules/workspace/utils/toVec3";
import { CalendarMonth, Close as CloseIcon } from "@mui/icons-material";
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
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  measurement: DistanceMeasurement;
};

export const DistanceMeasurementDetails = ({ measurement }: Props) => {
  const { t } = useTranslation();

  const { id, name, color, line, created, updated } = measurement;

  const { setSelected } = usePermObjectContext();

  const totalLength = useMemo<string>(
    () => formatLength(calculateLength(line.map(toVec3))),
    [line]
  );

  const segments = useMemo<string[]>(
    () =>
      line
        .slice(1)
        .map((coordinates, index) =>
          formatLength(
            calculateLength([toVec3(line[index]), toVec3(coordinates)])
          )
        ),
    [line]
  );

  return (
    <Stack gap={1} p={1}>
      <Stack direction="row" alignItems="center" gap={1}>
        <Box bgcolor={color} width={18} height={18} borderRadius="100%" />
        <Typography flexGrow={1}>{name}</Typography>
        <IconButton onClick={() => setSelected(null)}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography>{`${t("project.details.total-length")}:`}</Typography>
        <CopyButton sx={{ textTransform: "none" }} copyContent={totalLength}>
          {totalLength}
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
    </Stack>
  );
};
