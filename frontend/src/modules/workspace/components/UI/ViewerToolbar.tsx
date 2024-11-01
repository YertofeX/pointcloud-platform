import { PointerIcon } from "@components/Icons/PointerIcon";
import {
  ToolName,
  useToolContext,
} from "@modules/workspace/contexts/ToolContext";
import { Polyline } from "@mui/icons-material";
import { IconButton, Paper, Stack, styled, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

export const ViewerToolbar = () => {
  const { t } = useTranslation();

  const toolOptions: { name: ToolName; icon: JSX.Element; title: string }[] = [
    {
      name: "select",
      icon: <PointerIcon />,
      title: t("project.tools.select-tooltip"),
    },
    {
      name: "distance-measure",
      icon: <Polyline />,
      title: t("project.tools.distance-tooltip"),
    },
    {
      name: "area-measure",
      icon: <Polyline />,
      title: t("project.tools.area-tooltip"),
    },
  ];

  const {
    toolState: { name: selectedTool },
    setTool,
  } = useToolContext();

  return (
    <ToolbarPaper variant="outlined">
      <Stack direction="row" gap={1} px={1}>
        {toolOptions.map(({ name, icon, title }) => (
          <Tooltip title={title} key={`tool-button-${name}`}>
            <IconButton
              color={selectedTool === name ? "primary" : "inherit"}
              onClick={() => setTool(name)}
            >
              {icon}
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
    </ToolbarPaper>
  );
};

const ToolbarPaper = styled(Paper)({
  position: "absolute",
  top: 10,
  left: "50%",
  transform: "translate(-50%)",
  zIndex: 99,
});
