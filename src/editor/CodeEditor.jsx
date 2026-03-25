import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import MonacoEditor from "@monaco-editor/react";
import './CodeEditor.css';

const CodeEditor = () => {
  const { id } = useParams();
  const WS_URL = `${import.meta.env.VITE_WS_URL}/ws/${id}`;
  const [code, setCode] = useState("// Start Coding...");
  const [output, setOutput] = useState("");

  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    shouldReconnect: () => true,
  });

  // Connection status label
  const connectionStatus = {
    [ReadyState.CONNECTING]: { label: "● Connecting...", color: "#f0a500" },
    [ReadyState.OPEN]:       { label: "● Connected",     color: "#4caf50" },
    [ReadyState.CLOSING]:    { label: "● Closing...",    color: "#f0a500" },
    [ReadyState.CLOSED]:     { label: "● Disconnected — retrying...", color: "#f44336" },
    [ReadyState.UNINSTANTIATED]: { label: "● Not started", color: "#888" },
  }[readyState];

  // Receive updates from other users
  useEffect(() => {
    if (lastMessage !== null) {
      setCode(lastMessage.data);
    }
  }, [lastMessage]);

  const handleEditorChange = (newValue) => {
    setCode(newValue);
    if (readyState === ReadyState.OPEN) {
      sendMessage(newValue);
    }
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

  return (
    <div className="editor">

      {/* Connection status bar */}
      <div style={{
        padding: "4px 12px",
        fontSize: "12px",
        background: "#1a1a1a",
        color: connectionStatus.color,
        marginBottom: "4px"
      }}>
        {connectionStatus.label}
      </div>

      {/* Editor disabled overlay when not connected */}
      {readyState !== ReadyState.OPEN && (
        <div style={{
          background: "#2a1a1a",
          color: "#f44336",
          padding: "8px 12px",
          fontSize: "13px",
          marginBottom: "4px"
        }}>
          ⚠️ Not connected — changes won't sync until reconnected.
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

export default CodeEditor;
