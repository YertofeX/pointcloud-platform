import { PropsWithChildren, useState } from "react";
import { SnackbarContext, SnackbarOptions } from "./SnackbarContext";
import { Alert, Snackbar } from "@mui/material";

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarOptions | null>(null);

  const openSnackbar = (options: SnackbarOptions) => {
    if (open) clearSnackbar();
    setTimeout(() => {
      setOpen(true);
      setSnackbar({ autoHideDuration: 5000, ...options });
    }, 400);
  };

  const clearSnackbar = () => {
    setOpen(false);
    setTimeout(() => {
      setSnackbar(null);
    }, 300);
  };

  return (
    <>
      <SnackbarContext.Provider value={{ openSnackbar }}>
        {children}
      </SnackbarContext.Provider>
      <Snackbar
        open={open}
        onClose={clearSnackbar}
        autoHideDuration={snackbar?.autoHideDuration}
      >
        <Alert
          variant={snackbar?.variant}
          severity={snackbar?.severity}
          onClose={clearSnackbar}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </>
  );
};
