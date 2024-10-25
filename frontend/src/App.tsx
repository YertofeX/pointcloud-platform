import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@components/ThemeManager";
import { LocalizationProvider } from "@components/LocalizationManager";
import { queryClient } from "@lib/queryClient.ts";
import { SnackbarProvider } from "@components/SnackbarManager";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocalizationProvider>
          <SnackbarProvider>
            <>
              <RouterProvider router={router} />
              <ReactQueryDevtools />
            </>
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
