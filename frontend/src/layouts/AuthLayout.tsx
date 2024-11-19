import { DarkModeSwitch } from "@components/DarkModeSwitch";
import { LanguageSelector } from "@components/LanguageSelector";
import { pocketBase } from "@lib/pocketbase";
import { Paper, Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  if (pocketBase.authStore.isValid) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Stack direction="row" justifyContent="end" gap={2} p={2}>
        <DarkModeSwitch />
        <Paper elevation={3}>
          <LanguageSelector />
        </Paper>
      </Stack>
      <Outlet />
    </>
  );
};
