import { Project } from "@api/types";
import { createContext, useContext } from "react";

export type WorkspaceContextType = {
  project: Project;
};

export const WorkspaceContext = createContext<WorkspaceContextType>({
  project: {
    id: "",
    name: "",
    description: "",
    state: "preparation",
    type: "construction",
    favorite: false,
    owner: {
      id: "",
      username: "",
      email: "",
      emailVisibility: true,
      verified: true,
      avatar: "",
      created: "",
      updated: "",
      language: "en",
    },
    thumbnail: "",
    created: "",
    updated: "",
  },
});

export const useWorkspaceContext = () => useContext(WorkspaceContext);
