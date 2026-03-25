import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from '../homeNavbar/Nav';
import './CreateSession.css';
import { getToken } from '../auth/authServices';

const CreateSession = () => {
  const [sessionName, setSessionName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateSession = async () => {
    // Guard: don't allow empty session name
    if (!sessionName.trim()) {
      setError("Please enter a session name.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/sessions?name=${sessionName}`,
          {
              method: "POST",
              headers: {
                  "Authorization": `Bearer ${getToken()}`
              }
          }
      );

      if (!response.ok) throw new Error("Failed to create session.");

      const data = await response.json();
      navigate(`/session/${data.id}`);

    } catch (err) {
      setError("Could not connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className="main">
        <div className="createSes">
          <h3>Enter Session Name:</h3>
          <input
            type="text"
            placeholder="Enter Session Name"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            disabled={loading}
          />
          <button onClick={handleCreateSession} disabled={loading}>
            {loading ? "Creating..." : "Create Session"}
          </button>
          {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
          <p>--Unique session ID will be generated for each session--</p>
        </div>
      </div>
    </div>
  );
};

export default CreateSession;