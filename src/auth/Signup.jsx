import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-zinc-900 rounded-xl border border-zinc-800 p-8 shadow-xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-zinc-400">Start planning your career today</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-950 text-white rounded-lg border border-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none placeholder-zinc-600"
                            placeholder="student@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-950 text-white rounded-lg border border-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none placeholder-zinc-600"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm text-center bg-red-900/20 border border-red-900/50 p-3 rounded-lg"
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:bg-indigo-500 transition-colors"
                    >
                        Create Account
                    </motion.button>
                </form>

                <p className="text-center mt-6 text-zinc-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default Signup;
