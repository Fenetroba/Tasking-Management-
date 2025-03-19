import React, { useState } from "react";
import "./style/registration.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loder from "../components/Loder";
import { signupUser } from "../store/userslice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const { loading } = useSelector((state) => state.Auth);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    password: "",
    email: "",
  });
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signupUser(form)).then((result) => {
      if (signupUser.fulfilled.match(result)) {
        // Handle successful signup
        toast.success("Successfully signed up");
        // Reset the form fields after successful submission
        setForm({ name: "", email: "", password: "" });
        navigate("/login");
      } else {
        // Extract and display the error message
        const errorMessage = result.payload?.error || "Signup failed. Please try again.";
        toast.error(errorMessage);
        setForm({ name: "", email: "", password: "" });
      }
    });
  };

  return (
    <div className="signup__top">
      <ToastContainer />
      <div className="signup_contener">
        <h3>Create An Account</h3>
        <form onSubmit={submitHandler} className="signUp_form">
          <label>Full Name</label>
          <input
            id="name"
            required
            type="text"
            placeholder="fenet roba"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            autocomplete="off"
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Fena@gmail.com"
            id="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autocomplete="off"
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="..........."
            id="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          
          <button className="Loedbtn" disabled={loading}>
            {loading ? <Loder /> : "Sign Up"}
          </button>
        </form>

        <div className="directLogiOrSign">
          {!loading && (
            <span>
              Already Have an Account? <Link to="/login">Login Here</Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;