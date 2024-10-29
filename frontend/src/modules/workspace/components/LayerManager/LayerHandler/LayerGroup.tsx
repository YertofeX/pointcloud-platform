import { useSortable } from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";

import {
  DragIndicator as DragIndicatorIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Stack,
  styled,
  Typography,
} from "@mui/material";

import { LayerGroupData, LayerGroupList as LayerGroupListType } from "../types";

import { LayerGroupList } from "./LayerGroupList";
import { LayerList } from "./LayerList";

type Props = {
  layerGroup: LayerGroupData;
  expanded: boolean;
  handleExpand: () => void;
  isDragging?: boolean;
  forcedInvisible: boolean;
  onVisibilityChange: (path: string[]) => void;
};

export const LayerGroup = ({
  layerGroup,
  expanded,
  handleExpand,
  isDragging,
  forcedInvisible,
  onVisibilityChange,
}: Props) => {
  const { id, title, content, visible } = layerGroup;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const isLayerGroupList = (
    content: LayerGroupData["content"]
  ): content is LayerGroupListType<string> => {
    return (
      typeof content === "object" &&
      Object.values(content).length > 0 &&
      "content" in Object.values(content)[0]
    );
  };

  const handleVisibilityClick = () => {
    onVisibilityChange([id]);
  };

  const handleVisibilityChange = (path: string[]) => {
    onVisibilityChange([id, ...path]);
  };

  return (
    <StyledAccordion
      ref={setNodeRef}
      disableGutters
      expanded={expanded}
      onChange={handleExpand}
      isDragging={isDragging}
      transform={transform}
      transition={transition}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" alignItems="center" gap={1}>
          <DragIndicatorIcon fontSize="small" {...attributes} {...listeners} />
          <Typography sx={{ flexGrow: 1 }}>{title}</Typography>

          <Checkbox
            size="small"
            checked={visible}
            onClick={(e) => {
              e.stopPropagation();
              handleVisibilityClick();
            }}
            color="default"
            sx={{
              opacity: forcedInvisible ? 0.2 : 1,
            }}
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        {isLayerGroupList(content) ? (
          <LayerGroupList
            layerGroups={content}
            forcedInvisible={!visible || forcedInvisible}
            onVisibilityChange={handleVisibilityChange}
          />
        ) : (
          <LayerList
            layers={content}
            forcedInvisible={!visible || forcedInvisible}
            onVisibilityChange={handleVisibilityChange}
          />
        )}
      </AccordionDetails>
    </StyledAccordion>
  );
};

const StyledAccordion = styled(Accordion, {
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
