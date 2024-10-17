import {
  Dashboard as DashboardIcon,
  Folder as FolderIcon,
  Menu as MenuIcon,
  Settings as SettingsIcon,
  ViewInAr as ViewInArIcon,
} from "@mui/icons-material";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWorkspaceContext } from "../WorkspaceContext/WorkspaceContext";
import { Link } from "react-router-dom";

export const WorkspaceMenu = () => {
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
      <Paper>
        <IconButton onClick={handleOpen}>
          <MenuIcon />
        </IconButton>
      </Paper>

      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        sx={{ mt: 1.5 }}
      >
        <MenuItem component={Link} to={`/projects/${project.id}`}>
          <ListItemIcon>
            <ViewInArIcon />
          </ListItemIcon>
          <ListItemText>{t("project.project-viewer")}</ListItemText>
        </MenuItem>
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
