import { useUpdatePointCloud } from "@api/hooks";
import { PointCloudData } from "@api/types";
import { ControlledTextField } from "@components/ControlledForm";
import { useSnackbar } from "@components/SnackbarManager";
import { yup } from "@lib/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ObjectSchema } from "yup";
import { useWorkspaceContext } from "../components/WorkspaceContext/WorkspaceContext";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

type FormParams = {
  name: string;
};

const schema: ObjectSchema<FormParams> = yup.object({
  name: yup.string().required().max(255),
});

type Props = {
  pointCloud: PointCloudData | null;
  open: boolean;
  onClose: () => void;
};

export const PointCloudEditForm = ({ open, pointCloud, onClose }: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>{t("project.files.edit-point-cloud")}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      {pointCloud && (
        <PointCloudEditFormInner pointCloud={pointCloud} onClose={onClose} />
      )}
    </Dialog>
  );
};

type InnerProps = {
  pointCloud: PointCloudData;
  onClose: () => void;
};

const PointCloudEditFormInner = ({ pointCloud, onClose }: InnerProps) => {
  const { t } = useTranslation();

  const { openSnackbar } = useSnackbar();

  const {
    project: { id: projectID },
  } = useWorkspaceContext();

  const { mutate: updatePointCloud, isPending: isUpdatePointCloudPending } =
    useUpdatePointCloud();

  const form = useForm<FormParams>({
    defaultValues: {
      name: pointCloud.name,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = form;

  const onSubmit = ({ name }: FormParams) => {
    updatePointCloud(
      { projectID, pointCloudID: pointCloud.id, name },
      {
        onSuccess: () => {
          openSnackbar({
            message: t("project.files.point-cloud-updated-successfully"),
            severity: "success",
          });
          onClose();
        },
      }
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <ControlledTextField
            name="name"
            label={t("project.props.name")}
            maxLength={255}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isUpdatePointCloudPending}
          >
            {t("common.button.modify")}
          </LoadingButton>
        </DialogActions>
      </form>
    </FormProvider>
  );
};
