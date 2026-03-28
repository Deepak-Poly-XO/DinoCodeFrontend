import { useState } from "react";
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
          headers: { "Authorization": `Bearer ${getToken()}` }
        }
      );

      if (!response.ok) throw new Error("Failed to create session.");
      const data = await response.json();
      navigate(`/session/${data.id}`);

    } catch {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCreateSession();
  };

  return (
    <div className="cs-root">
      <Nav />
      <div className="cs-container">

        <div className="cs-card">
          <div className="cs-card-header">
            <span className="cs-icon">+</span>
            <div>
              <h1 className="cs-title">New Session</h1>
              <p className="cs-subtitle">Give your session a name to get started</p>
            </div>
          </div>

          <div className="cs-form">
            <label className="cs-label">Session name</label>
            <input
              type="text"
              className="cs-input"
              placeholder="e.g. team-project, interview, bugfix..."
              value={sessionName}
              onChange={(e) => {
                setSessionName(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              disabled={loading}
              autoFocus
            />

            {error && <p className="cs-error">{error}</p>}

            <button
              className="cs-btn"
              onClick={handleCreateSession}
              disabled={loading || !sessionName.trim()}
            >
              {loading ? (
                <>
                  <span className="cs-spinner" />
                  Creating...
                </>
              ) : (
                <>
                  <span className="cs-btn-icon">→</span>
                  Create Session
                </>
              )}
            </button>
          </div>

          <div className="cs-hint">
            <span className="cs-hint-dot" />
            A unique 6-character session ID will be generated
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateSession;