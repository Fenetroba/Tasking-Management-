import React from 'react'
import './style/login.css'
import { Link } from 'react-router-dom'
const LoginPage = () => {
  return (
    <div>
      <div className="form-box">
<form className="form">
    <span className="title">Login</span>
    <span className="subtitle">Login with your email.</span>
    <div className="form-container">
     
			<input type="email" className="input" placeholder="Email"/>
			<input type="password" className="input" placeholder="Password"/>
    </div>
    <button>Login</button>
</form>
<div className="form-section">
  <p>I am Not a Menber? <Link to="/sign_up">Sign Up</Link></p>
</div>
</div>
    </div>
  )
}

export default LoginPage