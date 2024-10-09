import { AlertProps, SnackbarProps } from "@mui/material";
import { createContext, useContext } from "react";

export type SnackbarOptions = {
  message: string;
} & Pick<AlertProps, "variant" | "severity"> &
  Pick<SnackbarProps, "autoHideDuration">;

export type SnackbarContextType = {
  openSnackbar: (options: SnackbarOptions) => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  openSnackbar: () => {},
});

export const useSnackbar = () => useContext(SnackbarContext);
