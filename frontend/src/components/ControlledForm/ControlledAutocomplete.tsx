import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import {
  Autocomplete,
  CircularProgress,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { AutocompleteOption, FallbackAutocompleteOption } from "@api/types";

export const createAutocompleteOptions = <
  T extends Record<string, any>,
  K1 extends keyof T,
  K2 extends keyof T,
>({
  array,
  value,
  label,
}: {
  array: T[];
  value: K1;
  label: K2;
}): AutocompleteOption<K1>[] => {
  return array.reduce<AutocompleteOption<K1>[]>((options, arrayElement) => {
    if (arrayElement[value] && arrayElement[value]) {
      options.push({ value: arrayElement[value], label: arrayElement[label] });
    }
    return options;
  }, []);
};

type Props<T, O> = Pick<TextFieldProps, "variant" | "sx" | "fullWidth"> &
  Required<Pick<TextFieldProps, "label">> &
  Pick<
    UseControllerProps<T & FieldValues>,
    "defaultValue" | "rules" | "name" | "disabled" | "control"
  > & {
    /** List of options */
    options: AutocompleteOption<O>[];
    /** Group options by their `group` property */
    grouped?: boolean;
    /** Allow selecting multiple options */
    multiple?: boolean;
    /** User search callback. Called on text input.
     *
     * Used for asynchronous requests
     */
    onSearch?: (search: string) => void;
    /** Display a currently pending async operation */
    loading?: boolean;
    noErrors?: boolean;
    requiredStar?: boolean;
    disableClearable?: boolean;
  };

/** Helper function for having a fallback label in default data */
const transformValue = <T,>(
  inOption:
    | FallbackAutocompleteOption<T>
    | FallbackAutocompleteOption<T>[]
    | null,
  options: AutocompleteOption<T>[]
): any => {
  if (inOption === null || inOption === undefined) {
    return null;
  }
  if (Array.isArray(inOption)) {
    return inOption.map((val) => transformValue(val, options));
  }
  if (inOption.label === undefined) {
    const { value } = inOption;
    const option = options.find((opt) => opt.value === value);
    inOption = {
      ...inOption,
      label: option === undefined ? String(value) : option.label,
    };
  }
  return inOption;
};

export const ControlledAutocomplete = <T, O>({
  name,
  label,
  variant = "outlined",
  control,
  disabled,
  multiple = false,
  defaultValue,
  rules,
  sx,
  fullWidth = true,
  options,
  grouped,
  onSearch,
  loading,
  noErrors,
  requiredStar,
  disableClearable,
}: Props<T, O>) => {
  const { t } = useTranslation();
  const {
    field: { ref, value, onChange, ...field },
    fieldState: { error },
  } = useController({ name, control, defaultValue, rules });

  const truncatedOptions = options.map((option) => {
    return {
      ...option,
      group: option.group,
    };
  });

  const sortedOptions =
    grouped === true
      ? [...truncatedOptions].sort((a, b) =>
          b.group === undefined ? -1 : (a.group?.localeCompare(b.group) ?? 1)
        )
      : truncatedOptions;

  return (
    <Autocomplete
      id={`autocomplete-${name}`}
      getOptionKey={(option) => option.value}
      fullWidth={fullWidth}
      options={sortedOptions}
      groupBy={grouped === true ? (option) => option.group ?? "" : undefined}
      isOptionEqualToValue={(option, val) => option.value === val.value}
      noOptionsText={
        loading === true
          ? t("form.autocomplete.loading")
          : t("form.autocomplete.no-options")
      }
      disabled={disabled}
      multiple={multiple}
      onChange={(_, selected) => {
        onChange(selected);
      }}
      onInputChange={(ev, search) => {
        if (ev?.type === "change") {
          onSearch?.(search);
        } else {
          onSearch?.("");
        }
      }}
      value={transformValue(value, options)}
      getOptionDisabled={(option) => option.disabled ?? false}
      disableClearable={disableClearable}
      renderInput={(params) => (
        <TextField
          {...params}
          {...field}
          label={
            <>
              {label}
              {requiredStar && <Typography component="span">{" *"}</Typography>}
            </>
          }
          margin="normal"
          error={!!error}
          helperText={
            noErrors
              ? undefined
              : error && error.message
                ? t(error.message as unknown as any)
                : "\u200B" /* Zero-width space fixes jumping on error change */
          }
          variant={variant}
          size="small"
          sx={sx}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
};
