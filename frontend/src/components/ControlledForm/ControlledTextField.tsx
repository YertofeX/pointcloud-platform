import { ControllerProps, FieldValues, useController } from "react-hook-form";
import { TextField, TextFieldProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props<T extends FieldValues> = Pick<
  TextFieldProps,
  "variant" | "type" | "sx" | "fullWidth" | "multiline" | "rows" | "placeholder"
> &
  Required<Pick<TextFieldProps, "label">> &
  Pick<ControllerProps<T>, "control" | "defaultValue" | "rules" | "disabled"> &
  Required<Pick<ControllerProps<T>, "name">> & {
    maxLength?: number;
    requiredStar?: boolean;
  };

export const ControlledTextField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  variant = "outlined",
  disabled,
  defaultValue,
  rules,
  sx,
  type = "text",
  fullWidth = true,
  control,
  multiline,
  rows,
  maxLength,
  requiredStar,
}: Props<T>) => {
  const { t } = useTranslation();

  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    defaultValue,
    rules,
    control,
  });

  return (
    <TextField
      variant={variant}
      label={
        <>
          {label}
          {requiredStar && <Typography component="span">{" *"}</Typography>}
        </>
      }
      placeholder={placeholder}
      type={type}
      error={!!error}
      helperText={
        error && error.message
          ? t(error.message as unknown as any)
          : "\u200B" /* Zero-width space fixes jumping on error change */
      }
      disabled={disabled}
      margin="normal"
      size="small"
      sx={sx}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      slotProps={{ htmlInput: { maxLength } }}
    />
  );
};
