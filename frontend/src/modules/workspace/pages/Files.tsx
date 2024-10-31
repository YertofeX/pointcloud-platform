import { Paper } from "@mui/material";
import { useWorkspaceContext } from "../components/WorkspaceContext/WorkspaceContext";
import { useCreatePointcloud } from "@api/hooks";
import { ChangeEvent } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { CloudUpload } from "@mui/icons-material";
import { VisuallyHiddenInput } from "@components/VisuallyHiddenInput";
import { useTranslation } from "react-i18next";

export const Files = () => {
  const { t } = useTranslation();

  const { project } = useWorkspaceContext();

  const { mutate: createPointCloud, isPending: isCreatePointCloudPending } =
    useCreatePointcloud();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    const file = event.target.files.item(0);
    if (file === null) return;
    createPointCloud({
      projectID: project.id,
      name: "new pointcloud",
      visible: true,
      raw: file,
    });
  };

  return (
    <Paper>
      <LoadingButton
        component="label"
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUpload />}
        loading={isCreatePointCloudPending}
      >
        {t("dashboard.profile.upload-image")}
        <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
      </LoadingButton>
    </Paper>
  );
};
