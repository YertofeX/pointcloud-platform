import { Box, Button, Menu, Stack } from "@mui/material";
import { ProjectNameFilter } from "./ProjectNameFilter";
import { FilterComponentProps, FILTERS, FilterSearchParam } from "./types";
import { StarredToggle } from "./StarredToggle";
import { StateFilter } from "./StateFilter";
import { TypeFilter } from "./TypeFilter";
import { useState } from "react";
import {
  FilterList as FilterListIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const filterComponents: {
  [key in FilterSearchParam]: React.ComponentType<FilterComponentProps>;
} = {
  projectName: ProjectNameFilter,
  starred: StarredToggle,
  state: StateFilter,
  type: TypeFilter,
};

export const ProjectListFilters = () => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <Button
          onClick={handleClick}
          size="large"
          startIcon={<FilterListIcon />}
          endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        >
          {t("dashboard.projects.filters.filter")}
        </Button>
      </Box>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Stack flexGrow={1} alignItems="end" gap={4} width={400} p={2}>
          {Object.entries(filterComponents).map(([key, Component]) => (
            <Component
              key={key}
              paramName={FILTERS[key as FilterSearchParam]}
            />
          ))}
        </Stack>
      </Menu>
    </>
  );
};
