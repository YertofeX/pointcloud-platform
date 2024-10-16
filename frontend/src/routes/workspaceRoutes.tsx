import { Files } from "@modules/workspace/pages/Files";
import { Settings } from "@modules/workspace/pages/Settings";
import { Viewer } from "@modules/workspace/pages/Viewer";

export const workspaceRoutes = [
  { index: true, element: <Viewer /> },
  { path: "settings", element: <Settings /> },
  { path: "files", element: <Files /> },
];
