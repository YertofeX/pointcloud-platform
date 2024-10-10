import { ControllerProps, useController } from "react-hook-form";
import { FormHelperText, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

type Props = {
  control?: ControllerProps["control"];
  name?: string;
};

export const ControlledError = ({ control, name = "generalError" }: Props) => {
  const { t } = useTranslation();
  const {
    fieldState: { error },
  } = useController({ control, name });
  return (
    <FormHelperText error={!!error?.message} component="div">
      <Typography fontSize={14} gutterBottom>
        {error && error.message ? t(error.message as unknown as any) : "\u200b"}
      </Typography>
    </FormHelperText>
  );
};
