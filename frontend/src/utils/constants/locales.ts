export const SUPPORTED_LANGUAGES = ["en", "hu", "jp"] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]

export const LOCALES: {[key in SupportedLanguage] : string} = {
  en: "English",
  hu: "Hungarian",
  jp: "Japanese",
} as const;
