import React, { useState } from 'react';
import { RegisterApi } from '../services/Api';
import { isAuthenticated } from '../services/Auth';
import { storeUserData } from '../services/Storage';
import './Registerpage.css';
import { Link, Navigate } from 'react-router-dom';

export default function RegisterPage() {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;
    let newErrors = { ...initialStateErrors };

    if (inputs.name === '') {
      newErrors.name.required = true;
      hasError = true;
    }
    if (inputs.email === '') {
      newErrors.email.required = true;
      hasError = true;
    }
    if (inputs.password === '') {
      newErrors.password.required = true;
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);
      // Sending register API request
      RegisterApi(inputs)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          if (err.response.data.error.message === 'EMAIL_EXISTS') {
            setErrors({ ...newErrors, custom_error: 'Email is already registered!' });
          } else if (String(err.response.data.error.message).includes('WEAK_PASSWORD')) {
            setErrors({ ...newErrors, custom_error: 'Password should be at least 6 characters!' });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }

    setErrors(newErrors);
  };

  if (isAuthenticated()) {
    // Redirect user to dashboard
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Register Now</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name" className="input-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.name.required ? 'error' : ''}`}
              onChange={handleInput}
              name="name"
              id="name"
            />
            {errors.name.required && <span className="error-message">Name is required.</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="text"
              className={`form-control ${errors.email.required ? 'error' : ''}`}
              onChange={handleInput}
              name="email"
              id="email"
            />
            {errors.email.required && <span className="error-message">Email is required.</span>}
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
            />
            {errors.password.required && <span className="error-message">Password is required.</span>}
          </div>
          <div className="form-group">
            {errors.custom_error && <p className="text-danger">{errors.custom_error}</p>}
            {loading && (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            <div className = "d-flex flex-row justify-content-center">
            <input type="submit" className="btn btn-login" disabled={loading} value="Register" />
            </div>
          </div>
          <div className="form-group">
            Already have an account? Please <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
