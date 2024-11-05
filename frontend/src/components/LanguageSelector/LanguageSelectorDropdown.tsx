import { useTranslation } from "react-i18next";

import { Menu, MenuItem } from "@mui/material";

import {
  LOCALES,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
} from "@utils/constants";

type Props = {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  handleLanguageChange: (newLanguage: SupportedLanguage) => void;
};

export const LanguageSelectorDropdown = ({
  open,
  onClose,
  anchorEl,
  handleLanguageChange,
}: Props) => {
  const { t } = useTranslation();

  const handleClick = (language: SupportedLanguage) => {
    handleLanguageChange(language);
  };

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      transformOrigin={{ horizontal: "center", vertical: "top" }}
      sx={{ marginTop: "5px" }}
    >
      {SUPPORTED_LANGUAGES.map((languageKey) => (
        <MenuItem key={languageKey} onClick={() => handleClick(languageKey)}>
          {`${t(`locale.${languageKey}`)} (${LOCALES[languageKey]})`}
        </MenuItem>
      ))}
    </Menu>
  );
};
