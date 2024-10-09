import { useLogin } from "@api/hooks";
import { LoginParams } from "@api/types";
import { ControlledTextField } from "@components/ControlledForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { yup } from "@lib/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ObjectSchema } from "yup";
import { Link as RouterLink } from "react-router-dom";

type FormParams = LoginParams;

const schema: ObjectSchema<FormParams> = yup.object({
  name: yup.string().required().max(255),
  password: yup.string().required().max(255),
});

export const Login = () => {
  const { t } = useTranslation();

  const { mutate: login, isPending: isLoginPending } = useLogin();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<FormParams>({
    defaultValues: {
      name: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = form;

  const onSubmit = (values: FormParams) => {};

  return (
    <Container component={Paper} maxWidth="xs" sx={{ p: 2 }}>
      <Typography variant="h2" fontSize={24} fontWeight="bold" mb={2}>
        {t("auth.login.login")}
      </Typography>
      <Stack direction="row" gap={1}>
        <Typography variant="body2">
          {t("auth.login.dont-have-an-account")}
        </Typography>
        <Link variant="body2" component={RouterLink} to="/auth/register">
          {t("auth.register.register")}
        </Link>
      </Stack>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            name="name"
            label={t("auth.props.name")}
            maxLength={255}
            requiredStar
          />
          <ControlledTextField
            name="password"
            label={t("auth.props.password")}
            type={showPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseUp={(e) => e.preventDefault()}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            requiredStar
            maxLength={255}
          />
          <Stack mb={2}>
            <Link
              variant="body2"
              component={RouterLink}
              to="/auth/password-reset"
            >
              {t("auth.login.forgot-password")}
            </Link>
          </Stack>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoginPending}
          >
            {t("auth.login.login")}
          </LoadingButton>
        </form>
      </FormProvider>
    </Container>
  );
};
