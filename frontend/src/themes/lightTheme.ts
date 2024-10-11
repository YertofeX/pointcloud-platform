import { createTheme } from "@mui/material";
import { green, lightGreen } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: lightGreen[700],
    },
    secondary: {
      main: green[800],
    },
  },
  typography: {
    fontFamily: ["Inter Variable", "sans-serif"].join(","),
  },
});
