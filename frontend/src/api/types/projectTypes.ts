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
  state: ProjectState;
  type: ProjectType;
  owner: User;
};

export type ProjectCreateParams = Omit<Project, "id" | "owner"> & {
  owner: string;
};

export type ProjectUpdateParams = Omit<Project, "owner"> & {
  owner: string;
};
