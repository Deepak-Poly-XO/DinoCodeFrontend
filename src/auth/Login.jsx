import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "./authServices";
import './auth.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [slowConnection, setSlowConnection] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => setSlowConnection(true), 3000);
        } else {
            setSlowConnection(false);
        }
        return () => clearTimeout(timer);
    }, [loading]);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            await login(email, password);
            navigate("/");
        } catch {
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Login to DinoCode</p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />

                <button onClick={handleLogin} disabled={loading}>
                    {loading && <span className="spinner"></span>}
                    {loading ? "Logging in..." : "Login"}
                </button>

                {slowConnection && (
                    <p className="slow-message">
                        Server is a lil problem child , almost there...
                    </p>
                )}

                {error && <p className="auth-error">{error}</p>}

                <p className="auth-switch">
                    Don&apos;t have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;