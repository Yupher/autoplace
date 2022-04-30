import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { SET_ERROR } from "../actions/types/errorTypes";

const PrivateRoutes = ({ user }) => {
  if (user && (user.role === "admin" || user.role === "main_admin")) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' />;
  }
};

export default PrivateRoutes;
