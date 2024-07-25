import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const username = useSelector((state) => state.user.username);

  if (!username) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
