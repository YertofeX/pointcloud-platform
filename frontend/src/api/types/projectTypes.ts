import { User } from "./authTypes";

// Should contain all project states
export const PROJECT_STATES = [
  "active",
  "preparation",
  "pending",
  "archived",
] as const;
export type ProjectState = (typeof PROJECT_STATES)[number];

// Should contain all project types
export const PROJECT_TYPES = ["construction", "maintenance"] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export type Project = {
  id: string;
  name: string;
  description: string;
  favorite: boolean;
  state: ProjectState;
  type: ProjectType;
  owner: User;
  thumbnail: string;
  created: string;
  updated: string;
};

export type ProjectCreateParams = Omit<
  Project,
  "id" | "owner" | "thumbnail" | "created" | "updated"
> & {
  owner: string;
};

export type ProjectUpdateParams = Omit<
  Project,
  "owner" | "thumbnail" | "created" | "updated"
> & {
  owner: string;
};

export type ProjectListFilter = {
  name?: string;
  onlyFavorite?: boolean;
  states?: ProjectState[];
  types?: ProjectType[];
};

export type PointcloudData = {
  owner: User;
  project: Project;
  raw: string;
  potree: string;
};
