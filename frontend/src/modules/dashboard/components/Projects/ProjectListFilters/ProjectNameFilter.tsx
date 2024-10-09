import { IconButton, InputAdornment, TextField } from "@mui/material";
import { ChangeEventHandler } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterComponentProps } from "./types";
import { useTranslation } from "react-i18next";
import { Clear as ClearIcon, Search as SearchIcon } from "@mui/icons-material";

export const ProjectNameFilter = ({ paramName }: FilterComponentProps) => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(paramName);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchParams((params) => {
      if (!Boolean(e.target.value)) {
        params.delete(paramName);
      } else {
        params.set(paramName, e.target.value);
      }
      return params;
    });
  };

  const handleClear = () => {
    setSearchParams((params) => {
      params.delete(paramName);
      return params;
    });
  };

  return (
    <TextField
      label={t(`dashboard.projects.filters.${paramName}`)}
      value={searchParams.get(paramName) ?? ""}
      onChange={handleChange}
      size="small"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "text.disabled" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                sx={{ visibility: Boolean(value) ? "visible" : "hidden" }}
                size="small"
                edge="end"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      fullWidth
    />
  );
};
