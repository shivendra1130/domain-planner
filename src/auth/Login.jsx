import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 shadow-2xl rounded-sm"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-serif text-white mb-2 tracking-tight">Welcome Back</h1>
                    <p className="text-zinc-500 text-sm uppercase tracking-wider">Sign in to your dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wide">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-950 text-white border border-zinc-700 focus:border-zinc-500 focus:ring-0 transition-colors outline-none placeholder-zinc-700 rounded-sm"
                            placeholder="student@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wide">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-950 text-white border border-zinc-700 focus:border-zinc-500 focus:ring-0 transition-colors outline-none placeholder-zinc-700 rounded-sm"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-xs text-center border-l-2 border-red-500 pl-3 py-1"
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        className="w-full py-3 bg-zinc-100 text-zinc-900 font-bold uppercase tracking-wider text-xs shadow-lg hover:bg-white transition-colors rounded-sm"
                    >
                        Sign In
                    </motion.button>
                </form>

                <p className="text-center mt-8 text-zinc-500 text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-white hover:underline transition-all">
                        Sign up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default Login;
