export type AutocompleteOption<T = number> = {
  /** Visible name */
  label: string;
  /** Form value */
  value: T;
  /** Make option unselectable */
  disabled?: boolean;
  /** Group the option is under */
  group?: string;
};

export type FallbackAutocompleteOption<T = number> = Omit<
  AutocompleteOption<T>,
  "label"
> & {
  label?: AutocompleteOption["label"];
};
