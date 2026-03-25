import React from 'react';
import './App.css'
import Home from './home/Home';
import JoinSession from './home/JoinSession';
import CreateSession from './home/CreateSession';
import Documentation from './docs/Documentation';
import Login from './auth/Login';
import Register from './auth/Register';
import ProtectedRoute from './auth/ProtectedRoute';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SessionPage from "./pages/SessionPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/docs" element={<Documentation />}/>

        {/* Protected routes */}
        <Route path="/createsession" element={
          <ProtectedRoute>
            <CreateSession />
          </ProtectedRoute>
        }/>
        <Route path="/joinsession" element={
          <ProtectedRoute>
            <JoinSession />
          </ProtectedRoute>
        }/>
        <Route path="/session/:id" element={
          <ProtectedRoute>
            <SessionPage />
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  );
}

export default App