import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ user }) => {
  if (user && (user.role === "admin" || user.role === "main_admin")) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' />;
  }
};

export default PrivateRoutes;
