import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import MonacoEditor from "@monaco-editor/react";
import './CodeEditor.css';



const CodeEditor = () => {
    const { id } = useParams();  // Get session ID from URL
    const WS_URL = `wss://dinocodebackend-1.onrender.com/ws/${id}`;
    const [code, setCode] = useState("// Start Coding...");
    const [output, setOutput] = useState("");

    // Connect to WebSocket specific to this session
    const { sendMessage, lastMessage } = useWebSocket(WS_URL, { shouldReconnect: () => true });

    // Handle editor changes
    const handleEditorChange = (newValue) => {
        setCode(newValue);
        sendMessage(newValue);  // Send updates to WebSocket
    };

    // Receive updates from WebSocket
    useEffect(() => {
        if (lastMessage !== null) {
            setCode(lastMessage.data);
        }
    }, [lastMessage]);

    // Function to execute JavaScript code
    const runCode = () => {
        try {
            const consoleLog = [];
            const originalConsoleLog = console.log;
            console.log = (...args) => {
                consoleLog.push(args.join(" "));
                originalConsoleLog(...args);
            };

            new Function(code)();  // Execute code

            console.log = originalConsoleLog;
            setOutput(consoleLog.join("\n") || "Code executed successfully!");
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    };

    return (
        <div className="editor">
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
                style={{ marginTop: "10px", padding: "8px", background: "green", color: "white", border: "none", cursor: "pointer" }}
            >
                Run Code
            </button>
            <pre style={{ background: "black", color: "lime", padding: "10px", marginTop: "10px", minHeight: "50px" }}>
                {output}
            </pre>
        </div>
    );
};

export default CodeEditor;
