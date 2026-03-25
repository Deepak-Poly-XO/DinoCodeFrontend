import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CodeEditor from "../editor/CodeEditor";
import Nav from '../homeNavbar/Nav';
import { getToken } from '../auth/authServices';
import './Session.css';

function SessionPage() {
  const { id } = useParams();
  const [sessionName, setSessionName] = useState("");

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

  return (
    <div>
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