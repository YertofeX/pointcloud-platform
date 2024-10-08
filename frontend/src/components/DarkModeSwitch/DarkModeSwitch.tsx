import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";
import { IconButton, Paper, Stack } from "@mui/material";

import { useAppTheme } from "@components/ThemeManager";

export const DarkModeSwitch = () => {
  const { theme, setTheme } = useAppTheme();

  const handleSwitchToLightMode = () => {
    if (theme === "lightTheme") return;
    setTheme("lightTheme");
  };

  const handleSwitchToDarkMode = () => {
    if (theme === "darkTheme") return;
    setTheme("darkTheme");
  };

  return (
    <Stack
      direction="row"
      component={Paper}
      gap={0.5}
      px={1}
      alignItems="center"
    >
      <IconButton
        onClick={handleSwitchToDarkMode}
        sx={{
          color: theme === "darkTheme" ? "text.primary" : "text.disabled",
        }}
        size="small"
      >
        <DarkModeIcon />
      </IconButton>
      <IconButton
        onClick={handleSwitchToLightMode}
        sx={{
          color: theme === "lightTheme" ? "text.primary" : "text.disabled",
        }}
        size="small"
      >
        <LightModeIcon />
      </IconButton>
    </Stack>
  );
};
