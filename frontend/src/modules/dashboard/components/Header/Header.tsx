import { DarkModeSwitch } from "@components/DarkModeSwitch";
import { HeaderProfile } from "@components/HeaderProfile";
import { Paper, Stack, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Stack direction="row" component={Paper} elevation={3} py={1} px={2}>
      <Stack direction="row" flexGrow={1} alignItems="center" gap={2}>
        <Typography variant="h1" fontSize={24} fontWeight="bold">
          Pointcloud Platform
        </Typography>
      </Stack>
      <Stack direction="row" gap={2}>
        <DarkModeSwitch />
        <HeaderProfile />
      </Stack>
    </Stack>
  );
};
