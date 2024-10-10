import { ProjectCreateForm } from "@modules/dashboard/pages/Projects/ProjectCreateForm";
import { ProjectList } from "@modules/dashboard/pages/Projects/ProjectList";
import { RouteObject } from "react-router-dom";

export const projectRoutes: RouteObject[] = [
  { index: true, element: <ProjectList /> },
  { path: "create", element: <ProjectCreateForm /> },
];
