import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from '../homeNavbar/Nav';
import { getToken } from '../auth/authServices';
import './MySessions.css';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/sessions/my`, {
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setSessions(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load sessions.");
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getCodePreview = (code) => {
    if (!code) return "// no code yet";
    const firstLine = code.split('\n')[0];
    return firstLine.length > 40 ? firstLine.slice(0, 40) + "..." : firstLine;
  };

  return (
    <div className="mysessions-root">
      <Nav />

      <div className="mysessions-container">
        <div className="mysessions-header">
          <div>
            <h1 className="mysessions-title">my sessions</h1>
            <p className="mysessions-sub">
              {sessions.length} session{sessions.length !== 1 ? "s" : ""} created
            </p>
          </div>
          <button
            className="mysessions-new"
            onClick={() => navigate("/createsession")}
          >
            + new session
          </button>
        </div>

        {loading && (
          <div className="mysessions-loading">
            <span className="mysessions-spinner" />
            loading sessions...
          </div>
        )}

        {error && (
          <p className="mysessions-error">{error}</p>
        )}

        {!loading && !error && sessions.length === 0 && (
          <div className="mysessions-empty">
            <p className="empty-title">no sessions yet</p>
            <p className="empty-sub">create your first session to start collaborating</p>
            <button
              className="mysessions-new"
              onClick={() => navigate("/createsession")}
            >
              + create session
            </button>
          </div>
        )}

        <div className="mysessions-grid">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="session-card"
              onClick={() => navigate(`/session/${session.id}`)}
            >
              <div className="session-card-top">
                <span className="session-card-name">{session.name}</span>
                <span className="session-card-id">{session.id}</span>
              </div>

              <pre className="session-card-preview">
                {getCodePreview(session.code)}
              </pre>

              <div className="session-card-bottom">
                <span className="session-card-date">
                  created {formatDate(session.createdAt)}
                </span>
                {session.updatedAt && (
                  <span className="session-card-saved">
                    saved {formatDate(session.updatedAt)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MySessions;