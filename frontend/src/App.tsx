import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";

import "./main.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@components/ThemeManager/ThemeProvider.tsx";
import { LocalizationProvider } from "@components/LocalizationManager/LocalizationProvider.tsx";
import { queryClient } from "@lib/queryClient.ts";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocalizationProvider>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
