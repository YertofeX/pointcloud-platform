import { DarkModeSwitch } from "@components/DarkModeSwitch";
import { HeaderProfile } from "@components/HeaderProfile";
import { Link, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const Header = () => {
  return (
    <Stack direction="row" component={Paper} py={1} px={2}>
      <Stack direction="row" flexGrow={1} alignItems="center" gap={2}>
        <Link
          component={RouterLink}
          to="/dashboard"
          color="inherit"
          underline="none"
        >
          <Typography variant="h1" fontSize={24} fontWeight="bold" mt={0.2}>
            Pointcloud Platform
          </Typography>
        </Link>
      </Stack>
      <Stack direction="row" gap={2}>
        <DarkModeSwitch />
        <HeaderProfile />
      </Stack>
    </Stack>
  );
};
