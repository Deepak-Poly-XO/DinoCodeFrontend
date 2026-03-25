import  { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "./authServices";
import './Auth.css';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!email.trim() || !password.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            await register(email, password);
            navigate("/login"); // redirect to login after success
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Create Account</h2>
                <p className="auth-subtitle">Join DinoCode today</p>

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

                <button onClick={handleRegister} disabled={loading}>
                    {loading ? "Creating account..." : "Register"}
                </button>

                {error && <p className="auth-error">{error}</p>}

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;