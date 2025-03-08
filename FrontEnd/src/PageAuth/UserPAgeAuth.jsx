import { useLocation, Navigate } from "react-router-dom";
import React from "react";

const UserPageAuth = ({ isAuth, children }) => { // Changed IsAuth to isAuth
  const location = useLocation();
  const login = "/login";
  const first = "/";
  const sign_up = "/sign_up";
  const dashboard = "user/dash_board";
  
  console.log(location.pathname);
  console.log(isAuth);

  if (!isAuth && !(location.pathname === login || location.pathname === sign_up)) {
    return <Navigate to={sign_up} />;
  }
  
  if (isAuth && (location.pathname === login || location.pathname === sign_up || location.pathname === first)) {
    return <Navigate to={dashboard} />;
  }

  return <div>{children}</div>; // Explicitly return the children
};

export default UserPageAuth;