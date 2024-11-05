import { useGetUser, useUpdateuser } from "@api/hooks";
import { AutocompleteOption } from "@api/types";
import { ControlledAutocomplete } from "@components/ControlledForm";
import { useLocalization } from "@components/LocalizationManager";
import { useSnackbar } from "@components/SnackbarManager";
import { yupResolver } from "@hookform/resolvers/yup";
import { yup } from "@lib/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { LOCALES, SupportedLanguage } from "@utils/constants";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ObjectSchema } from "yup";

type FormParams = {
  language: AutocompleteOption<SupportedLanguage>;
};

const schema: ObjectSchema<FormParams> = yup.object({
  language: yup
    .object({
      label: yup.string().required(),
      value: yup
        .string()
        .required()
        .oneOf(Object.keys(LOCALES) as SupportedLanguage[]),
    })
    .required(),
});

export const ProfileLanguageSelector = () => {
  const { t } = useTranslation();

  const { openSnackbar } = useSnackbar();

  const { setLanguage } = useLocalization();

  const { data: user } = useGetUser();

  const { mutate: updateUser, isPending: isUpdateUserPending } =
    useUpdateuser();

  const options: AutocompleteOption<SupportedLanguage>[] = Object.entries(
    LOCALES
  ).map(([key]) => ({
    label: `${t(`locale.${key as SupportedLanguage}`)} (${LOCALES[key as SupportedLanguage]})`,
    value: key as SupportedLanguage,
  }));

  const form = useForm<FormParams>({
    defaultValues: {
      language: !user
        ? { label: `${t(`locale.en`)} (${LOCALES.en})`, value: "en" }
        : {
            label: `${t(`locale.${user.language}`)} (${LOCALES[user.language]})`,
            value: user.language,
          },
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = form;

  const onSubmit = ({ language }: FormParams) => {
    updateUser(
      { language: language.value },
      {
        onSuccess: (response) => {
          openSnackbar({
            message: t("dashboard.profile.modifications-saved"),
            severity: "success",
          });
          setLanguage(response.language);
        },
      }
    );
  };

  if (!user) return null;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledAutocomplete
          name="language"
          label={t("dashboard.profile.language")}
          options={options}
        />
        <LoadingButton type="submit" loading={isUpdateUserPending}>
          {t("common.button.save")}
        </LoadingButton>
      </form>
    </FormProvider>
  );
};
