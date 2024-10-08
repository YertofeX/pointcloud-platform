import { useContext } from "react";

import { LocalizationContext } from "./LocalizationContext";

export const useLocalization = () => {
  const { language, setLanguage } = useContext(LocalizationContext);

  return { language, setLanguage };
};
