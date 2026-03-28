import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from '../homeNavbar/Nav';
import './JoinSession.css';
import { getToken } from '../auth/authServices';

const JoinSession = () => {
  const [sessionId, setSessionId] = useState("");
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/sessions`, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
      .then(res => res.json())
      .then(data => {
        setSessions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleJoinSession = () => {
    if (!sessionId.trim()) {
      setError("Please enter a session ID.");
      return;
    }
    const foundSession = sessions.find(s => s.id === sessionId.toUpperCase().trim());
    if (foundSession) {
      navigate(`/session/${foundSession.id}`);
    } else {
      setError("Session not found. Check the ID and try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleJoinSession();
  };

  return (
    <div className="js-root">
      <Nav />
      <div className="js-container">

        <div className="js-card">
          <div className="js-card-header">
            <span className="js-icon">⌘</span>
            <div>
              <h1 className="js-title">Join Session</h1>
              <p className="js-subtitle">Enter a session ID to collaborate</p>
            </div>
          </div>

          <div className="js-form">
            <label className="js-label">Session ID</label>
            <input
              type="text"
              className="js-input"
              placeholder="e.g. AB1C2D"
              value={sessionId}
              onChange={(e) => {
                setSessionId(e.target.value.toUpperCase());
                setError("");
              }}
              onKeyDown={handleKeyDown}
              maxLength={6}
              autoFocus
            />

            {error && <p className="js-error">{error}</p>}

            <button
              className="js-btn"
              onClick={handleJoinSession}
              disabled={!sessionId.trim()}
            >
              <span className="js-btn-icon">→</span>
              Join Session
            </button>
          </div>

          <div className="js-stats">
            <div className="js-stat">
              <span className="js-stat-dot" />
              <span>
                {loading ? "Loading..." : `${sessions.length} active session${sessions.length !== 1 ? "s" : ""}`}
              </span>
            </div>
            <button
              className="js-create-link"
              onClick={() => navigate('/createsession')}
            >
              Create a new one →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JoinSession;