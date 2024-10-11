import { useTranslation } from "react-i18next";

import {
  Logout as LogoutIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import { useGetUser, useLogout } from "@api/hooks";
import { pocketBase } from "@lib/pocketbase";
import { useSnackbar } from "@components/SnackbarManager";
import { Link } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
};

export const ProfileDropdown = ({ open, onClose, anchorEl }: Props) => {
  const { t } = useTranslation();

  const { openSnackbar } = useSnackbar();

  const { data: user } = useGetUser();

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    openSnackbar({
      message: t("auth.logout-successful"),
      severity: "success",
    });
  };

  if (!user) return null;

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      sx={{ mt: 1.5 }}
    >
      <DropdownInfoContainer>
        <Avatar
          variant="rounded"
          sx={{ width: 64, height: 64 }}
          src={pocketBase.getFileUrl(user, user.avatar, { thumb: "0x64" })}
        />
        <Box>
          <Typography fontWeight="bold" gutterBottom noWrap width={200}>
            {user.username}
          </Typography>
          <Typography color="textSecondary" variant="body2" noWrap width={200}>
            {user.email}
          </Typography>
        </Box>
      </DropdownInfoContainer>
      <MenuItem component={Link} to="/dashboard/profile" onClick={onClose}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText>{t("header.profile.profile")}</ListItemText>
      </MenuItem>
      <MenuItem component={Link} to="/dashboard/settings" onClick={onClose}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText>{t("header.profile.settings")}</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>{t("header.profile.logout")}</ListItemText>
      </MenuItem>
    </Menu>
  );
};

const DropdownInfoContainer = styled(Paper)({
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: "20px",
  padding: "10px",
  paddingRight: "20px",
  paddingLeft: "20px",
  margin: "10px",
  marginBottom: "20px",
  // width: "160px",
});

const ChipContainer = styled(Box)({
  width: "160px",
  display: "flex",
  flexWrap: "wrap",
  gap: "5px",
});
