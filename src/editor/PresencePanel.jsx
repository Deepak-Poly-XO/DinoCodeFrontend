import { useEffect, useRef } from "react";
import './PresencePanel.css';
import PropTypes from 'prop-types';

const PresencePanel = ({ events }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [events]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="presence-panel">
      <div className="presence-header">
        <span className="presence-title">activity</span>
        <span className="presence-count">{events.length}</span>
      </div>

      <div className="presence-feed">
        {events.length === 0 && (
          <p className="presence-empty">waiting for others to join...</p>
        )}

        {events.map((event, index) => (
          <div key={index} className={`presence-event presence-${event.type.toLowerCase()}`}>
            <span className="presence-dot" />
            <div className="presence-content">
              <span className="presence-user">{event.user}</span>
              <span className="presence-action">
                {event.type === "JOIN" ? "joined" : "left"}
              </span>
            </div>
            <span className="presence-time">{formatTime(event.timestamp)}</span>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

PresencePanel.propTypes = {
  events: PropTypes.array.isRequired
};

export default PresencePanel;