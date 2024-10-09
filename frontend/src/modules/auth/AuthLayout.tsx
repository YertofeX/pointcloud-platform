import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        variant="h1"
        fontSize={32}
        fontWeight="bold"
        p={2}
        color="textDisabled"
        align="center"
      >
        {t("header.title")}
      </Typography>
      <Outlet />
    </>
  );
};
