import { Navigate, RouteObject } from "react-router-dom";
import { projectRoutes } from "./projectRoutes";
import { ProjectsLayout } from "@modules/dashboard/layouts/ProjectsLayout";

export const dashboardRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="/dashboard/projects" replace />,
  },
  {
    path: "projects",
    element: <ProjectsLayout />,
    children: projectRoutes,
  },
  {
    path: "profile",
  },
  {
    path: "settings",
  },
];
