import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { UserDetailsApi } from "../services/Api";
import { logout, isAuthenticated } from "../services/Auth";
import "../pages/Dadhboard.css";

function DashboardPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "", localId: "" });

  useEffect(() => {
    if (isAuthenticated()) {
      UserDetailsApi().then((response) => {
        setUser({
          name: response.data.users[0].displayName,
          email: response.data.users[0].email,
          localId: response.data.users[0].localId,
        });
      });
    }
  }, []);

  const logoutUser = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated()) {
    // Redirect user to the login page
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard-container text-center">
      <NavBar logoutUser={logoutUser} />

      <main role="main" className="dashboard-main">
        <div className="dashboard-content">
          <h3 className="dashboard-title">Dashboard Page</h3>
          {user.name && user.email && user.localId ? (
            <div className="user-details">
              <p className="user-name">Hi {user.name}!</p>
              <p className="user-email">Your email is {user.email}</p>
              <p className="user-id">Your Firebase ID is {user.localId}</p>
            </div>
          ) : (
            <p className="loading">Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
