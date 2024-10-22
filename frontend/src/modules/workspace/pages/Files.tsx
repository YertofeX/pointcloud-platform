import { Paper } from "@mui/material";
import { useWorkspaceContext } from "../components/WorkspaceContext/WorkspaceContext";
import { useUploadProjectPointcloud } from "@api/hooks";
import { ChangeEvent } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { CloudUpload } from "@mui/icons-material";
import { VisuallyHiddenInput } from "@components/VisuallyHiddenInput";
import { useTranslation } from "react-i18next";

export const Files = () => {
  const { t } = useTranslation();

  const { project } = useWorkspaceContext();

  const {
    mutate: uploadProjectPointcloud,
    isPending: isUploadProjectPointcloudPending,
  } = useUploadProjectPointcloud();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    const file = event.target.files.item(0);
    if (file === null) return;
    uploadProjectPointcloud({ projectID: project.id, raw: file });
  };

  return (
    <Paper>
      <LoadingButton
        component="label"
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUpload />}
        loading={isUploadProjectPointcloudPending}
      >
        {t("dashboard.profile.upload-image")}
        <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
      </LoadingButton>
    </Paper>
  );
};
