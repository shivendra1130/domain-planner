import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Particles from '../components/Particles';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            await auth.signOut();
            setMessage('Verification email sent! Please check your inbox before logging in.');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
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

                {message ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8"
                    >
                        <div className="text-4xl mb-4">📧</div>
                        <h3 className="text-xl text-white font-serif mb-2">Check your email</h3>
                        <p className="text-zinc-400 text-sm mb-6">{message}</p>
                        <Link to="/login" className="text-white underline hover:text-zinc-300">
                            Proceed to Login
                        </Link>
                    </motion.div>
                ) : (
                    <>
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
                                className="w-full py-3 bg-zinc-100 text-zinc-900 font-bold uppercase tracking-wider text-xs shadow-lg hover:bg-white transition-colors rounded-sm cursor-target"
                            >
                                Create Account
                            </motion.button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-zinc-800"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-zinc-900 text-zinc-500 text-xs uppercase tracking-widest">Or continue with</span>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={handleGoogleLogin}
                                className="mt-6 w-full py-3 bg-zinc-950 border border-zinc-800 text-zinc-300 font-bold uppercase tracking-wider text-xs shadow-lg hover:border-zinc-600 hover:text-white transition-all rounded-sm flex items-center justify-center gap-2 cursor-target"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </motion.button>
                        </div>

                        <p className="text-center mt-8 text-zinc-500 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-white hover:underline transition-all">
                                Sign in
                            </Link>
                        </p>
                    </>
                )}
            </motion.div>
        </div>
    );
}

export default Signup;
