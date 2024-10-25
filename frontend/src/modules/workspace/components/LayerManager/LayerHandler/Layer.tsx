import { useSortable } from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";

import { DragIndicator as DragIndicatorIcon } from "@mui/icons-material";
import { Paper, Stack, styled, Typography } from "@mui/material";

import { LayerData } from "../types";

import { EyeIconButton } from "./EyeIconButton";

type Props = {
  layer: LayerData;
  isDragging?: boolean;
  forcedInvisible: boolean;
  onVisibilityChange: (path: string[]) => void;
};

export const Layer = ({
  layer,
  isDragging,
  forcedInvisible,
  onVisibilityChange,
}: Props) => {
  const { id, title, visible } = layer;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const handleVisibilityClick = () => {
    onVisibilityChange([id]);
  };

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
        <EyeIconButton
          visible={visible}
          forcedInvisible={forcedInvisible}
          onClick={handleVisibilityClick}
        />
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
