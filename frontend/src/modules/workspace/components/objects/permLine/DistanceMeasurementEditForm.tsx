import { useUpdateDistanceMeasurement } from "@api/hooks";
import { DistanceMeasurement } from "@api/types";
import { ControlledTextField } from "@components/ControlledForm";
import { ControlledColor } from "@components/ControlledForm/ControlledColor";
import { yupResolver } from "@hookform/resolvers/yup";
import { yup } from "@lib/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ObjectSchema } from "yup";
import { useWorkspaceContext } from "../../WorkspaceContext/WorkspaceContext";
import { useSnackbar } from "@components/SnackbarManager";
import { Button, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

type FormParams = { name: string; color: string };

const schema: ObjectSchema<FormParams> = yup.object({
  name: yup.string().required().max(255),
  color: yup.string().required(),
});

type Props = {
  measurement: DistanceMeasurement;
  onClose: () => void;
};

export const DistanceMeasurementEditForm = ({
  measurement,
  onClose,
}: Props) => {
  const { t } = useTranslation();

  const { openSnackbar } = useSnackbar();

  const {
    project: { id: projectID },
  } = useWorkspaceContext();

  const {
    mutate: updateDistanceMeasurement,
    isPending: isUpdateDistanceMeasurementPending,
  } = useUpdateDistanceMeasurement();

  const form = useForm<FormParams>({
    defaultValues: {
      name: measurement.name,
      color: measurement.color,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = form;

  const onSubmit = ({ name, color }: FormParams) => {
    updateDistanceMeasurement(
      {
        measurementID: measurement.id,
        projectID,
        name,
        color,
      },
      {
        onSuccess: () => {
          openSnackbar({
            message: t(
              "project.tools.distance-measurement-updated-successfully"
            ),
            severity: "success",
          });
        },
      }
    );
    onClose();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          name="name"
          label={t("project.props.name")}
          maxLength={255}
          requiredStar
        />
        <ControlledColor
          name="color"
          label={t("project.props.color")}
          requiredStar
        />
        <Stack direction="row" justifyContent="space-between">
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isUpdateDistanceMeasurementPending}
          >
            {t("common.button.modify")}
          </LoadingButton>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            {t("common.button.cancel")}
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};
