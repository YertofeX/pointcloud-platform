import { SupportedLanguage } from "@lib/i18n";

export type LocalizationContextType = {
  language: SupportedLanguage;
  setLanguage: (newLanguage: SupportedLanguage) => void;
};
