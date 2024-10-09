import { useRegister } from "@api/hooks";
import { RegisterParams } from "@api/types";
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

type FormParams = RegisterParams & { confirmPassword: string };

const schema: ObjectSchema<FormParams> = yup.object({
  name: yup.string().required().max(255),
  password: yup.string().required().max(255),
  confirmPassword: yup.string().required().max(255),
});

export const Register = () => {
  const { t } = useTranslation();

  const { mutate: register, isPending: isRegisterPending } = useRegister();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

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
        {t("auth.register.register")}
      </Typography>
      <Stack direction="row" gap={1}>
        <Typography variant="body2">
          {t("auth.register.already-have-an-account")}
        </Typography>
        <Link variant="body2" component={RouterLink} to="/auth/login">
          {t("auth.login.login")}
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
            maxLength={255}
            requiredStar
          />
          <ControlledTextField
            name="confirmPassword"
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
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isRegisterPending}
          >
            {t("auth.register.register")}
          </LoadingButton>
        </form>
      </FormProvider>
    </Container>
  );
};
