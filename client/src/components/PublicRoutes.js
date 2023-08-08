// eslint-disable-next-line
import React, { Children } from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoutes({ children }) {
  const token = localStorage.getItem("access_token");
  if (token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
