import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from '../homeNavbar/Nav'
import './CreateSession.css';

const CreateSession =()=>{

  const [sessionName, setSessionName] = useState("");
  const navigate = useNavigate();

  const handleCreateSession = async () => {
    const response = await fetch(`https://dinocodebackend-1.onrender.com/sessions?name=${sessionName}`, {
      method: "POST",
    });
    const data = await response.json();
    navigate(`/session/${data.id}`);
  };


  return(

    <div>
      <Nav />
      <div className="main">
      <div className="createSes">
        <h3>Enter Session Name : </h3>
        <input
          type="text"
          placeholder="Enter Session Name"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
        />
        <button onClick={handleCreateSession}>Create Session</button>
        <p>--Unique session ID will be generated for each session--</p>
      </div>
      </div>
    </div>
  )
}

export default CreateSession;