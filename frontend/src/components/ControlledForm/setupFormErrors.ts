import { UseFormSetError } from "react-hook-form";

const arrayRegex = /^(.*)\.\d+$/;

export const setupFormErrors = (error: any, setError: UseFormSetError<any>) => {
  const globalError = error.response?.data.error || "";
  const responseErrors: Record<string, string[]> =
    error.response?.data.errors || {};

  if (globalError) {
    setError("_error", {
      message: globalError,
    });
  }

  Object.keys(responseErrors).forEach((key) => {
    const matches = arrayRegex.exec(key);
    const filteredKey = matches ? matches[1] : key;

    setError(filteredKey, {
      message: responseErrors[key][0],
    });
  });
};
