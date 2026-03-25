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
            Dino Code is a real-time code collaboration platform that allows multiple users to write and edit code
            together in live sessions. Whether you&apos;re working on a team project, conducting an interview, or just
            brainstorming ideas, Dino Code ensures seamless collaboration.
          </p>
        </section>

        <section>
          <h2>-- Features</h2>
          <ul>
            <li>Real-time Code Editing - Multiple users can edit the same file simultaneously.</li>
            <li>Multiple Sessions - Users can create and join different coding sessions.</li>
            <li>Syntax Highlighting - Powered by Monaco Editor (used in VS Code).</li>
            <li>WebSockets - Ensures instant synchronization between all users in a session.</li>
            <li>Live Execution - Supports running JavaScript code directly inside the browser.</li>
            <li>Secure Collaboration - Sessions are identified with unique IDs for privacy.</li>
            <li>User Authentication - Secure register and login with JWT tokens.</li>
            <li>Persistent Data - User accounts are saved in a real PostgreSQL database.</li>
          </ul>
        </section>

        <section>
          <h2>-- Getting Started</h2>

          <h3>1. Create an Account</h3>
          <p>
            Click Register in the navigation bar. Enter your email and password to create
            your DinoCode account. Your account is saved permanently.
          </p>

          <h3>2. Login</h3>
          <p>
            Already have an account? Click Login and enter your credentials.
            You will receive a secure JWT token that keeps you logged in.
          </p>

          <h3>3. Create a Session</h3>
          <p>
            Once logged in, click Sessions in the navigation bar and select Create Session.
            Enter a session name and a unique 6-character session ID will be generated for you.
          </p>

          <h3>4. Join a Session</h3>
          <p>
            Click Sessions and select Join Session. Enter the session ID shared by your
            teammate and you will instantly join their coding session.
          </p>

          <h3>5. Write and Run Code</h3>
          <p>
            Write JavaScript code in the Monaco Editor and click Run Code to execute it
            directly in the browser. Output appears below the editor in real time.
          </p>

          <h3>6. Logout</h3>
          <p>
            Click Logout in the navigation bar to securely end your session.
          </p>
        </section>

        <section>
          <h2>-- FAQs</h2>

          <h3>Do I need an account to use Dino Code?</h3>
          <p>
            Yes. Creating an account is free and only takes a few seconds.
            Authentication ensures your sessions are secure.
          </p>

          <h3>What programming languages are supported?</h3>
          <p>Currently JavaScript is supported. More languages will be added soon.</p>

          <h3>Can I invite my friends to a session?</h3>
          <p>Yes! Just share your session ID with anyone and they can join instantly.</p>

          <h3>Is my code saved?</h3>
          <p>
            Session code is not saved permanently yet. Once you close the session
            the code is lost. Auto-save functionality is planned for a future update.
          </p>

          <h3>Is my account data secure?</h3>
          <p>
            Yes. Passwords are hashed using BCrypt and never stored as plain text.
            Authentication uses industry standard JWT tokens.
          </p>
        </section>

        <footer style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#ccc" }}>
          &copy; 2025 Dino Code. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default Documentation;