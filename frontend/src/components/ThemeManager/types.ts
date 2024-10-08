import { THEMES } from "@utils/constants";

export type ThemeName = keyof typeof THEMES;

export type ThemeContextType = {
  theme: ThemeName;
  setTheme: (newTheme: ThemeName) => void;
};
