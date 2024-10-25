import { useDeleteAreaMeasurement, useUpdateAreaMeasurement } from "@api/hooks";
import { useBoundsContext } from "@modules/workspace/contexts/BoundsContext";
import { CropFree as CropFreeIcon, Delete } from "@mui/icons-material";
import { CircularProgress, IconButton, Stack } from "@mui/material";
import { EyeIconButton } from "../../LayerManager/LayerHandler/EyeIconButton";
import { useWorkspaceContext } from "../../WorkspaceContext/WorkspaceContext";
import { useSnackbar } from "@components/SnackbarManager";
import { useTranslation } from "react-i18next";
import { LayerActionComponentProps } from "../../LayerManager/types";

export const AreaMeasureActions = ({
  id,
  visible,
  forcedInvisible,
  bounds,
}: LayerActionComponentProps) => {
  const { t } = useTranslation();

  const { openSnackbar } = useSnackbar();

  const { boundsApi } = useBoundsContext();

  const frame = () => {
    if (!boundsApi) return;
    if (!bounds) return;

    boundsApi.refresh(bounds);
    boundsApi.fit();
  };

  const {
    mutate: updateAreaMeasurement,
    isPending: isUpdateAreaMeasurementPending,
  } = useUpdateAreaMeasurement();

  const {
    mutate: deleteAreaMeasurement,
    isPending: isDeleteAreaMeasurementPending,
  } = useDeleteAreaMeasurement();

  const {
    project: { id: projectID },
  } = useWorkspaceContext();

  const handleVisibilityClick = () => {
    updateAreaMeasurement({
      measurementID: id,
      projectID,
      visible: !visible,
    });
  };

  const handleDeleteMeasurement = () => {
    deleteAreaMeasurement(
      { measurementID: id, projectID },
      {
        onSuccess: () => {
          openSnackbar({
            message: t("project.tools.area-measurement-deleted-successfully"),
            severity: "success",
          });
        },
      }
    );
  };

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {bounds && (
        <IconButton
          size="small"
          disabled={
            isUpdateAreaMeasurementPending || isDeleteAreaMeasurementPending
          }
          onClick={(e) => {
            e.stopPropagation();
            frame();
          }}
        >
          <CropFreeIcon fontSize="small" />
        </IconButton>
      )}
      {isDeleteAreaMeasurementPending ? (
        <CircularProgress size={22} />
      ) : (
        <IconButton
          size="small"
          disabled={isUpdateAreaMeasurementPending}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteMeasurement();
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
      )}
      <EyeIconButton
        visible={visible}
        forcedInvisible={forcedInvisible}
        onClick={handleVisibilityClick}
      />
    </Stack>
  );
};
