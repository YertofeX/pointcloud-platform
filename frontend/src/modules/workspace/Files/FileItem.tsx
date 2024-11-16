import { useDeletePointCloud } from "@api/hooks";
import { PointCloudData } from "@api/types";
import { ConfirmationDialog } from "@components/ConfirmationDialog";
import { dayjs } from "@lib/dayjs";
import {
  ScatterPlot as ScatterPlotIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilePresent as FilePresentIcon,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";
import {
  Paper,
  Stack,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useWorkspaceContext } from "../components/WorkspaceContext/WorkspaceContext";
import { useTranslation } from "react-i18next";

type Props = {
  pointCloud: PointCloudData;
  onEditing: () => void;
};

export const FileItem = ({ pointCloud, onEditing }: Props) => {
  const { t } = useTranslation();

  const {
    project: { id: projectID },
  } = useWorkspaceContext();
  const { id, name, raw, created } = pointCloud;

  const { mutate: deletePointCloud, isPending: isDeletePointCloudPending } =
    useDeletePointCloud();

  const [confirmationDialogOpen, setConfirmationDialogOpen] =
    useState<boolean>(false);

  const handleDeletePointCloud = () => {
    deletePointCloud({ pointCloudID: id, projectID });
  };

  return (
    <>
      <Paper sx={{ p: 1, ml: 2 }}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Stack flexGrow={1} gap={1}>
            <Stack direction="row" alignItems="center" gap={1}>
              <ScatterPlotIcon />
              <Typography>{name}</Typography>
            </Stack>
            <Stack gap={1} ml={4}>
              <Stack direction="row" alignItems="center" gap={1}>
                <FilePresentIcon fontSize="small" />
                <Typography variant="caption">{raw}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                <CalendarMonthIcon fontSize="small" />
                <Typography variant="caption">
                  {dayjs(created).format("L LT")}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <IconButton onClick={onEditing} disabled={isDeletePointCloudPending}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => setConfirmationDialogOpen(true)}>
            {isDeletePointCloudPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <DeleteIcon />
            )}
          </IconButton>
        </Stack>
      </Paper>
      <ConfirmationDialog
        title={t("project.files.confirm-deletion")}
        text={t("project.files.are-you-sure")}
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
        onOk={handleDeletePointCloud}
      />
    </>
  );
};
