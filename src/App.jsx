import React from 'react';
import './App.css'
import CodeEditor from './editor/CodeEditor';
import Nav from './homeNavbar/Nav';
import Home from './home/Home';
import JoinSession from './home/JoinSession';
import CreateSession from './home/CreateSession';
import Documentation from './documentation/Documentation';


import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import SessionPage from "./pages/SessionPage";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session/:id" element={<SessionPage />} />
        <Route path="/joinsession" element={<JoinSession />}/>
        <Route path="/createsession" element={<CreateSession />}/>
        <Route path="/docs" element={<Documentation />}/>
      </Routes>
    </Router>
    
);
}

export default App
