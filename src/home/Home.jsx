import Nav from '../homeNavbar/Nav'
import './Home.css'
import videoBg from "../assets/video.mp4";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Nav />
      <div className="container">
        <video autoPlay loop muted playsInline>
          <source src={videoBg} type="video/mp4" />
        </video>

        <div className="overlay" />

        <div className="hero">
          <div className="hero-tag">
            <span className="dot" />
            real-time collaboration
          </div>

          <h1 className="hero-title">
            DINO<span className="accent">CODE</span>
          </h1>

          <p className="hero-sub">
            Evolve. Collaborate. Innovate.
          </p>

          <div className="hero-code">
            <span className="code-line">
              <span className="code-keyword">const</span>
              <span className="code-var"> session</span>
              <span className="code-op"> = </span>
              <span className="code-fn">createSession</span>
              <span className="code-bracket">(</span>
              <span className="code-string">&quot;your-team&quot;</span>
              <span className="code-bracket">)</span>
              <span className="cursor">_</span>
            </span>
          </div>

          <div className="hero-actions">
            <Link to="/register" className="btn-primary">Get Started</Link>
            <Link to="/docs" className="btn-ghost">Documentation</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;