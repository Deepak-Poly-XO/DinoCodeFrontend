import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from '../homeNavbar/Nav'
import './JoinSession.css';
import { getToken } from '../auth/authServices';

const JoinSession =()=>{

  const [sessionId, setSessionId] = useState("");
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/sessions`, {
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    })
    .then((response) => response.json())
    .then((data) => setSessions(data))
    .catch((error) => console.error("Error fetching sessions:", error));
  }, []);
  

  const handleJoinSession = () => {
    const foundSession = sessions.find((sessions) => sessions.id === sessionId);
    if(foundSession) {
      navigate(`/session/${sessionId}`);
    } else {
      alert("Please enter a valid Session ID.");
    }
  };

  return(

    <div>
      <Nav />
      <div className="main">
      <div className="promptCont">
        <h3>Enter Session ID : </h3>
        <input
          type="text"
          placeholder="Enter Session ID"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
        />
        <button onClick={handleJoinSession}>Join Session</button>
        <p>--Active Session : {sessions.length}--</p>
      </div>
      </div>
    </div>
  )
}

export default JoinSession;