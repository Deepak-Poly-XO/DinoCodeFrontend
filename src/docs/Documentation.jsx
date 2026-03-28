import { useState } from 'react';
import Nav from '../homeNavbar/Nav'
import './Documentation.css'

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'features', label: 'Features' },
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'faqs', label: 'FAQs' },
];

const features = [
  { icon: '⚡', title: 'Real-time Editing', desc: 'Multiple users edit the same file simultaneously with instant sync.' },
  { icon: '🔐', title: 'JWT Authentication', desc: 'Secure register and login. Passwords hashed with BCrypt, never stored as plain text.' },
  { icon: '💾', title: 'Code Saving', desc: 'Your code auto-saves every 2 seconds after you stop typing. Rejoin anytime.' },
  { icon: '👥', title: 'Presence Panel', desc: 'See who joins and leaves your session in real time.' },
  { icon: '▶', title: 'Live Execution', desc: 'Run JavaScript directly in the browser. Output appears instantly below the editor.' },
  { icon: '📁', title: 'My Sessions', desc: 'All sessions tied to your account. Access your session history anytime.' },
];

const steps = [
  { n: '01', title: 'Create an Account', desc: 'Click Register in the nav. Enter your email and password. Your account is saved permanently to our PostgreSQL database.' },
  { n: '02', title: 'Login', desc: 'Enter your credentials. You will receive a secure JWT token that keeps you authenticated across requests.' },
  { n: '03', title: 'Create a Session', desc: 'Click Sessions → Create Session. Enter a name and a unique 6-character ID is generated for you.' },
  { n: '04', title: 'Invite Your Team', desc: 'Share the 6-character session ID with teammates. They click Join Session, enter the ID, and they are in.' },
  { n: '05', title: 'Write and Run Code', desc: 'Write JavaScript in the Monaco Editor. Click Run Code to execute it in the browser. Output appears below.' },
  { n: '06', title: 'Leave Safely', desc: 'Click the leave button in the session bar. Your code is already saved. Come back anytime from My Sessions.' },
];

const faqs = [
  { q: 'Do I need an account to use DinoCode?', a: 'Yes. Creating an account is free and takes seconds. Authentication ensures your sessions and code are private and tied to you.' },
  { q: 'What programming languages are supported?', a: 'Currently JavaScript is supported with full syntax highlighting via Monaco Editor — the same editor used in VS Code. More languages are planned.' },
  { q: 'Is my code saved automatically?', a: 'Yes. DinoCode auto-saves your code 2 seconds after you stop typing using a debounce system. You can leave and rejoin a session and your code will still be there.' },
  { q: 'Can I see my previous sessions?', a: 'Yes. Click My Sessions in the nav to see all sessions you have created, with code previews and timestamps.' },
  { q: 'Is my account data secure?', a: 'Yes. Passwords are hashed using BCrypt and never stored as plain text. Authentication uses JWT tokens signed with a secret key. No sensitive data is ever stored in the token payload.' },
  { q: 'What happens when I leave a session?', a: 'Your code is already saved automatically. Other users in the session will see a leave notification in the presence panel. Rejoin anytime using your session ID.' },
];

const Documentation = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [active, setActive] = useState('introduction');

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="docs-root">
      <Nav />
      <div className="docs-layout">

        {/* Sidebar */}
        <aside className="docs-sidebar">
          <p className="docs-sidebar-label">on this page</p>
          <nav className="docs-nav">
            {sections.map(s => (
              <button
                key={s.id}
                className={`docs-nav-item ${active === s.id ? 'active' : ''}`}
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div className="docs-sidebar-badge">
            <span className="docs-badge-dot" />
            <span>v2.0 — production</span>
          </div>
        </aside>

        {/* Main content */}
        <main className="docs-main">

          {/* Header */}
          <div className="docs-hero">
            <span className="docs-hero-tag">documentation</span>
            <h1 className="docs-hero-title">DinoCode</h1>
            <p className="docs-hero-sub">Real-time code collaboration for developers and teams.</p>
          </div>

          {/* Introduction */}
          <section id="introduction" className="docs-section">
            <h2 className="docs-section-title">Introduction</h2>
            <p className="docs-p">
              DinoCode is a real-time code collaboration platform — built for developers who want to
              write and edit code together without friction. Whether you are pair programming,
              conducting a technical interview, or working through a problem with your team,
              DinoCode keeps everyone in sync instantly.
            </p>
            <p className="docs-p">
              Every session gets a unique 6-character ID. Share it, and anyone can join. Your code
              auto-saves. Your sessions persist. No setup required beyond creating an account.
            </p>
            <div className="docs-callout">
              <span className="docs-callout-icon">🦕</span>
              <p>DinoCode was built by a developer who needed it. First semester team project inspiration, built properly three years later.</p>
            </div>
          </section>

          {/* Features */}
          <section id="features" className="docs-section">
            <h2 className="docs-section-title">Features</h2>
            <p className="docs-p">Everything DinoCode ships with out of the box.</p>
            <div className="docs-features-grid">
              {features.map((f, i) => (
                <div key={i} className="docs-feature-card">
                  <span className="docs-feature-icon">{f.icon}</span>
                  <h3 className="docs-feature-title">{f.title}</h3>
                  <p className="docs-feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Getting Started */}
          <section id="getting-started" className="docs-section">
            <h2 className="docs-section-title">Getting Started</h2>
            <p className="docs-p">From zero to collaborating in under a minute.</p>
            <div className="docs-steps">
              {steps.map((s, i) => (
                <div key={i} className="docs-step">
                  <div className="docs-step-number">{s.n}</div>
                  <div className="docs-step-content">
                    <h3 className="docs-step-title">{s.title}</h3>
                    <p className="docs-step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="docs-section">
            <h2 className="docs-section-title">FAQs</h2>
            <div className="docs-faqs">
              {faqs.map((f, i) => (
                <div key={i} className={`docs-faq ${openFaq === i ? 'open' : ''}`}>
                  <button
                    className="docs-faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{f.q}</span>
                    <span className="docs-faq-chevron">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <p className="docs-faq-a">{f.a}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="docs-footer">
            <span>DinoCode</span>
            <span className="docs-footer-dot">·</span>
            <span>Built with React &amp; Spring Boot</span>
            <span className="docs-footer-dot">·</span>
            <span>&copy; 2025</span>
          </footer>

        </main>
      </div>
    </div>
  );
};

export default Documentation;