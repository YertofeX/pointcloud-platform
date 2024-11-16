import { dayjs } from "@lib/dayjs";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import {
  CalendarMonth as CalendarMonthIcon,
  Close as CloseIcon,
  Polyline as PolylineIcon,
  ScatterPlot as ScatterPlotIcon,
} from "@mui/icons-material";
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { PointCloud } from "@modules/workspace/contexts/PointCloudsContext";
import { PointCloudPointCount } from "./PointCloudPointCount";
import { useEffect, useState } from "react";
import {
  PointColorType,
  PointOpacityType,
  PointShape,
  PointSizeType,
} from "potree-core";

type Props = {
  pointCloud: PointCloud;
};

export const PointCloudDetails = ({ pointCloud }: Props) => {
  const { t } = useTranslation();

  const { pco, name, created, updated } = pointCloud;

  const { setSelected } = usePermObjectContext();

  const [showBoundingBox, setShowBoundingBox] = useState(
    pointCloud.pco.showBoundingBox
  );

  const [pointSizeType, setPointSizeType] = useState<PointSizeType | undefined>(
    pointCloud.pco.pointSizeType
  );

  const [pointShapeType, setPointShapeType] = useState<PointShape | undefined>(
    pointCloud.pco.material.shape
  );

  const [pointColorType, setPointColorType] = useState<
    PointColorType | undefined
  >(pointCloud.pco.material.pointColorType);

  const [pointOpacityType, setPointOpacityType] = useState<
    PointOpacityType | undefined
  >(pointCloud.pco.material.pointOpacityType);

  const handleShowBoundingBoxChange = () => {
    if (pointCloud) {
      pointCloud.pco.showBoundingBox = !showBoundingBox;
      setShowBoundingBox(!showBoundingBox);
    }
  };

  const handlePointSizeTypeChange = (event: {
    target: { value: PointSizeType | string };
  }) => {
    if (pointCloud) {
      const newValue = parseInt(event.target.value.toString());
      pointCloud.pco.pointSizeType = newValue;
      setPointSizeType(newValue);
    }
  };

  const handlePointShapeTypeChange = (event: {
    target: { value: PointShape | string };
  }) => {
    if (pointCloud) {
      const newValue = parseInt(event.target.value.toString());
      pointCloud.pco.material.shape = newValue;
      setPointShapeType(newValue);
    }
  };

  const handlePointColorTypeChange = (event: {
    target: { value: PointColorType | string };
  }) => {
    if (pointCloud) {
      const newValue = parseInt(event.target.value.toString());
      pointCloud.pco.material.pointColorType = newValue;
      setPointColorType(newValue);
    }
  };

  const handlePointOpacityTypeChange = (event: {
    target: { value: PointOpacityType | string };
  }) => {
    if (pointCloud) {
      const newValue = parseInt(event.target.value.toString());
      pointCloud.pco.material.pointOpacityType = newValue;
      setPointOpacityType(newValue);
    }
  };

  useEffect(() => {
    if (pointCloud) {
      handlePointSizeTypeChange({
        target: { value: pointCloud.pco.pointSizeType },
      });
      handlePointShapeTypeChange({
        target: { value: pointCloud.pco.material.shape },
      });
      handlePointColorTypeChange({
        target: { value: pointCloud.pco.material.pointColorType },
      });
      handlePointOpacityTypeChange({
        target: { value: pointCloud.pco.material.pointOpacityType },
      });
    }
  }, [
    pointCloud,
    handlePointSizeTypeChange,
    handlePointShapeTypeChange,
    handlePointColorTypeChange,
    handlePointOpacityTypeChange,
  ]);

  const settings = (
    <FormGroup>
      <Stack gap={2}>
        <FormControlLabel
          control={
            <Switch
              checked={showBoundingBox}
              onClick={handleShowBoundingBoxChange}
            />
          }
          sx={{ ml: 1 }}
          label={t("project.details.show-bounding-box")}
        />
        <FormControl size="small">
          <InputLabel>
            {t("point-cloud-material.point-size-type.point-size-type")}
          </InputLabel>
          <Select
            label={t("point-cloud-material.point-size-type.point-size-type")}
            value={pointSizeType?.toString()}
            onChange={handlePointSizeTypeChange}
          >
            <MenuItem value={PointSizeType.ADAPTIVE}>
              {t("point-cloud-material.point-size-type.adaptive")}
            </MenuItem>
            <MenuItem value={PointSizeType.ATTENUATED}>
              {t("point-cloud-material.point-size-type.attenuated")}
            </MenuItem>
            <MenuItem value={PointSizeType.FIXED}>
              {t("point-cloud-material.point-size-type.fixed")}
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel>
            {t("point-cloud-material.point-shape-type.point-shape-type")}
          </InputLabel>
          <Select
            label={t("point-cloud-material.point-shape-type.point-shape-type")}
            value={pointShapeType?.toString()}
            onChange={handlePointShapeTypeChange}
          >
            <MenuItem value={PointShape.CIRCLE}>
              {t("point-cloud-material.point-shape-type.circle")}
            </MenuItem>
            <MenuItem value={PointShape.PARABOLOID}>
              {t("point-cloud-material.point-shape-type.paraboloid")}
            </MenuItem>
            <MenuItem value={PointShape.SQUARE}>
              {t("point-cloud-material.point-shape-type.square")}
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel>
            {t("point-cloud-material.point-color-type.point-color-type")}
          </InputLabel>
          <Select
            label={t("point-cloud-material.point-color-type.point-color-type")}
            value={pointColorType?.toString()}
            onChange={handlePointColorTypeChange}
          >
            <MenuItem value={PointColorType.CLASSIFICATION}>
              {t("point-cloud-material.point-color-type.classification")}
            </MenuItem>
            <MenuItem value={PointColorType.COLOR}>
              {t("point-cloud-material.point-color-type.color")}
            </MenuItem>
            <MenuItem value={PointColorType.COMPOSITE}>
              {t("point-cloud-material.point-color-type.composite")}
            </MenuItem>
            <MenuItem value={PointColorType.DEPTH}>
              {t("point-cloud-material.point-color-type.depth")}
            </MenuItem>
            <MenuItem value={PointColorType.ELEVATION}>
              {t("point-cloud-material.point-color-type.elevation")}
            </MenuItem>
            <MenuItem value={PointColorType.INTENSITY}>
              {t("point-cloud-material.point-color-type.intensity")}
            </MenuItem>
            <MenuItem value={PointColorType.INTENSITY_GRADIENT}>
              {t("point-cloud-material.point-color-type.intensity-gradient")}
            </MenuItem>
            <MenuItem value={PointColorType.LOD}>
              {t("point-cloud-material.point-color-type.lod")}
            </MenuItem>
            <MenuItem value={PointColorType.NORMAL}>
              {t("point-cloud-material.point-color-type.normal")}
            </MenuItem>
            <MenuItem value={PointColorType.PHONG}>
              {t("point-cloud-material.point-color-type.phong")}
            </MenuItem>
            <MenuItem value={PointColorType.POINT_INDEX}>
              {t("point-cloud-material.point-color-type.point-index")}
            </MenuItem>
            <MenuItem value={PointColorType.RETURN_NUMBER}>
              {t("point-cloud-material.point-color-type.return-number")}
            </MenuItem>
            <MenuItem value={PointColorType.RGB}>
              {t("point-cloud-material.point-color-type.rgb")}
            </MenuItem>
            <MenuItem value={PointColorType.RGB_HEIGHT}>
              {t("point-cloud-material.point-color-type.rgb-height")}
            </MenuItem>
            <MenuItem value={PointColorType.SOURCE}>
              {t("point-cloud-material.point-color-type.source")}
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel>
            {t("point-cloud-material.point-opacity-type.point-opacity-type")}
          </InputLabel>
          <Select
            label={t(
              "point-cloud-material.point-opacity-type.point-opacity-type"
            )}
            value={pointOpacityType?.toString()}
            onChange={handlePointOpacityTypeChange}
          >
            <MenuItem value={PointOpacityType.FIXED}>
              {t("point-cloud-material.point-opacity-type.fixed")}
            </MenuItem>
            <MenuItem value={PointOpacityType.ATTENUATED}>
              {t("point-cloud-material.point-opacity-type.attenuated")}
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </FormGroup>
  );

  const details = (
    <>
      <Stack direction="row" alignItems="center" gap={1}>
        <PolylineIcon fontSize="small" />
        <Typography>{`${t("project.details.displayed-point-count")}: `}</Typography>
        <PointCloudPointCount pco={pco} />
      </Stack>
      <Divider />
      {settings}
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
