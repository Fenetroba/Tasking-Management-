import { useLocation, Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import UserLayer from "../pages/UserLayer";

const UserPageAuth = ({ isAuth, children }) => {
  const location = useLocation();
  const login = "/login";
  const first = "/";
  const signUp = "/sign_up";
  const dashboard = "/user/dash_board";
  const { user } = useSelector((state) => state.Auth);

  console.log(location.pathname);
  console.log(user);

  // If the user is not authenticated and trying to access a protected route
  if (!isAuth && !(location.pathname === login || location.pathname === signUp || location.pathname === first)) {
    console.log("Redirecting to login...");
    return <Navigate to={login} />;
  }

  // If the user is authenticated and trying to access login or sign-up page
  if (isAuth && (location.pathname === login || location.pathname === signUp || location.pathname === first)) {
    console.log("Redirecting to dashboard...");
    return <Navigate to={dashboard} />;
  }

  // If the user is authenticated, render UserLayer with user info
  if (isAuth) {
    return <UserLayer user={user}>{children}</UserLayer>;
  }

  // If none of the conditions are met, render the children
  return <div>{children}</div>;
};

export default UserPageAuth;