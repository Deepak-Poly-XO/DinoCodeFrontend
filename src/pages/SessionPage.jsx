import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CodeEditor from "../editor/CodeEditor";
import PresencePanel from "../editor/PresencePanel";
import Nav from '../homeNavbar/Nav';
import { getToken } from '../auth/authServices';
import './Session.css';

function SessionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sessionName, setSessionName] = useState("");
  const [copied, setCopied] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [presenceEvents, setPresenceEvents] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/sessions`, {
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const foundSession = data.find((session) => session.id === id);
        if (foundSession) {
          setSessionName(foundSession.name);
        } else {
          setSessionName("Session Not Found");
        }
      })
      .catch((error) => console.error("Error fetching sessions:", error));
  }, [id]);

  const handlePresenceEvent = (event) => {
    setPresenceEvents(prev => [...prev, {
      ...event,
      timestamp: Date.now()
    }]);
  };

  const copyId = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="session-root">
      <Nav />

      <div className="session-bar">
        <div className="session-bar-left">
          <span className="session-live-dot" />
          <span className="session-label">session</span>
          <span className="session-name-text">{sessionName || "loading..."}</span>
        </div>

        <div className="session-bar-right">
          <span className="session-id-label">ID</span>
          <code className="session-id-code">{id}</code>
          <button className="copy-btn" onClick={copyId}>
            {copied ? "copied!" : "copy"}
          </button>
          <button className="leave-btn" onClick={() => setShowLeaveModal(true)}>
            ← leave
          </button>
        </div>
      </div>

      <div className="session-content">
        <CodeEditor onPresenceEvent={handlePresenceEvent} />
        <PresencePanel events={presenceEvents} />
      </div>

      <div className="session-footer">
        <span>dinocode</span>
        <span className="footer-dot">·</span>
        <span>real-time collaboration</span>
      </div>

      {showLeaveModal && (
        <div className="modal-overlay" onClick={() => setShowLeaveModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <p className="modal-title">leave session?</p>
            <p className="modal-sub">
              your code will not be saved. are you sure you want to leave{" "}
              <span className="modal-session-name">{sessionName}</span>?
            </p>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setShowLeaveModal(false)}>
                stay
              </button>
              <button className="modal-confirm" onClick={() => navigate("/")}>
                leave session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SessionPage;