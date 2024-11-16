import { ControllerProps, useController } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormGroup,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { MuiColorInput } from "mui-color-input";

type ControllerP = Pick<
  ControllerProps,
  "defaultValue" | "disabled" | "control"
>;
type ControllerPReq = Required<Pick<ControllerProps, "name">>;
type FormControlP = Pick<FormControlProps, "fullWidth">;
type FormControlLabelP = Pick<FormControlLabelProps, "label">;

type Props = FormControlP &
  FormControlLabelP &
  ControllerP &
  ControllerPReq & {
    requiredStar?: boolean;
  };

export const ControlledColor = ({
  name,
  label,
  control,
  disabled,
  defaultValue,
  requiredStar,
  fullWidth = true,
}: Props) => {
  const { t } = useTranslation();

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  return (
    <FormControl fullWidth={fullWidth} error={!!error}>
      <FormGroup>
        <FormControlLabel
          labelPlacement="start"
          disabled={disabled}
          control={
            <MuiColorInput
              format="hex"
              onChange={onChange}
              value={value}
              size="small"
            />
          }
          label={
            <>
              {label}
              {requiredStar && <Typography component="span">{" *"}</Typography>}
            </>
          }
          sx={{
            marginLeft: 0,
            justifyContent: "start",
            maxWidth: "max-content",
            gap: 4,
          }}
        />
        <FormHelperText>
          {
            error && error.message
              ? t(error.message as unknown as any)
              : "\u200B" /* Zero-width space fixes jumping on error change */
          }
        </FormHelperText>
      </FormGroup>
    </FormControl>
  );
};
