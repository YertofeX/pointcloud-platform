import {
  Dashboard as DashboardIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { Button, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

type DashboardSubRoute = "projects" | "profile" | "settings";
type DashboardRoute = `/dashboard/${DashboardSubRoute}`;

export const PageSelector = () => {
  const { t } = useTranslation();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const navigation: {
    path: DashboardRoute;
    name: string;
    icon: JSX.Element;
  }[] = [
    {
      path: "/dashboard/projects",
      name: t("project.projects"),
      icon: <DashboardIcon />,
    },
    {
      path: "/dashboard/profile",
      name: t("header.profile.profile"),
      icon: <PersonIcon />,
    },
    {
      path: "/dashboard/settings",
      name: t("header.profile.settings"),
      icon: <SettingsIcon />,
    },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const selectedIndex = navigation.findIndex((item) =>
    item.path.includes(pathname)
  );

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (index: number) => {
    if (index === selectedIndex) return;
    setAnchorEl(null);
    navigate(navigation[index].path);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        startIcon={navigation[selectedIndex].icon}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        onClick={handleButtonClick}
        fullWidth
        sx={{ width: 140 }}
      >
        {navigation[selectedIndex].name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ mt: 2 }}
      >
        {navigation.map(({ path, name, icon }, index) => (
          <MenuItem
            key={path.replace("/", "-")}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(index)}
            sx={{ width: 140 }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            {name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
