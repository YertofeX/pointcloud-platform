import { ProjectCreateForm } from "@modules/dashboard/components/Projects/ProjectCreateForm";
import { ProjectList } from "@modules/dashboard/components/Projects/ProjectList";
import { ProjectsLayout } from "@modules/dashboard/components/Projects/ProjectsLayout";
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
      {
        path: "projects",
        element: <ProjectsLayout />,
        children: [
          { index: true, element: <ProjectList /> },
          { path: "create", element: <ProjectCreateForm /> },
        ],
      },
    ],
  },
  { path: "workspace", element: <WorkspaceModule /> },
]);
