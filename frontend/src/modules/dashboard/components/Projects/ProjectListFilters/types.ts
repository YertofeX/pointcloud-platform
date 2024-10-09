export type FilterSearchParam = "name" | "starred" | "state" | "type";

export type FilterComponentProps = {
  paramName: FilterSearchParam;
};

export const FILTERS: { [key in FilterSearchParam]: FilterSearchParam } = {
  name: "name",
  starred: "starred",
  state: "state",
  type: "type",
} as const;
