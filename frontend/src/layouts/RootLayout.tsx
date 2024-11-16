import { useGetUser } from "@api/hooks";
import { useLocalization } from "@components/LocalizationManager";
import { pocketBase } from "@lib/pocketbase";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RootLayout = () => {
  const { data: user, error } = useGetUser();

  const { language, setLanguage } = useLocalization();

  useEffect(() => {
    if (user && user.language !== language) {
      setLanguage(user.language);
    }
  }, [user]);

  if (!pocketBase.authStore.isValid && error) {
    pocketBase.authStore.clear();
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
