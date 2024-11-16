import {
  useGetAreaMeasurements,
  useGetDistanceMeasurements,
  useGetProject,
} from "@api/hooks";
import { LogoLoader } from "@components/LogoLoader";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { WorkspaceContextProvider } from "./components/WorkspaceContext/WorkspaceContextProvider";

export const WorkspaceModule = () => {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();

  const { data: project, error } = useGetProject({ projectID: id });

  // Fetch measurements so inner components have data to initialize state
  const { data: distanceMeasurements } = useGetDistanceMeasurements({
    projectID: id,
  });
  const { data: areaMeasurements } = useGetAreaMeasurements({ projectID: id });

  const measurements = [distanceMeasurements, areaMeasurements];

  if (!id) return <Navigate to="/dashboard/projects" />;

  if (error && (error as unknown as any).response.code === 404) {
    return <Navigate to="/404" replace />;
  }

  if (
    !project ||
    measurements.some(
      (measurement) => measurement === undefined || measurement === null
    )
  )
    return <LogoLoader loaderText={t("project.loading-project")} />;

  return (
    <WorkspaceContextProvider project={project}>
      <Outlet />
    </WorkspaceContextProvider>
  );
};
