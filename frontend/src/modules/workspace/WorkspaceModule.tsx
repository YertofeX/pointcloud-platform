import { useGetProject } from "@api/hooks";
import { LogoLoader } from "@components/LogoLoader";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { WorkspaceContextProvider } from "./components/WorkspaceContext/WorkspaceContextProvider";

export const WorkspaceModule = () => {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();

  const { data: project } = useGetProject({ projectID: id });

  if (!id) return <Navigate to="/dashboard/projects" />;

  if (!project) return <LogoLoader loaderText={t("project.loading-project")} />;

  return (
    <WorkspaceContextProvider project={project}>
      <Outlet />
    </WorkspaceContextProvider>
  );
};
