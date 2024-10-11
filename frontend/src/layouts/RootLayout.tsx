import { useGetUser } from "@api/hooks";
import { pocketBase } from "@lib/pocketbase";
import { Navigate, Outlet } from "react-router-dom";

export const RootLayout = () => {
  const { error } = useGetUser();

  if (!pocketBase.authStore.isValid && error) {
    pocketBase.authStore.clear();
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
