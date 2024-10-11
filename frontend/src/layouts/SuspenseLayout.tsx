import { useGetUser } from "@api/hooks";
import { PointcloudPlatformLogoColor } from "@components/Icons/PointcloudPlatformLogoColor";
import { pocketBase } from "@lib/pocketbase";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

export const SuspenseLayout = () => {
  const { t } = useTranslation();

  const { isPending: isUserPending } = useGetUser({
    disabled: !pocketBase.authStore.isValid,
  });

  if (pocketBase.authStore.isValid && isUserPending)
    return (
      <Stack
        height="100vh"
        width="100vw"
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        <Stack direction="row" alignItems="center" gap={2} mb={1}>
          <PointcloudPlatformLogoColor
            sx={{ width: { xs: 66, md: 100 }, height: { xs: 66, md: 100 } }}
          />
          <Typography
            variant="h1"
            fontSize={{ xs: 32, md: 48 }}
            fontWeight="900"
            fontFamily="Red Hat Display Variable"
            flexWrap="wrap"
            width={{ xs: 170, md: 250 }}
          >
            {t("title")}
          </Typography>
        </Stack>
        <CircularProgress size={32} sx={{ color: "text.disabled" }} />
      </Stack>
    );
};
