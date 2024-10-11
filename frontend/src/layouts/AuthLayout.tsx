import { DarkModeSwitch } from "@components/DarkModeSwitch";
import { LanguageSelector } from "@components/LanguageSelector";
import { pocketBase } from "@lib/pocketbase";
import { Grid2, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  const { t } = useTranslation();

  if (pocketBase.authStore.isValid) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Grid2 container columns={{ xs: 2, md: 3 }} p={2}>
        <Grid2 size={{ xs: 0, md: 1 }} />
        <Grid2 size={1}>
          <Typography
            variant="h1"
            fontSize={32}
            fontWeight="bold"
            color="textDisabled"
            align="center"
          >
            {t("header.title")}
          </Typography>
        </Grid2>
        <Grid2 size={1}>
          <Stack direction="row" justifyContent="end" gap={2}>
            <DarkModeSwitch />
            <Paper elevation={3}>
              <LanguageSelector />
            </Paper>
          </Stack>
        </Grid2>
      </Grid2>
      <Outlet />
    </>
  );
};
