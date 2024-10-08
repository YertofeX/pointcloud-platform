import { useState } from "react";

import { Avatar, Button, styled } from "@mui/material";

import { ProfileDropdown } from "./ProfileDropdown";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";

export const HeaderProfile = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ProfileWrapper variant="text" onClick={handleClick}>
        <Avatar
          variant="rounded"
          sx={{ width: 32, height: 32 }}
          src="https://cataas.com/cat"
        />
        {anchorEl ? (
          <KeyboardArrowUpIcon
            sx={{ color: "text.secondary" }}
            fontSize="small"
          />
        ) : (
          <KeyboardArrowDownIcon
            sx={{ color: "text.secondary" }}
            fontSize="small"
          />
        )}
      </ProfileWrapper>
      <ProfileDropdown
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
      />
    </>
  );
};

const ProfileWrapper = styled(Button)({
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "end",
  alignItems: "center",
  gap: 2,
});
