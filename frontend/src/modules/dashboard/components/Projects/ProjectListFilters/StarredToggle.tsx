import { useTranslation } from "react-i18next";
import { FilterComponentProps } from "./types";
import { useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Star, StarOutline } from "@mui/icons-material";

export const StarredToggle = ({ paramName }: FilterComponentProps) => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const value = Boolean(searchParams.get(paramName));

  const handleClick = () => {
    setSearchParams((params) => {
      if (params.has(paramName)) {
        params.delete(paramName);
      } else {
        params.set(paramName, "true");
      }
      return params;
    });
  };

  return (
    <Button
      startIcon={value ? <Star /> : <StarOutline />}
      onClick={handleClick}
      variant="outlined"
      fullWidth
    >
      {t("dashboard.projects.filters.starred")}
    </Button>
  );
};
