import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import MonacoEditor from "@monaco-editor/react";
import { getToken } from "../auth/authServices";
import './CodeEditor.css';
import PropTypes from 'prop-types';

const CodeEditor = ({ onPresenceEvent }) => {
  const { id } = useParams();
  const [code, setCode] = useState("// loading...");
  const [output, setOutput] = useState("");
  const [saveStatus, setSaveStatus] = useState("saved");
  const debounceTimer = useRef(null);

  // Extract username from JWT
  const getUsername = () => {
    const token = getToken();
    if (!token) return "anonymous";
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const email = payload.sub || "";
      return email.split('@')[0];
    } catch {
      return "anonymous";
    }
  };

  const username = getUsername();
  const WS_URL = `${import.meta.env.VITE_WS_URL}/ws/${id}?user=${username}`;

  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    shouldReconnect: () => true,
  });

  // Load saved code when component mounts
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/sessions/${id}`, {
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.code) setCode(data.code);
      })
      .catch(err => console.error("Failed to load session code:", err));
  }, [id]);

  // Receive updates from other users
  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const parsed = JSON.parse(lastMessage.data);
        if (parsed.type === "CODE") {
          setCode(parsed.content);
        } else if (parsed.type === "JOIN" || parsed.type === "LEAVE") {
          if (onPresenceEvent) onPresenceEvent(parsed);
        }
      } catch {
        setCode(lastMessage.data);
      }
    }
  }, [lastMessage]);

  // Auto-save with debounce
  const saveCode = (newCode) => {
    setSaveStatus("unsaved");

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/sessions/${id}/code`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify({ code: newCode })
      })
        .then(() => setSaveStatus("saved"))
        .catch(() => setSaveStatus("error"));
    }, 3000);
  };

  const handleEditorChange = (newValue) => {
    setCode(newValue);
    if (readyState === ReadyState.OPEN) {
      sendMessage(newValue);
    }
    saveCode(newValue);
  };

  const runCode = () => {
    try {
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.join(" "));
        originalLog(...args);
      };
      new Function(code)();
      console.log = originalLog;
      setOutput(logs.join("\n") || "✓ Code executed successfully!");
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: { label: "● Connecting...", color: "#f0a500" },
    [ReadyState.OPEN]:       { label: "● Connected",     color: "#4caf50" },
    [ReadyState.CLOSING]:    { label: "● Closing...",    color: "#f0a500" },
    [ReadyState.CLOSED]:     { label: "● Disconnected — retrying...", color: "#f44336" },
    [ReadyState.UNINSTANTIATED]: { label: "● Not started", color: "#888" },
  }[readyState];

  const saveColor = {
    saved: "#4caf50",
    unsaved: "#f0a500",
    error: "#f44336"
  }[saveStatus];

  const saveLabel = {
    saved: "● saved",
    unsaved: "● saving...",
    error: "● save failed"
  }[saveStatus];

  return (
    <div className="editor">
      <div style={{
        padding: "4px 12px",
        fontSize: "12px",
        background: "#1a1a1a",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "4px"
      }}>
        <span style={{ color: connectionStatus.color }}>
          {connectionStatus.label}
        </span>
        <span style={{ color: saveColor }}>
          {saveLabel}
        </span>
      </div>

      {readyState !== ReadyState.OPEN && (
        <div style={{
          background: "#2a1a1a",
          color: "#f44336",
          padding: "8px 12px",
          fontSize: "13px",
          marginBottom: "4px"
        }}>
          Not connected — changes won&apost sync until reconnected.
        </div>
      )}

      <MonacoEditor
        className="monaco"
        height="75%"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
        }}
      />

      <button
        onClick={runCode}
        disabled={!code.trim()}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          background: "#2ea043",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px"
        }}
      >
        ▶ Run Code
      </button>

      <pre style={{
        background: "#0d0d0d",
        color: "#4caf50",
        padding: "12px",
        marginTop: "8px",
        minHeight: "50px",
        borderRadius: "4px",
        fontFamily: "monospace"
      }}>
        {output || "// Output will appear here"}
      </pre>
    </div>
  );
};

CodeEditor.propTypes = {
  onPresenceEvent: PropTypes.func
};
export default CodeEditor;