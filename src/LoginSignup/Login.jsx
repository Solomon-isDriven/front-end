// src/pages/Login.jsx
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./styles/Login.css";
import { assets } from "../assets/assets";
import { loginUser, registerUser } from "./action";




const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [registerValues, setRegisterValues] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    birthday: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const mode = query.get("mode");
  const isLogin = mode === "login";

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser(values);
      console.log("Login successful:", data);
      navigate("/Home");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Invalid credentials!");
    }
  };

 const handleSubmitRegister = async (event) => {
  event.preventDefault();
  const { confirmPassword, ...payload } = registerValues;

  if (registerValues.password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const data = await registerUser(payload);
    console.log("Register successful:", data);
    alert("Registered successfully!");
    navigate("/auth?mode=login");
  } catch (error) {
    console.error("Register failed:", error.response?.data || error.message);
    alert("Registration failed: " +
      (error.response?.data?.message ||
       JSON.stringify(error.response?.data?.errors) ||
       "Unknown error")
    );
  }
};

  return (
    <div className="auth-container">
      <img src="/cafet.png" alt="Background" className="bg" />

      {isLogin ? (
        <div className="auth-wrapper login-mode">
          <div className="auth-panel left yellow-bg">
            <img src="/ustpfoodlogos.png" alt="Logo" className="auth-logo" />
            <h2 className="auth-heading hello">Hello, Trailblazer!</h2>
            <p>Unlock the experience--sign up and start now!</p>
            <button className="auth-switch" onClick={() => navigate("/auth?mode=signup")}>Sign Up</button>
          </div>

          <div className="auth-panel right white-bg">
            <h2 className="auth-heading yellow-text">LOGIN</h2>
            <form onSubmit={handleSubmitLogin}>
              <div className="input-group row-input">
                <img src={assets.profile} alt="Profile" className="icon" />
                <input
                  type="text"
                  placeholder="Username"
                  onChange={e => setValues({ ...values, username: e.target.value })}
                />
              </div>
              <div className="input-group row-input">
                <img src={assets.key} alt="Key" className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={e => setValues({ ...values, password: e.target.value })}
                />
              </div>
              <div className="forgot-password">Forgot Password?</div>
              <button className="auth-submit" type="submit">Login</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="auth-wrapper signup-mode">
          <div className="auth-panel left white-bg">
            <h2 className="auth-heading yellow-text">SIGN UP</h2>
            <form onSubmit={handleSubmitRegister}>
              <div className="input-row">
                <div className="input-group">
                  <input type="text" placeholder="First Name"
                    onChange={e => setRegisterValues({ ...registerValues, firstName: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <input type="text" placeholder="Last Name"
                    onChange={e => setRegisterValues({ ...registerValues, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="input-group">
                <input type="text" placeholder="ID Number"
                  onChange={e => setRegisterValues({ ...registerValues, idNumber: e.target.value })}
                />
              </div>

              <div className="input-row">
                <div className="input-column">
                  <label className="label" htmlFor="birthday">Birthday</label>
                  <div className="input-group">
                    <input type="date" id="birthday"
                      onChange={e => setRegisterValues({ ...registerValues, birthday: e.target.value })}
                    />
                  </div>
                </div>

                <div className="input-column">
                  <label className="label" style={{ visibility: "hidden" }}>Gender</label>
                  <div className="input-group">
                    <select defaultValue=""
                      onChange={e => setRegisterValues({ ...registerValues, gender: e.target.value })}
                    >
                      <option value="" disabled>Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="input-group">
                <input type="email" placeholder="Email"
                  onChange={e => setRegisterValues({ ...registerValues, email: e.target.value })}
                />
              </div>

              <div className="input-group">
                <input type="password" placeholder="New Password"
                  onChange={e => setRegisterValues({ ...registerValues, password: e.target.value })}
                />
              </div>

              <div className="input-group">
                <input type="password" placeholder="Confirm Password"
                  onChange={e => setRegisterValues({ ...registerValues, confirmPassword: e.target.value })}
                />
              </div>

              <button className="auth-submit" type="submit">Sign Up</button>
            </form>
          </div>

          <div className="auth-panel right yellow-bg">
            <img src="/ustpfoodlogos.png" alt="Logo" className="auth-logo" />
            <h2 className="auth-heading">Welcome Back!</h2>
            <p>Stay in touch--log in and keep the connection alive!</p>
            <button className="auth-switch" onClick={() => navigate("/auth?mode=login")}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;