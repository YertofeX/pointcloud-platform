import { Link, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
export const MissingPageLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
      gap={4}
    >
      <Typography fontWeight="bold" fontSize={24}>
        {t("not-found.page-not-found")}
      </Typography>
      <Link component={RouterLink} to="/dashboard">
        {t("not-found.go-back")}
      </Link>
    </Stack>
  );
};
