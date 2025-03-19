import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./style/authLayer.css";
import { useDispatch } from "react-redux";
import { CheckAuths } from "../store/userslice";



const AuthLayer = () => {

  const dispatch=useDispatch()

useEffect(() => {
  dispatch(CheckAuths())
}, []);
  const [authButton, setAuthButton] = useState(false);
  const AuthButtonHandler = () => {
    setAuthButton((prev) => !prev);
  };
  return (
    <div className="AuthLayer">
      <button className="LoginButton" onClick={AuthButtonHandler}>
        Login Now
      </button>
    <div className="scrolle">
  
      <div className="box12"></div>
      <div className="box22"></div>
      <div className="box33"></div>
     
      
    </div>
      <div className="AuthLayerChildPage">
        {authButton ? <Outlet /> : <div className="BackButton"></div>}
      </div>
    </div>
  );
};

export default AuthLayer;
