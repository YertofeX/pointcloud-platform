import { SupportedLanguage } from "@utils/constants";

export type LocalizationContextType = {
  language: SupportedLanguage;
  setLanguage: (newLanguage: SupportedLanguage) => void;
};
