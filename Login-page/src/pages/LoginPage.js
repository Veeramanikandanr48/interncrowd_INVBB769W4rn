import React, { useState } from 'react';
import { LoginApi } from '../services/Api';
import { storeUserData } from '../services/Storage';
import { isAuthenticated } from '../services/Auth';
import { Link, Navigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    custom_error: null
  };

  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = { ...initialStateErrors };
    let hasError = false;

    if (inputs.email === "") {
      newErrors.email.required = true;
      hasError = true;
    }
    if (inputs.password === "") {
      newErrors.password.required = true;
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);
      LoginApi(inputs)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          if (err.code === "ERR_BAD_REQUEST") {
            setErrors({ ...newErrors, custom_error: "Invalid Credentials." });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setErrors({ ...newErrors });
  };

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login Now</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${errors.email.required ? 'error' : ''}`}
              onChange={handleInput}
              name="email"
              id="email"
              placeholder="Email"
            />
            {errors.email.required && (
              <span className="error-message">Email is required.</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password.required ? 'error' : ''}`}
              onChange={handleInput}
              name="password"
              id="password"
              placeholder="Password"
            />
            {errors.password.required && (
              <span className="error-message">Password is required.</span>
            )}
          </div>
          <div className="form-group">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <span className="error-message">{errors.custom_error}</span>
            )}
            <div className = "d-flex flex-row justify-content-center">
            <button type="submit" className="btn btn-login" disabled={loading}>
              Login
            </button>
            </div>
          </div>
          <div className="form-group">
            <span className="create-account">
              Create a new account? Please <Link to="/register">Register</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
