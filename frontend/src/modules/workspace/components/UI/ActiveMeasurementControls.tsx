import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import { useToolContext } from "@modules/workspace/contexts/ToolContext";
import {
  Clear as ClearIcon,
  Redo as RedoIcon,
  Save as SaveIcon,
  Undo as UndoIcon,
} from "@mui/icons-material";
import { IconButton, Paper, Stack, styled } from "@mui/material";
import { produce } from "immer";

export const ActiveMeasurementControls = () => {
  const { toolState, setToolState, setTool } = useToolContext();

  const { commitObject } = usePermObjectContext();

  if (toolState.name === "select") return null;

  const { pointsStack, stackIndex, minPoints, name } = toolState;

  const handleSave = () => {
    commitObject(name, pointsStack[stackIndex]);
  };

  const handleClear = () => {
    setTool("select");
  };

  const handleUndo = () => {
    setToolState(
      produce((draft) => {
        if (draft.name === "select") return;
        draft.stackIndex -= 1;
      })
    );
  };

  const handleRedo = () => {
    setToolState(
      produce((draft) => {
        if (draft.name === "select") return;
        draft.stackIndex += 1;
      })
    );
  };

  return (
    <ControlsPaper variant="outlined">
      <Stack direction="row" p={1} gap={1}>
        <IconButton size="small" disabled={stackIndex < 0} onClick={handleUndo}>
          <UndoIcon />
        </IconButton>
        <IconButton
          size="small"
          disabled={stackIndex + 1 === pointsStack.length}
          onClick={handleRedo}
        >
          <RedoIcon />
        </IconButton>
        <IconButton
          size="small"
          disabled={
            stackIndex < 0 || pointsStack[stackIndex].length < minPoints
          }
          onClick={handleSave}
        >
          <SaveIcon />
        </IconButton>
        <IconButton size="small" onClick={handleClear}>
          <ClearIcon />
        </IconButton>
      </Stack>
    </ControlsPaper>
  );
};

const ControlsPaper = styled(Paper)({
  position: "absolute",
  top: 60,
  left: "50%",
  transform: "translate(-50%)",
  zIndex: 99,
});
