import { DarkModeSwitch } from "@components/DarkModeSwitch";
import { HeaderProfile } from "@components/HeaderProfile";
import { Divider, Link, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { PageSelector } from "./PageSelector";
import { PointcloudPlatformLogoColor } from "@components/Icons/PointcloudPlatformLogoColor";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" component={Paper} py={1} px={2} height={64}>
      <Stack direction="row" flexGrow={1} alignItems="center" gap={2}>
        <Link
          component={RouterLink}
          to="/dashboard"
          color="inherit"
          underline="none"
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <PointcloudPlatformLogoColor sx={{ width: 42, height: 42 }} />
            <Typography
              variant="h1"
              fontSize={20}
              fontWeight="900"
              fontFamily="Red Hat Display Variable"
              flexWrap="wrap"
              width={110}
            >
              {t("title")}
            </Typography>
          </Stack>
        </Link>
        <Divider orientation="vertical" sx={{ borderRightWidth: 2 }} />
        <PageSelector />
      </Stack>
      <Stack direction="row" gap={2}>
        <DarkModeSwitch />
        <HeaderProfile />
      </Stack>
    </Stack>
  );
};
