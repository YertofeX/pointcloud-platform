import { useSortable } from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";

import { DragIndicator as DragIndicatorIcon } from "@mui/icons-material";
import { Paper, Stack, styled } from "@mui/material";

import { LayerData } from "../types";

type Props = {
  layer: LayerData;
  isDragging?: boolean;
  forcedInvisible: boolean;
  onVisibilityChange: (path: string[]) => void;
};

export const Layer = ({ layer, isDragging, forcedInvisible }: Props) => {
  const { id, title, visible, data, ActionComponent } = layer;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <StyledPaper
      variant="outlined"
      ref={setNodeRef}
      transform={transform}
      transition={transition}
    >
      <Stack direction="row" alignItems="center">
        <StyledDragIndicatorIcon
          fontSize="small"
          {...attributes}
          {...listeners}
          isDragging={isDragging}
        />
        {ActionComponent && (
          <ActionComponent
            id={id}
            title={title}
            visible={visible}
            forcedInvisible={forcedInvisible}
            data={data}
          />
        )}
      </Stack>
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)<{
  transform: Transform | null;
  transition: string | undefined;
}>(({ transform, transition }) => ({
  touchAction: "none",
  transform: transform ? CSS.Translate.toString(transform) : "none",
  transition,
}));

const StyledDragIndicatorIcon = styled(DragIndicatorIcon, {
  shouldForwardProp: (prop) => !["isDragging"].includes(prop.toString()),
})<{
  isDragging?: boolean;
}>(({ isDragging }) => ({
  cursor: isDragging ? "grabbing" : "grab",
}));
