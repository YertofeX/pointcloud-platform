import { Projects } from "@modules/dashboard/components/Projects";
import { DashboardModule } from "@modules/dashboard/DashboardModule";
import { WorkspaceModule } from "@modules/workspace/WorkspaceModule";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard/projects" replace />,
  },
  {
    path: "dashboard",
    element: <DashboardModule />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/projects" replace />,
      },
      { path: "projects", element: <Projects /> },
    ],
  },
  { path: "workspace", element: <WorkspaceModule /> },
]);
