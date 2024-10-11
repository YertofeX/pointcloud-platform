import { Navigate, RouteObject } from "react-router-dom";
import { Login } from "@modules/auth/pages/Login";
import { Register } from "@modules/auth/pages/Register";

export const authRoutes: RouteObject[] = [
  { index: true, element: <Navigate to="/login" replace /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
];
