export type AutocompleteOption<T = number> = {
  label: string;
  value: T;
};

export type FallbackAutocompleteOption<T = number> = {
  label?: string;
  value: T;
};
