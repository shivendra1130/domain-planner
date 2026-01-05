import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './auth.css';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/domain');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-page">
            <motion.div
                className="auth-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup} className="auth-form">
                    <motion.div
                        className="form-group"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </motion.div>
                    <motion.div
                        className="form-group"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </motion.div>
                    {error && (
                        <motion.div
                            className="error-message"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            {error}
                        </motion.div>
                    )}
                    <motion.button
                        type="submit"
                        className="submit-button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Sign Up
                    </motion.button>
                </form>
                <motion.div
                    className="auth-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Already have an account? <a href="/login">Login</a>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Signup;
