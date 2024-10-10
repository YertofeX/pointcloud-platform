import { useGetUser } from "@api/hooks";
import { pocketBase } from "@lib/pocketbase";
import { ThreeDRotation } from "@mui/icons-material";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
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
        <Typography
          variant="h1"
          fontSize={46}
          fontWeight="bold"
          color="textDisabled"
          gutterBottom
          textAlign="center"
        >
          {t("header.title")}
        </Typography>
        <Box sx={{ position: "relative" }}>
          <ThreeDRotation aria-label="save" color="primary" fontSize="large" />
          <CircularProgress
            size={48}
            color="primary"
            sx={{
              position: "absolute",
              top: -7,
              left: -6,
              zIndex: 1,
            }}
          />
        </Box>
        <Typography fontSize={20} fontWeight="bold" color="textDisabled">
          {t("common.loading")}
        </Typography>
      </Stack>
    );

  return <Outlet />;
};
