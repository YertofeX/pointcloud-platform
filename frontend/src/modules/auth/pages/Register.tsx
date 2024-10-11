import { useLogin, useRegister } from "@api/hooks";
import { RegisterParams } from "@api/types";
import {
  ControlledError,
  ControlledTextField,
} from "@components/ControlledForm";
import { useSnackbar } from "@components/SnackbarManager";
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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ObjectSchema } from "yup";

type FormParams = RegisterParams & { generalError?: string | null };

export const Register = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { openSnackbar } = useSnackbar();

  const { mutate: register, isPending: isRegisterPending } = useRegister();
  const { mutate: login, isPending: isLoginPending } = useLogin();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const schema: ObjectSchema<FormParams> = yup.object({
    username: yup.string().required().max(255),
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(255),
    passwordConfirm: yup
      .string()
      .required()
      .min(8)
      .max(255)
      .test((value, ctx) => {
        if (value !== ctx.parent.password) {
          return ctx.createError({ message: t("error.form.passwords_equal") });
        }
        return true;
      }),
    generalError: yup.string(),
  });

  const form = useForm<FormParams>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, setError } = form;

  const onSubmit = ({
    email,
    username,
    password,
    passwordConfirm,
  }: FormParams) => {
    register(
      {
        email,
        username,
        password,
        passwordConfirm,
      },
      {
        onSuccess: () => {
          openSnackbar({
            message: t("auth.register.registration-successful"),
            severity: "success",
          });
          login(
            {
              name: username,
              password: password,
            },
            {
              onSuccess: () => {
                navigate("/dashboard");
              },
              onError: () => {
                navigate("/login");
              },
            }
          );
        },
        onError: (error: any) => {
          setError("generalError", {
            message: t("auth.register.could-not-create-account"),
          });

          const emailError: string | undefined =
            error.response.data?.email?.code;
          if (emailError !== undefined) {
            setError("email", {
              message: t(`error.form.${emailError}` as unknown as any),
            });
          }

          const usernameError: string | undefined =
            error.response.data?.username?.code;
          if (usernameError !== undefined) {
            setError("username", {
              message: t(`error.form.${usernameError}` as unknown as any),
            });
          }
        },
      }
    );
  };

  return (
    <Container component={Paper} maxWidth="xs" sx={{ p: 2 }}>
      <Typography variant="h2" fontSize={24} fontWeight="bold" mb={2}>
        {t("auth.register.register")}
      </Typography>
      <Stack direction="row" gap={1}>
        <Typography variant="body2">
          {t("auth.register.already-have-an-account")}
        </Typography>
        <Link variant="body2" component={RouterLink} to="/login">
          {t("auth.login.login")}
        </Link>
      </Stack>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            name="email"
            label={t("auth.props.email")}
            maxLength={255}
            requiredStar
          />
          <ControlledTextField
            name="username"
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
            maxLength={255}
            requiredStar
          />
          <ControlledTextField
            name="passwordConfirm"
            label={t("auth.props.confirm-password")}
            type={showConfirmPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseUp={(e) => e.preventDefault()}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            maxLength={255}
            requiredStar
          />
          <ControlledError />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isRegisterPending || isLoginPending}
          >
            {t("auth.register.register")}
          </LoadingButton>
        </form>
      </FormProvider>
    </Container>
  );
};
