import { IconButton, Stack, Typography } from "@mui/material";
import { LayerActionComponentProps } from "../../LayerManager/types";
import { HighlightableSelectableStack } from "@components/HighlightableSelectableStack";
import { CropFree as CropFreeIcon, ScatterPlot } from "@mui/icons-material";
import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from "three";
import { useBoundsContext } from "@modules/workspace/contexts/BoundsContext";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import { PointCloud } from "@modules/workspace/contexts/PointCloudsContext";
import { EyeIconButton } from "../../LayerManager/LayerHandler/EyeIconButton";
import { useUpdatePointCloud } from "@api/hooks";
import { useWorkspaceContext } from "../../WorkspaceContext/WorkspaceContext";

export const PointcloudActions = ({
  id,
  title,
  visible,
  forcedInvisible,
  data: pointCloud,
}: LayerActionComponentProps<PointCloud>) => {
  const {
    project: { id: projectID },
  } = useWorkspaceContext();

  const { boundsApi } = useBoundsContext();

  const { pco } = pointCloud;

  const { highlighted, setHighlighted, selected, setSelected } =
    usePermObjectContext();

  const isHighlighted =
    highlighted?.objectId === id && highlighted.objectType === "pointcloud";

  const isSelected =
    selected?.objectId === id && selected.objectType === "pointcloud";

  const { mutate: updatePointCloud } = useUpdatePointCloud();

  const frame = () => {
    if (!boundsApi) return;

    const box = pco.pcoGeometry.boundingBox;
    const size = box.getSize(new Vector3());
    const geometry = new BoxGeometry(size.x, size.y, size.z);
    const material = new MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    const bounds = new Mesh(geometry, material);
    bounds.position.copy(pco.position);
    bounds.scale.copy(pco.scale);
    bounds.rotation.copy(pco.rotation);
    bounds.raycast = () => false;
    bounds.position.add(new Vector3(size.x / 2, size.y / 2, size.z / 2));

    boundsApi.refresh(bounds);
    boundsApi.fit();
  };

  const handleSelectPointcloud = () => {
    setSelected({ objectId: id, objectType: "pointcloud" });
  };

  const handleVisibilityClick = () => {
    updatePointCloud({
      pointCloudID: id,
      projectID,
      visible: !visible,
    });
  };

  return (
    <HighlightableSelectableStack
      pl={1}
      flexGrow={1}
      direction="row"
      alignItems="center"
      gap={2}
      onMouseEnter={() =>
        setHighlighted({ objectId: id, objectType: "pointcloud" })
      }
      onMouseLeave={() => setHighlighted(null)}
      highlighted={isHighlighted}
      selected={isSelected}
    >
      <Stack
        direction="row"
        alignItems="center"
        onClick={handleSelectPointcloud}
        sx={{ userSelect: "none", cursor: "pointer" }}
        gap={1}
        flexGrow={1}
      >
        <ScatterPlot fontSize="small" />
        <Typography maxWidth={140} noWrap>
          {title}
        </Typography>
      </Stack>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          frame();
        }}
      >
        <CropFreeIcon fontSize="small" />
      </IconButton>
      <EyeIconButton
        visible={visible}
        forcedInvisible={forcedInvisible}
        onClick={handleVisibilityClick}
      />
    </HighlightableSelectableStack>
  );
};
