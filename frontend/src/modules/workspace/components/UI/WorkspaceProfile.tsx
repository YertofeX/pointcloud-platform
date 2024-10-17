import { useGetUser } from "@api/hooks";
import { ProfileDropdown } from "@components/HeaderProfile/ProfileDropdown";
import styled from "@emotion/styled";
import { pocketBase } from "@lib/pocketbase";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { Avatar, Button, Paper } from "@mui/material";
import { useState } from "react";

export const WorkspaceProfile = () => {
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
    <>
      <Paper>
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
      </Paper>
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
