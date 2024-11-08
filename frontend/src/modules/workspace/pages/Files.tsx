import { Container, Divider, Paper, Stack, Typography } from "@mui/material";
import { useWorkspaceContext } from "../components/WorkspaceContext/WorkspaceContext";
import { useCreatePointcloud, useGetPointClouds } from "@api/hooks";
import { ChangeEvent, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "@components/VisuallyHiddenInput";
import { useTranslation } from "react-i18next";
import { WorkspaceMenu } from "../components/UI/WorkspaceMenu";
import { WorkspaceProfile } from "../components/UI/WorkspaceProfile";
import { WorkspaceDataDisplay } from "../components/UI/WorkspaceDataDisplay";
import { PointCloudData } from "@api/types";
import { PointCloudEditForm } from "../Files/PointCloudEditForm";
import { FileItem } from "../Files/FileItem";

export const Files = () => {
  const { t } = useTranslation();

  const { project } = useWorkspaceContext();

  const { data: pointClouds } = useGetPointClouds({ projectID: project.id });

  const { mutate: createPointCloud, isPending: isCreatePointCloudPending } =
    useCreatePointcloud();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    const file = event.target.files.item(0);
    if (file === null) return;
    createPointCloud({
      projectID: project.id,
      name: file.name,
      visible: true,
      raw: file,
    });
  };

  const [editing, setEditing] = useState<{
    open: boolean;
    pointCloud: PointCloudData | null;
  }>({ open: false, pointCloud: null });

  return (
    <>
      <Stack direction="row" justifyContent="space-between" p={1.25}>
        <Stack direction="row" gap={1}>
          <WorkspaceMenu />
          <WorkspaceDataDisplay />
        </Stack>
        <WorkspaceProfile />
      </Stack>
      <Container
        component={Paper}
        sx={{ py: 2, mt: 1 }}
        maxWidth="md"
        variant="outlined"
      >
        <Typography variant="h2" fontSize={24} fontWeight="bold" gutterBottom>
          {t("project.project-files")}
        </Typography>
        <Divider sx={{ my: 2 }} />
        {pointClouds ? (
          <>
            <Paper sx={{ p: 1, mb: 1 }}>
              <Stack direction="row" alignItems="center">
                <Typography fontWeight="bold" flexGrow={1}>
                  {t("project.layers.pointclouds")}
                </Typography>
                <LoadingButton
                  component="label"
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  loading={isCreatePointCloudPending}
                >
                  {t("project.files.upload-point-cloud")}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileUpload}
                  />
                </LoadingButton>
              </Stack>
            </Paper>
            <Stack gap={1}>
              {pointClouds.map((pointCloud) => (
                <FileItem
                  key={pointCloud.id}
                  pointCloud={pointCloud}
                  onEditing={() => setEditing({ open: true, pointCloud })}
                />
              ))}
            </Stack>
          </>
        ) : (
          <Typography textAlign="center">
            {t("project.files.no-files-to-display")}
          </Typography>
        )}
      </Container>
      <PointCloudEditForm
        open={editing.open}
        pointCloud={editing.pointCloud}
        onClose={() =>
          setEditing((prev) => ({ open: false, pointCloud: prev.pointCloud }))
        }
      />
    </>
  );
};
