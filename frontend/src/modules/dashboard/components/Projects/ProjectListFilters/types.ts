export type FilterSearchParam = "projectName" | "starred" | "state" | "type";

export type FilterComponentProps = {
  paramName: FilterSearchParam;
};

export const FILTERS: { [key in FilterSearchParam]: FilterSearchParam } = {
  projectName: "projectName",
  starred: "starred",
  state: "state",
  type: "type",
} as const;
