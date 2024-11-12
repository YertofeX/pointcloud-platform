import {
  useDeleteHeightMeasurement,
  useUpdateHeightMeasurement,
} from "@api/hooks";
import { useBoundsContext } from "@modules/workspace/contexts/BoundsContext";
import { CropFree as CropFreeIcon, Delete } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { EyeIconButton } from "../../LayerManager/LayerHandler/EyeIconButton";
import { useWorkspaceContext } from "../../WorkspaceContext/WorkspaceContext";
import { LayerActionComponentProps } from "../../LayerManager/types";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import { HighlightableSelectableStack } from "@components/HighlightableSelectableStack";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "@components/SnackbarManager";
import { HeightMeasurement } from "@api/types";
import { getBounds } from "@modules/workspace/utils/getBounds";
import { toVec3 } from "@modules/workspace/utils/toVec3";
import { useMemo } from "react";
import { useOriginContext } from "@modules/workspace/contexts/OriginContext";

export const HeightMeasureActions = ({
  id,
  title,
  visible,
  forcedInvisible,
  data,
}: LayerActionComponentProps<HeightMeasurement>) => {
  const { t } = useTranslation();

  const { openSnackbar } = useSnackbar();

  const { transform } = useOriginContext();

  const { highlighted, setHighlighted, selected, setSelected } =
    usePermObjectContext();

  const { boundsApi } = useBoundsContext();

  const { color, line } = data;

  const bounds = useMemo(
    () => getBounds(line.map((coords) => toVec3(coords).add(transform))),
    [line, transform]
  );

  const frame = () => {
    if (!boundsApi) return;
    if (!bounds) return;

    boundsApi.refresh(bounds);
    boundsApi.fit();
  };

  const {
    mutate: updateHeightMeasurement,
    isPending: isUpdateHeightMeasurementPending,
  } = useUpdateHeightMeasurement();

  const {
    mutate: deleteHeightMeasurement,
    isPending: isDeleteHeightMeasurementPending,
  } = useDeleteHeightMeasurement();

  const {
    project: { id: projectID },
  } = useWorkspaceContext();

  const isHighlighted =
    highlighted?.objectId === id && highlighted.objectType === "height";

  const isSelected =
    selected?.objectId === id && selected.objectType === "height";

  const handleVisibilityClick = () => {
    updateHeightMeasurement({
      measurementID: id,
      projectID,
      visible: !visible,
    });
  };

  const handleDeleteMeasurement = () => {
    deleteHeightMeasurement(
      { measurementID: id, projectID },
      {
        onSuccess: () => {
          openSnackbar({
            message: t("project.tools.height-measurement-deleted-successfully"),
            severity: "success",
          });
          if (isSelected) setSelected(null);
          if (isHighlighted) setHighlighted(null);
        },
      }
    );
  };

  const handleSelectMeasurement = () => {
    setSelected({ objectId: id, objectType: "height" });
  };

  return (
    <HighlightableSelectableStack
      pl={1}
      flexGrow={1}
      direction="row"
      alignItems="center"
      gap={2}
      onMouseEnter={() =>
        setHighlighted({ objectId: id, objectType: "height" })
      }
      onMouseLeave={() => setHighlighted(null)}
      highlighted={isHighlighted}
      selected={isSelected}
    >
      <Stack
        direction="row"
        alignItems="center"
        onClick={handleSelectMeasurement}
        sx={{ userSelect: "none", cursor: "pointer" }}
        gap={1}
        flexGrow={1}
      >
        {color && (
          <Box bgcolor={color} width={14} height={14} borderRadius="100%" />
        )}
        <Typography maxWidth={140} noWrap>
          {title}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        {bounds && (
          <IconButton
            size="small"
            disabled={
              isUpdateHeightMeasurementPending ||
              isDeleteHeightMeasurementPending
            }
            onClick={(e) => {
              e.stopPropagation();
              frame();
            }}
          >
            <CropFreeIcon fontSize="small" />
          </IconButton>
        )}
        {isDeleteHeightMeasurementPending ? (
          <CircularProgress size={22} />
        ) : (
          <IconButton
            size="small"
            disabled={isUpdateHeightMeasurementPending}
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
    </HighlightableSelectableStack>
  );
};
