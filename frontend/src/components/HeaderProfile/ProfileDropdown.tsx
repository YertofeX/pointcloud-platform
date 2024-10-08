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

type Props = {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
};

export const ProfileDropdown = ({ open, onClose, anchorEl }: Props) => {
  const { t } = useTranslation();

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      sx={{ marginTop: 1 }}
    >
      <DropdownInfoContainer>
        <Avatar
          variant="rounded"
          sx={{ width: 64, height: 64 }}
          src="https://cataas.com/cat"
        />
        <Box>
          <Typography fontWeight="bold" gutterBottom>
            Test User
          </Typography>
          <ChipContainer>
            <Chip size="small" label="Admin" variant="outlined" />
            <Chip size="small" label="General User" variant="outlined" />
            <Chip
              size="small"
              label="Global Project Manager"
              variant="outlined"
            />
            <Chip
              size="small"
              label="Global Survey Manager"
              variant="outlined"
            />
          </ChipContainer>
        </Box>
      </DropdownInfoContainer>
      <MenuItem>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText>{t("header.profile.profile")}</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText>{t("header.profile.settings")}</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem>
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