import { useGetUser } from "@api/hooks";
import { LogoLoader } from "@components/LogoLoader";
import { pocketBase } from "@lib/pocketbase";
import { Outlet } from "react-router-dom";

export const SuspenseLayout = () => {
  const { isPending: isUserPending } = useGetUser({
    disabled: !pocketBase.authStore.isValid,
  });

  if (pocketBase.authStore.isValid && isUserPending) return <LogoLoader />;

  return <Outlet />;
};
