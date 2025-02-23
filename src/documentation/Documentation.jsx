import React from "react";
import Nav from '../homeNavbar/Nav'
import './Documentation.css'

const Documentation = () => {
  return (
    <div>
      <Nav />
      <h1 style={{ textAlign: "center", color: "white" }}>Dino Code Documentation</h1>

      <div className="mainInfo">
      <section>
        <h2>-- Introduction</h2>
        <p>
          **Dino Code** is a real-time code collaboration platform that allows multiple users to write and edit code
          together in live sessions. Whether you’re working on a team project, conducting an interview, or just
          brainstorming ideas, Dino Code ensures seamless collaboration.
        </p>
      </section>

      <section>
        <h2>-- Features</h2>
        <ul>
          <li> **Real-time Code Editing** - Multiple users can edit the same file simultaneously.</li>
          <li> **Multiple Sessions** - Users can create and join different coding sessions.</li>
          <li> **Syntax Highlighting** - Powered by **Monaco Editor** (used in VS Code).</li>
          <li> **WebSockets** - Ensures instant synchronization between all users in a session.</li>
          <li>**Live Execution** - Supports running JavaScript code directly inside the browser.</li>
          <li> **Secure Collaboration** - Sessions are identified with unique IDs for privacy.</li>
        </ul>
      </section>

      <section>
        <h2> How to Use</h2>
        <h3>1️. Creating a Session</h3>
        <p>Click on **"Create Session"** in the navigation bar. A new session ID will be generated.</p>

        <h3>2️.  Joining a Session</h3>
        <p>Click on **"Join Session"**, enter the session ID provided by your team, and start coding together.</p>

        <h3>3️.  Writing & Running Code</h3>
        <p>Write JavaScript code in the editor and click the **"Run Code"** button to see the output.</p>

        <h3>4️.  Exiting a Session</h3>
        <p>Simply close the browser or navigate to another page.</p>
      </section>

      <section>
        <h2> FAQs</h2>

        <h3>🔹 Do I need an account to use Dino Code?</h3>
        <p>No, you can create and join sessions without logging in.</p>

        <h3>🔹 What programming languages are supported?</h3>
        <p>Currently, **JavaScript** is supported. More languages will be added soon.</p>

        <h3>🔹 Can I invite my friends to a session?</h3>
        <p>Yes! Just share the session ID with your friends, and they can join instantly.</p>

        <h3>🔹 Is my code saved?</h3>
        <p>No, once you close the session, the code is lost. In the future, we may add auto-save functionality.</p>
      </section>

      <footer style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#ccc" }}>
        © 2025 Dino Code. All Rights Reserved.
      </footer>
    </div>
    </div>
  );
};

export default Documentation;
