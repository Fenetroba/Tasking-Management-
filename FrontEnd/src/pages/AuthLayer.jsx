import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./style/authLayer.css";
const AuthLayer = () => {
  const [authButton, setAuthButton] = useState(false);
  const AuthButtonHandler = () => {
    setAuthButton(!authButton);
  };
  return (
    <div className="AuthLayer">
      <button className="LoginButton" onClick={AuthButtonHandler}>
        Login Now
      </button>
      <div className="AuthLayerChildPage">
        {authButton ? <Outlet /> : <div className="BackButton"></div>}
      </div>
    </div>
  );
};

export default AuthLayer;
