import { AuthLayout } from "@modules/auth/AuthLayout";
import { Login } from "@modules/auth/pages/Login";
import { Register } from "@modules/auth/pages/Register";
import { ResetPassword } from "@modules/auth/pages/ResetPassword";
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
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "password-reset", element: <ResetPassword /> },
    ],
  },
]);
