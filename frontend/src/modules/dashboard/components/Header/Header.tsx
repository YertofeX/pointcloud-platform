import { DarkModeSwitch } from "@components/DarkModeSwitch";
import { HeaderProfile } from "@components/HeaderProfile";
import { Divider, Link, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { PageSelector } from "./PageSelector";

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
          <Typography variant="h1" fontSize={24} fontWeight="bold" mt={0.4}>
            Pointcloud Platform
          </Typography>
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
