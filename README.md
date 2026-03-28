# DinoCode — Frontend

React + Vite frontend for DinoCode, a real-time code collaboration platform.

**Live demo:** https://dino-code-frontend.vercel.app

---

## What it does

DinoCode lets multiple users write and edit code together in live sessions. Open the same session in two browser tabs and watch code sync instantly. Sessions are tied to user accounts and code saves automatically.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| Editor | Monaco Editor (VS Code's editor) |
| WebSockets | react-use-websocket |
| Auth | JWT stored in localStorage |
| Styling | CSS Modules (custom, no UI library) |
| Deployment | Vercel |

---

## Features

- Real-time code sync across all users in a session via WebSockets
- JWT authentication — register, login, protected routes
- Auto-save with debounce — code saved to database 2 seconds after you stop typing
- Presence panel — see who joins and leaves your session in real time
- My Sessions page — all your previous sessions with code previews
- Leave session modal with confirmation
- Responsive dark UI with Space Grotesk + JetBrains Mono

---

## Project Structure
```
src/
├── auth/
│   ├── authServices.js       # login, register, logout, getToken
│   ├── Login.jsx             # Login page
│   ├── Register.jsx          # Register page
│   ├── ProtectedRoute.jsx    # Blocks unauthenticated users
│   └── Auth.css
├── editor/
│   ├── CodeEditor.jsx        # Monaco editor + WebSocket sync + debounce save
│   ├── PresencePanel.jsx     # Real-time join/leave activity feed
│   └── PresencePanel.css
├── home/
│   ├── Home.jsx              # Landing page with video background
│   ├── CreateSession.jsx     # Create a new session
│   └── JoinSession.jsx       # Join an existing session
├── homeNavbar/
│   └── Nav.jsx               # Sticky navbar with sessions dropdown
├── pages/
│   ├── SessionPage.jsx       # Session layout with leave modal
│   └── MySessions.jsx        # Session history grid
├── docs/
│   └── Documentation.jsx     # Full documentation page
└── App.jsx                   # Route definitions
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- DinoCode backend running (see backend repo)

### Setup
```bash
git clone https://github.com/Deepak-Poly-XO/DinoCodeFrontend
cd DinoCodeFrontend
npm install
```

Create a `.env` file in the root:
```env
VITE_BACKEND_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080
```
```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_BACKEND_URL` | Backend API base URL |
| `VITE_WS_URL` | WebSocket base URL |

---

## Deployment

Deployed on Vercel. A `vercel.json` file handles SPA routing so direct URL access and page refreshes work correctly.
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## Backend

The backend repo is here: https://github.com/Deepak-Poly-XO/DinoCodeBackend
