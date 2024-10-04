import { createContext } from "react";

import { LocalizationContextType } from "./types";

export const LocalizationContext = createContext<LocalizationContextType>({
  language: "en",
  setLanguage: () => {},
});
