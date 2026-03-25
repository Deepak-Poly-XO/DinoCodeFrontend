import './Nav.css'
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from '../auth/authServices';

const Nav = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const createSession = async () => {
    navigate(`/createsession`);
  };

  const joinSession = () => {
    navigate(`/joinsession`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navContainer">
      <div className="logo">
        <Link to="/">DINO CODE</Link>
      </div>
      <div className="links">
        <a href="/docs">Documentation</a>

        <div className="dropdown">
          <a href="#" onClick={() => setShowDropdown(!showDropdown)}>Sessions</a>
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={createSession}>Create Session</button>
              <button onClick={joinSession}>Join Session</button>
            </div>
          )}
        </div>

        {isAuthenticated() ? (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Nav;