import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Particles from '../components/Particles';

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            await auth.signOut();
            navigate('/verify-email', { state: { email } });
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setError('');
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            setError('Google sign-up failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen relative bg-zinc-950 font-sans overflow-hidden flex items-center justify-center">
            {/* Background Particles */}
            <div className="absolute inset-0 z-0">
                <Particles
                    particleColors={['#ffffff', '#a1a1aa']}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-md w-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-8 shadow-2xl rounded-sm relative z-10 mx-4"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-serif text-white mb-2 tracking-tight">Create Account</h1>
                    <p className="text-zinc-500 text-sm uppercase tracking-wider">Begin your professional journey</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wide">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-950/50 text-white border border-zinc-700 focus:border-zinc-500 focus:ring-0 transition-colors outline-none placeholder-zinc-700 rounded-sm cursor-target"
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
                            className="w-full px-4 py-3 bg-zinc-950/50 text-white border border-zinc-700 focus:border-zinc-500 focus:ring-0 transition-colors outline-none placeholder-zinc-700 rounded-sm cursor-target"
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
                        disabled={loading}
                        className="w-full py-3 bg-zinc-100 text-zinc-900 font-bold uppercase tracking-wider text-xs shadow-lg hover:bg-white transition-colors rounded-sm cursor-target disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </motion.button>
                </form>

                <div className="flex items-center gap-4 my-6">
                    <div className="h-px flex-1 bg-zinc-800" />
                    <span className="text-xs uppercase text-zinc-500 tracking-[0.2em]">or</span>
                    <div className="h-px flex-1 bg-zinc-800" />
                </div>

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="button"
                    onClick={handleGoogleSignup}
                    disabled={loading}
                    className="w-full py-3 bg-white/90 text-zinc-900 font-semibold tracking-wide text-sm shadow-lg hover:bg-white transition-colors border border-zinc-200 rounded-sm cursor-target flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        className="w-5 h-5"
                    >
                        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.1 29.3 35 24 35c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.3 0 6.3 1.2 8.6 3.2l5.7-5.7C34.9 3.6 29.7 1 24 1 11.8 1 2 10.8 2 23s9.8 22 22 22c11 0 21-8 21-22 0-1.5-.2-3-.4-4.5z"/>
                        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.2 16.6 18.7 13 24 13c3.3 0 6.3 1.2 8.6 3.2l5.7-5.7C34.9 3.6 29.7 1 24 1 15.4 1 8.1 5.8 6.3 14.7z"/>
                        <path fill="#4CAF50" d="M24 45c5.2 0 10.1-1.9 13.7-5.2l-6.3-5.3C29.3 35 26.8 36 24 36c-5.2 0-9.5-3.4-11.1-8.1l-6.6 5.1C8.1 40.2 15.4 45 24 45z"/>
                        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.6-3 4.7-5.6 6.1l6.3 5.3C38.7 36.6 41 30.6 41 24c0-1.5-.2-3-.4-4.5z"/>
                    </svg>
                    Sign up with Google
                </motion.button>

                <p className="text-center mt-8 text-zinc-500 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-white hover:underline transition-all">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default Signup;
