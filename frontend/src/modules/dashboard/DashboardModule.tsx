import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

export const DashboardModule = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
