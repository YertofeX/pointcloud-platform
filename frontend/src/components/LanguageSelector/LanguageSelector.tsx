import { useState } from "react";

import { Translate as TranslateIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { SupportedLanguage } from "@lib/i18n";

import { useLocalization } from "@components/LocalizationManager";

import { LanguageSelectorDropdown } from "./LanguageSelectorDropdown";

export const LanguageSelector = () => {
  const { setLanguage } = useLocalization();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <TranslateIcon />
      </IconButton>
      <LanguageSelectorDropdown
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        handleLanguageChange={handleLanguageChange}
      />
    </>
  );
};
