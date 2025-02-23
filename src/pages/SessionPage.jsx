import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CodeEditor from "../editor/CodeEditor";
import Nav from '../homeNavbar/Nav';
import './Session.css';

function SessionPage() {
  const { id } = useParams();
  const [sessions, setSessions] = useState([]);
  const [sessionName, setSessionName] = useState("");

  useEffect(() => {
    fetch("https://dinocodebackend-1.onrender.com/sessions")
      .then((response) => response.json())
      .then((data) => {
        setSessions(data);
        // Find session by ID
        const foundSession = data.find((sessions) => sessions.id === id);
        if (foundSession) {
          setSessionName(foundSession.name);
        } else {
          setSessionName("Session Not Found");
        }
      })
      .catch((error) => console.error("Error fetching sessions:", error));
  }, [id]);

  return (
    <div >
      <Nav/>
      <div className="data">
        <p className="sesId">Session ID : {id}</p>
        <p className="sesName">Session Name : {sessionName}</p>
      </div>
      <CodeEditor/>
      <div className="copyright">
        <p>copyright@deepakpoly</p>
      </div>
    </div>
  );
}

export default SessionPage;