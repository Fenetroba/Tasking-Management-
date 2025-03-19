import React, { useEffect, useState } from "react";
import "./style/login.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckAuths, loginUser } from "../store/userslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loder.jsx"; // Ensure the loader component is named correctly
import axiosInstance from "../lib/axios.js";

const LoginPage = () => {
  const { loading } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(CheckAuths());
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(login)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Successfully logged in");
      } else {
        toast.error(data.payload.message || "Login failed");
      }
      setLogin({ email: "", password: "" });
    });
  };


  return (
    <div className="login_top">
     
      <ToastContainer /> {/* Add ToastContainer here to show notifications */}
      <div className="login_container">
        <h2>Login Here</h2>
        <form onSubmit={submitHandler} className="login_form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Fenet@gmail.com"
            id="email"
            required
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            autocomplete="off"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="..........."
            id="password"
            required
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          <button className="Loedbtn" type="submit">
            {loading ? <Loader /> : "Login"}
          </button>
        </form>
        <div className="directLogiOrSign">
          {!loading && (
            <span>
              I Am Not A Member? <Link to="/sign_up">Sign Up</Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
