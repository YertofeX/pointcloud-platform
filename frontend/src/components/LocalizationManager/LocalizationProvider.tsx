import { PropsWithChildren, useState } from "react";
import { I18nextProvider } from "react-i18next";

import { LocalizationProvider as MUILocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { changeDayjsLocale } from "@lib/dayjs";
import { changeI18nLanguage, i18n } from "@lib/i18n";

import { LocalizationContext } from "./LocalizationContext";
import { SupportedLanguage } from "@utils/constants";

export const LocalizationProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");

  const setLanguage = (newLanguage: SupportedLanguage) => {
    changeI18nLanguage(newLanguage);
    changeDayjsLocale(newLanguage);
    setLanguageState(newLanguage);
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage }}>
      <I18nextProvider i18n={i18n}>
        <MUILocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={language}
        >
          {children}
        </MUILocalizationProvider>
      </I18nextProvider>
    </LocalizationContext.Provider>
  );
};
