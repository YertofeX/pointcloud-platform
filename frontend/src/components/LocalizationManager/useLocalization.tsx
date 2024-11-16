import { useContext, useMemo } from "react";

import { LocalizationContext } from "./LocalizationContext";
import { SupportedLanguage } from "@utils/constants";

export const useLocalization = () => {
  const { language, setLanguage } = useContext(LocalizationContext);

  const getLocalizationByLanguage = (l: SupportedLanguage) => {
    switch (l) {
      case "en":
        return "en-IN";
      case "hu":
        return "hu-HU";
      case "jp":
        return "ja-JP";
      default:
        return "en-IN";
    }
  };

  const numberFormatter = useMemo<Intl.NumberFormat>(
    () => new Intl.NumberFormat(getLocalizationByLanguage(language)),
    [language]
  );

  return { language, setLanguage, numberFormatter };
};
