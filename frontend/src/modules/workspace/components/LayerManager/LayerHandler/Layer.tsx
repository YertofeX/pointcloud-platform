import { useSortable } from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";

import { DragIndicator as DragIndicatorIcon } from "@mui/icons-material";
import { Paper, Stack, styled, Typography } from "@mui/material";

import { LayerData } from "../types";

import { getBounds } from "@modules/workspace/utils/getBounds";
import { AreaMeasurement, DistanceMeasurement } from "@api/types";
import { Vector3 } from "three";

type Props = {
  layer: LayerData;
  isDragging?: boolean;
  forcedInvisible: boolean;
  onVisibilityChange: (path: string[]) => void;
};

export const Layer = ({ layer, isDragging, forcedInvisible }: Props) => {
  const { id, title, visible, data, ActionComponent } = layer;

  const { line } = data as DistanceMeasurement | AreaMeasurement;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <StyledPaper
      ref={setNodeRef}
      isDragging={isDragging}
      transform={transform}
      transition={transition}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <DragIndicatorIcon fontSize="small" {...attributes} {...listeners} />
        <Typography sx={{ flexGrow: 1 }}>{title}</Typography>
        {ActionComponent && (
          <ActionComponent
            id={id}
            visible={visible}
            forcedInvisible={forcedInvisible}
            bounds={getBounds(line.map(([x, y, z]) => new Vector3(x, y, z)))}
          />
        )}
      </Stack>
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => !["isDragging"].includes(prop.toString()),
})<{
  isDragging?: boolean;
  transform: Transform | null;
  transition: string | undefined;
}>(({ isDragging, transform, transition }) => ({
  touchAction: "none",
  opacity: isDragging ? 0.2 : 1,
  transform: transform ? CSS.Translate.toString(transform) : "none",
  transition,
}));
