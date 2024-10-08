import { Autocomplete, Chip, TextField } from "@mui/material";
import { FilterComponentProps } from "./types";
import { AutocompleteOption, PROJECT_STATES } from "@api/types";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export const StateFilter = ({ paramName }: FilterComponentProps) => {
  const { t } = useTranslation();

  const options: AutocompleteOption<string>[] = PROJECT_STATES.map((state) => ({
    label: t(`project.states.${state}`),
    value: state,
  }));

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (
    _: React.SyntheticEvent,
    selected: AutocompleteOption<string>[]
  ) => {
    setSearchParams((params) => {
      params.delete(paramName);
      selected.forEach(({ value }) => params.append(paramName, value));
      return params;
    });
  };

  const selected: AutocompleteOption<string>[] = searchParams
    .getAll(paramName)
    .filter(
      (value) => options.findIndex((option) => option.value === value) >= 0
    )
    .map(
      (value) =>
        options.find(
          (option) => option.value === value
        ) as AutocompleteOption<string>
    );

  return (
    <Autocomplete
      multiple
      options={options}
      value={selected}
      renderTags={(values, getTagProps) =>
        values.map(({ label }, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip
              variant="outlined"
              label={label}
              key={key}
              size="small"
              {...tagProps}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label={t(`dashboard.projects.filters.${paramName}`)}
        />
      )}
      onChange={handleChange}
      fullWidth
      limitTags={3}
    />
  );
};
