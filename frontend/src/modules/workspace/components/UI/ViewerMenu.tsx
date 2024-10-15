import {
  Dashboard as DashboardIcon,
  Folder as FolderIcon,
  Menu as MenuIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  styled,
} from "@mui/material";
import { useState } from "react";

export const ViewerMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ViewerMenuPaper>
        <IconButton onClick={handleOpen}>
          <MenuIcon />
        </IconButton>
      </ViewerMenuPaper>

      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        // anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ mt: 1.5 }}
      >
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>project settings todo</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText>project files todo</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText>back to projects todo</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

const ViewerMenuPaper = styled(Paper)({
  position: "absolute",
  top: 10,
  left: 10,
  zIndex: 99,
});
