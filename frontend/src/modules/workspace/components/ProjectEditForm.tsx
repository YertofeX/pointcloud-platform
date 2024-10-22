import { useUpdateProject } from "@api/hooks";
import {
  FallbackAutocompleteOption,
  Project,
  PROJECT_STATES,
  PROJECT_TYPES,
  ProjectState,
  ProjectType,
} from "@api/types";
import { useSnackbar } from "@components/SnackbarManager";
import { ObjectSchema } from "yup";
import { yup } from "@lib/yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import {
  ControlledTextField,
  ControlledAutocomplete,
} from "@components/ControlledForm";
import LoadingButton from "@mui/lab/LoadingButton";

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

type Props = { project: Project };

export const ProjectEditForm = ({ project }: Props) => {
  const { t } = useTranslation();

  const { openSnackbar } = useSnackbar();

  const { mutateAsync: updateProject, isPending: isUpdateProjectPending } =
    useUpdateProject();

  const defaultValues: FormParams = {
    name: project.name,
    description: project.description,
    state: { value: project.state },
    type: { value: project.type },
  };

  const form = useForm<FormParams>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = form;

  const onSubmit = ({ name, description, state, type }: FormParams) => {
    updateProject(
      {
        id: project.id,
        name,
        description,
        state: state.value,
        type: type.value,
        favorite: false,
      },
      {
        onSuccess: () => {
          openSnackbar({
            message: t("project.project-updated-successfully"),
            severity: "success",
          });
        },
      }
    );
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
          loading={isUpdateProjectPending}
        >
          {t("common.button.modify")}
        </LoadingButton>
      </form>
    </FormProvider>
  );
};
