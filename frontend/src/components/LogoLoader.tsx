import { CircularProgress, Stack, Typography } from "@mui/material";
import { PointcloudPlatformLogoColor } from "./Icons/PointcloudPlatformLogoColor";
import { useTranslation } from "react-i18next";

type Props = {
  loaderText?: string | JSX.Element;
};

export const LogoLoader = ({ loaderText }: Props) => {
  const { t } = useTranslation();

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
      <Stack alignItems="center" gap={2}>
        {loaderText !== undefined &&
          (typeof loaderText === "string" ? (
            <Typography fontSize={22} color="textDisabled">
              {loaderText}
            </Typography>
          ) : (
            loaderText
          ))}
        <CircularProgress size={32} sx={{ color: "text.disabled" }} />
      </Stack>
    </Stack>
  );
};
