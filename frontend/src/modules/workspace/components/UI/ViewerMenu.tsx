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
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useWorkspaceContext } from "../WorkspaceContext/WorkspaceContext";

export const ViewerMenu = () => {
  const { t } = useTranslation();

  const { project } = useWorkspaceContext();

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
        <MenuItem component={Link} to={`/projects/${project.id}/settings`}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>{t("project.project-settings")}</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to={`/projects/${project.id}/files`}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText>{t("project.project-files")}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to="/dashboard/projects">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText>{t("project.back-to-projects")}</ListItemText>
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
