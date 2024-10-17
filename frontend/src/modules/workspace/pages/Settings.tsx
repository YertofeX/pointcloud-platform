import { useWorkspaceContext } from "../components/WorkspaceContext/WorkspaceContext";
import { ProjectEditForm } from "../components/ProjectEditForm";
import { WorkspaceMenu } from "../components/UI/WorkspaceMenu";
import { WorkspaceProfile } from "../components/UI/WorkspaceProfile";
import {
  Avatar,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { pocketBase } from "@lib/pocketbase";
import {
  CloudUpload as CloudUploadIcon,
  Construction as ConstructionIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useGetUser, useUpdateProjectThumbnail } from "@api/hooks";
import { ChangeEvent } from "react";
import { VisuallyHiddenInput } from "@components/VisuallyHiddenInput";

export const Settings = () => {
  const { t } = useTranslation();

  const { data: user } = useGetUser();

  const { project } = useWorkspaceContext();

  const {
    mutate: updateProjectThumbnail,
    isPending: isUpdateProjectThumbnailPending,
  } = useUpdateProjectThumbnail();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    if (event.target.files === null) return;
    const file = event.target.files.item(0);
    if (file === null) return;
    updateProjectThumbnail({ projectID: project.id, file });
  };

  if (!user) return null;

  return (
    <>
      <Stack direction="row" justifyContent="space-between" p={1.25}>
        <WorkspaceMenu />
        <WorkspaceProfile />
      </Stack>
      <Container component={Paper} sx={{ py: 2, mt: 1 }} maxWidth="xs">
        <Typography variant="h2" fontSize={24} fontWeight="bold" gutterBottom>
          {t("project.project-settings")}
        </Typography>

        <Stack gap={2} direction="row" alignItems="center" my={2}>
          <Avatar
            variant="rounded"
            sx={{ width: 128, height: 128 }}
            src={
              project.thumbnail !== ""
                ? pocketBase.getFileUrl(project, project.thumbnail, {
                    thumb: "0x128",
                  })
                : undefined
            }
          >
            <ConstructionIcon />
          </Avatar>
          <Stack gap={1}>
            <Stack gap={1} direction="row" alignItems="center">
              <EditIcon />
              <Typography>{t("project.change-thumbnail")}</Typography>
            </Stack>
            <LoadingButton
              component="label"
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              loading={isUpdateProjectThumbnailPending}
            >
              {t("dashboard.profile.upload-image")}
              <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
            </LoadingButton>
          </Stack>
        </Stack>

        <Divider />
        <ProjectEditForm project={project} />
      </Container>
    </>
  );
};
