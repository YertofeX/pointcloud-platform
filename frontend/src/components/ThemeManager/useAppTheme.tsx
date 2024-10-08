import { useContext } from "react";

import { ThemeContext } from "./ThemeContext";

export const useAppTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return { theme, setTheme };
};
