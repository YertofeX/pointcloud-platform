import { AuthLayout } from "@layouts/AuthLayout";
import { SuspenseLayout } from "@layouts/SuspenseLayout";
import { WorkspaceModule } from "@modules/workspace/WorkspaceModule";
import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./authRoutes";
import { RootLayout } from "@layouts/RootLayout";
import { dashboardRoutes } from "./dashboardRoutes";
import { DashboardModule } from "@modules/dashboard/DashboardModule";
import { workspaceRoutes } from "./workspaceRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SuspenseLayout />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: "dashboard",
            element: <DashboardModule />,
            children: dashboardRoutes,
          },
          {
            path: "projects/:id",
            element: <WorkspaceModule />,
            children: workspaceRoutes,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: authRoutes,
      },
    ],
  },
]);
