import { initReactI18next } from "react-i18next";
import i18n from "i18next";

import enTranslations from "@locales/en/translation.json";
import huTranslations from "@locales/hu/translation.json";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@utils/constants/locales";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "en";
    // custom resources type
    resources: {
      en: typeof enTranslations;
      hu: typeof huTranslations;
    };
    // other
    returnNull: false;
  }
}

const resources = {
  en: { translation: enTranslations },
  hu: { translation: huTranslations },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  supportedLngs: SUPPORTED_LANGUAGES,
  debug: false,
  returnNull: false,
});

const changeI18nLanguage = (newLanguage: SupportedLanguage) => {
  i18n.changeLanguage(newLanguage);
};

export { changeI18nLanguage, i18n };
