import { ControlledTextField } from "@components/ControlledForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { yup } from "@lib/yup";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Container,
  Paper,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { ObjectSchema } from "yup";

type FormParams = {
  email: string;
};

const schema: ObjectSchema<FormParams> = yup.object({
  email: yup.string().required().max(255),
});

export const ResetPassword = () => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<FormParams>({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = form;

  const onSubmit = (values: FormParams) => {};

  return (
    <Container component={Paper} maxWidth="xs" sx={{ p: 2 }}>
      <Typography variant="h2" fontSize={24} fontWeight="bold" mb={2}>
        {t("auth.reset-password.reset-password")}
      </Typography>
      <Link variant="body2" component={RouterLink} to="/login">
        {t("auth.reset-password.return-to-login")}
      </Link>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            name="email"
            label={t("auth.props.email")}
            maxLength={255}
            requiredStar
          />
          <LoadingButton
            type="submit"
            variant="contained"
            // loading={isLoginPending}
          >
            {t("auth.reset-password.reset-password")}
          </LoadingButton>
        </form>
      </FormProvider>
    </Container>
  );
};
