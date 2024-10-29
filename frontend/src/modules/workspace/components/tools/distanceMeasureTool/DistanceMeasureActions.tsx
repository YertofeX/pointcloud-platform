import {
  useDeleteDistanceMeasurement,
  useUpdateDistanceMeasurement,
} from "@api/hooks";
import { useBoundsContext } from "@modules/workspace/contexts/BoundsContext";
import { CropFree as CropFreeIcon, Delete } from "@mui/icons-material";
import { CircularProgress, IconButton, Stack } from "@mui/material";
import { EyeIconButton } from "../../LayerManager/LayerHandler/EyeIconButton";
import { useWorkspaceContext } from "../../WorkspaceContext/WorkspaceContext";
import { useSnackbar } from "@components/SnackbarManager";
import { useTranslation } from "react-i18next";
import { LayerActionComponentProps } from "../../LayerManager/types";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";

export const DistanceMeasureActions = ({
  id,
  visible,
  forcedInvisible,
  bounds,
}: LayerActionComponentProps) => {
  const { t } = useTranslation();

  const { openSnackbar } = useSnackbar();

  const { setHighlighted } = usePermObjectContext();

  const { boundsApi } = useBoundsContext();

  const frame = () => {
    if (!boundsApi) return;
    if (!bounds) return;

    boundsApi.refresh(bounds);
    boundsApi.fit();
  };

  const {
    mutate: updateDistanceMeasurement,
    isPending: isUpdateDistanceMeasurementPending,
  } = useUpdateDistanceMeasurement();

  const {
    mutate: deleteDistanceMeasurement,
    isPending: isDeleteDistanceMeasurementPending,
  } = useDeleteDistanceMeasurement();

  const {
    project: { id: projectID },
  } = useWorkspaceContext();

  const handleVisibilityClick = () => {
    updateDistanceMeasurement({
      measurementID: id,
      projectID,
      visible: !visible,
    });
  };

  const handleDeleteMeasurement = () => {
    deleteDistanceMeasurement(
      { measurementID: id, projectID },
      {
        onSuccess: () => {
          openSnackbar({
            message: t(
              "project.tools.distance-measurement-deleted-successfully"
            ),
            severity: "success",
          });
        },
      }
    );
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      onMouseEnter={() =>
        setHighlighted({ objectId: id, objectType: "distance-measure" })
      }
      onMouseLeave={() => setHighlighted(null)}
    >
      {bounds && (
        <IconButton
          size="small"
          disabled={
            isUpdateDistanceMeasurementPending ||
            isDeleteDistanceMeasurementPending
          }
          onClick={(e) => {
            e.stopPropagation();
            frame();
          }}
        >
          <CropFreeIcon fontSize="small" />
        </IconButton>
      )}
      {isDeleteDistanceMeasurementPending ? (
        <CircularProgress size={22} />
      ) : (
        <IconButton
          size="small"
          disabled={isUpdateDistanceMeasurementPending}
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
