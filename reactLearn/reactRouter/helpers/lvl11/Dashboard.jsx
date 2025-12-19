import React from "react";
import { Outlet, useRouteLoaderData } from "react-router-dom";

const DashboardLayout = () => {
  const { user } = useRouteLoaderData();
  return <Outlet />;
};
