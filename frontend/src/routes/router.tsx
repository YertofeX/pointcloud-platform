import { AuthLayout } from "@layouts/AuthLayout";
import { SuspenseLayout } from "@layouts/SuspenseLayout";
import { WorkspaceLayout } from "@modules/workspace/WorkspaceLayout";
import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./authRoutes";
import { RootLayout } from "@layouts/RootLayout";
import { dashboardRoutes } from "./dashboardRoutes";
import { DashboardModule } from "@modules/dashboard/DashboardModule";
import { workspaceRoutes } from "./workspaceRoutes";
import { MissingPageLayout } from "@layouts/MissingPageLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SuspenseLayout />,
    children: [
      { path: "404", element: <MissingPageLayout /> },
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
            element: <WorkspaceLayout />,
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
