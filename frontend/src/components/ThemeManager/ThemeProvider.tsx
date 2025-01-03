import { PropsWithChildren, useState } from "react";

import { CssBaseline, ThemeProvider as MUIThemeProvider } from "@mui/material";

import { THEMES } from "@utils/constants";

import { ThemeContext } from "./ThemeContext";
import { ThemeName } from "./types";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setThemeState] = useState<ThemeName>("darkTheme");

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MUIThemeProvider theme={THEMES[theme]}>
        <>
          <CssBaseline enableColorScheme />
          {children}
        </>
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
