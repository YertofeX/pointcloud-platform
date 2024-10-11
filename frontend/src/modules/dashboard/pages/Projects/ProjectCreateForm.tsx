import { useCreateProject } from "@api/hooks";
import {
  FallbackAutocompleteOption,
  PROJECT_STATES,
  PROJECT_TYPES,
  ProjectState,
  ProjectType,
} from "@api/types";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";
import { yup } from "@lib/yup";
import { Container, IconButton, Paper, Stack, Typography } from "@mui/material";
import {
  ControlledAutocomplete,
  ControlledTextField,
} from "@components/ControlledForm";
import { Link, useNavigate } from "react-router-dom";
import { KeyboardArrowLeft } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "@components/SnackbarManager";

type FormParams = {
  name: string;
  description: string;
  state: FallbackAutocompleteOption<ProjectState>;
  type: FallbackAutocompleteOption<ProjectType>;
};

const schema: ObjectSchema<FormParams> = yup.object({
  name: yup.string().required().max(255),
  description: yup.string().required().max(1000),
  state: yup
    .object({
      label: yup.string(),
      value: yup.string().oneOf(PROJECT_STATES).required(),
    })
    .required(),
  type: yup
    .object({
      label: yup.string(),
      value: yup.string().oneOf(PROJECT_TYPES).required(),
    })
    .required(),
});

export const ProjectCreateForm = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { openSnackbar } = useSnackbar();

  const { mutateAsync: createProject, isPending: isCreateProjectPending } =
    useCreateProject();

  const defaultValues: FormParams = {
    name: "",
    description: "",
    state: { value: "preparation" },
    type: { value: "construction" },
  };

  const form = useForm<FormParams>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = form;

  const onSubmit = ({ name, description, state, type }: FormParams) => {
    createProject(
      {
        name,
        description,
        state: state.value,
        type: type.value,
      },
      {
        onSuccess: () => {
          openSnackbar({
            message: t("project.project-created-successfully"),
            severity: "success",
          });
          navigate("/dashboard/projects");
        },
      }
    );
  };

  return (
    <Container component={Paper} sx={{ py: 2, mt: 1 }} maxWidth="xs">
      <Stack direction="row" gap={2} alignItems="center" mb={2}>
        <IconButton
          title={t("project.back-to-projects")}
          component={Link}
          to="/dashboard/projects"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <Typography variant="h2" fontSize={24} fontWeight="bold">
          {t("project.create-new")}
        </Typography>
      </Stack>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            name="name"
            label={t("project.props.name")}
            maxLength={255}
            requiredStar
          />
          <ControlledTextField
            name="description"
            label={t("project.props.description")}
            maxLength={1000}
            requiredStar
            multiline
            rows={4}
          />
          <ControlledAutocomplete
            name="state"
            label={t("project.props.state")}
            options={PROJECT_STATES.map((state) => ({
              label: t(`project.states.${state}`),
              value: state,
            }))}
            requiredStar
            disableClearable
          />
          <ControlledAutocomplete
            name="type"
            label={t("project.props.type")}
            options={PROJECT_TYPES.map((type) => ({
              label: t(`project.types.${type}`),
              value: type,
            }))}
            requiredStar
            disableClearable
          />
          <LoadingButton
            variant="contained"
            type="submit"
            loading={isCreateProjectPending}
          >
            {t("common.button.create")}
          </LoadingButton>
        </form>
      </FormProvider>
    </Container>
  );
};
