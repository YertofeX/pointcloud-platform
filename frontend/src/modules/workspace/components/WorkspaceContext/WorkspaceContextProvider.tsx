import { Project } from "@api/types";
import { PropsWithChildren, useMemo } from "react";
import { WorkspaceContext } from "./WorkspaceContext";

export type Props = {
  project: Project;
};

export const WorkspaceContextProvider = ({
  project: propProject,
  children,
}: PropsWithChildren<Props>) => {
  const project = useMemo(() => propProject, [propProject]);
  return (
    <WorkspaceContext.Provider value={{ project }}>
      {children}
    </WorkspaceContext.Provider>
  );
};
