
import './Nav.css';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const createSession = async () => {
    
    navigate(`/createsession`);
  };

  const joinSession = () => {

      navigate(`/joinsession`);

  };

  return (
    <div className="navContainer">
      <div className="logo">
      <a href="/">DINO CODE</a>
      </div>
      <div className="links">
        <a href="/docs">Documentation</a>

        {/* Sessions Dropdown */}
        <div className="dropdown">
          <a href="#" onClick={() => setShowDropdown(!showDropdown)}>Sessions</a>
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={createSession}>Create Session</button>
              <button onClick={joinSession}>Join Session</button>
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default Nav;


