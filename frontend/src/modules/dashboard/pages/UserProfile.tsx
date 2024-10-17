import { useGetUser, useUpdateProfilePicture } from "@api/hooks";
import { LanguageSelector } from "@components/LanguageSelector";
import { VisuallyHiddenInput } from "@components/VisuallyHiddenInput";
import { pocketBase } from "@lib/pocketbase";
import {
  CloudUpload as CloudUploadIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Avatar,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

export const UserProfile = () => {
  const { t } = useTranslation();

  const { data: user } = useGetUser();

  const {
    mutate: updateProfilePicture,
    isPending: isUpdateProfilePicturePending,
  } = useUpdateProfilePicture();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    if (event.target.files === null) return;
    const file = event.target.files.item(0);
    if (file === null) return;
    updateProfilePicture({ userID: user.id, file });
  };

  if (!user) return null;

  return (
    <Container component={Paper} sx={{ mt: 1, p: 2 }} maxWidth="sm">
      <Typography variant="h2" fontSize={24} fontWeight="bold" gutterBottom>
        {t("dashboard.profile.profile")}
      </Typography>

      <Stack gap={2}>
        <Stack gap={2} direction="row" alignItems="center">
          <Avatar
            variant="rounded"
            sx={{ width: 128, height: 128 }}
            src={pocketBase.getFileUrl(user, user.avatar, { thumb: "0x128" })}
          />
          <Stack gap={1}>
            <Stack gap={1} direction="row" alignItems="center">
              <EditIcon />
              <Typography>
                {t("dashboard.profile.change-profile-picture")}
              </Typography>
            </Stack>
            <LoadingButton
              component="label"
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              loading={isUpdateProfilePicturePending}
            >
              {t("dashboard.profile.upload-image")}
              <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
            </LoadingButton>
          </Stack>
        </Stack>
        <Divider />
        <Stack gap={1}>
          <Stack direction="row" gap={1} alignItems="center">
            <PersonIcon />
            <Typography fontSize={20} fontWeight="bold">
              {user.username}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center">
            <EmailIcon />
            <Typography>{user.email}</Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack alignItems="center">
          <LanguageSelector />
        </Stack>
      </Stack>
    </Container>
  );
};
