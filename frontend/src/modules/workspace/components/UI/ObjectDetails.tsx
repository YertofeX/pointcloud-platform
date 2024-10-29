import {
  PermObjectType,
  usePermObjectContext,
} from "@modules/workspace/contexts/PermObjectContext";
import { Paper, Stack, styled, Typography } from "@mui/material";
import { useLayerContext } from "../LayerManager/LayerContext";
import { AreaMeasurement, DistanceMeasurement } from "@api/types";
import { ReactNode } from "react";
import { DistanceMeasurementDetails } from "../objects/permLine/DistanceMeasurementDetails";
import { AreaMeasurementDetails } from "../objects/permArea/AreaMeasurementDetails";

export const ObjectDetails = () => {
  const { distanceMeasurements, areaMeasurements } = useLayerContext();
  const { selected } = usePermObjectContext();

  if (selected === null) return null;

  const getSelectedObject = ():
    | DistanceMeasurement
    | AreaMeasurement
    | null => {
    if (!selected) return null;

    switch (selected.objectType) {
      case "distance":
        const foundDistanceMeasurement = distanceMeasurements.find(
          (measurement) => measurement.id === selected.objectId
        );
        if (foundDistanceMeasurement) return foundDistanceMeasurement;
        break;
      case "area":
        const foundAreaMeasurement = areaMeasurements.find(
          (measurement) => measurement.id === selected.objectId
        );
        if (foundAreaMeasurement) return foundAreaMeasurement;
        break;
      case "pointcloud":
        // TODO
        break;
      default:
        return null;
    }
    return null;
  };

  const getDetailsComponent = (
    selectedObjectType: PermObjectType,
    selectedObject: DistanceMeasurement | AreaMeasurement
  ): ReactNode => {
    switch (selectedObjectType) {
      case "distance":
        return (
          <DistanceMeasurementDetails
            key={selectedObject.id}
            measurement={selectedObject as DistanceMeasurement}
          />
        );
      case "area":
        return (
          <AreaMeasurementDetails
            key={selectedObject.id}
            measurement={selectedObject as AreaMeasurement}
          />
        );
      case "pointcloud":
        //TODO
        return null;
    }
  };

  const selectedObject = getSelectedObject();

  if (!selectedObject) return null;

  return (
    <ObjectDetailsPaper variant="outlined">
      {getDetailsComponent(selected.objectType, selectedObject)}
    </ObjectDetailsPaper>
  );
};

const ObjectDetailsPaper = styled(Paper)({
  position: "absolute",
  top: "50%",
  left: 10,
  transform: "translate(0, -50%)",
  zIndex: 99,
  width: "380px",
  maxHeight: "50vh",
  overflow: "scroll",
});
