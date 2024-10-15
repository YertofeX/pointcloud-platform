import { useGetUser } from "@api/hooks";
import { pocketBase } from "@lib/pocketbase";
import { Avatar, Button, Paper, styled } from "@mui/material";
import { useState } from "react";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { ProfileDropdown } from "@components/HeaderProfile/ProfileDropdown";

export const ViewerProfile = () => {
  const { data: user } = useGetUser();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user) return null;

  return (
    <ViewerProfilePaper>
      <ProfileWrapper variant="text" onClick={handleClick} size="small">
        <Avatar
          variant="rounded"
          sx={{ width: 32, height: 32 }}
          src={pocketBase.getFileUrl(user, user.avatar, { thumb: "0x64" })}
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
    </ViewerProfilePaper>
  );
};

const ProfileWrapper = styled(Button)({
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "end",
  alignItems: "center",
  gap: 2,
});

const ViewerProfilePaper = styled(Paper)({
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 99,
});
