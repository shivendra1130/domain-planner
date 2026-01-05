import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Particles from '../components/Particles';

function VerifyEmail() {
    const location = useLocation();
    const email = location.state?.email || 'your email';

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
                <div className="text-center">
                    <motion.div 
                        className="mb-8"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        <svg className="w-20 h-20 mx-auto text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </motion.div>

                    <h1 className="text-3xl font-serif text-white mb-4 tracking-tight">Verify Your Email</h1>
                    
                    <div className="mb-8">
                        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                            We've sent a verification link to
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-zinc-950/50 border border-zinc-700 px-4 py-3 rounded-sm mb-4"
                        >
                            <p className="text-white font-semibold text-sm break-all">{email}</p>
                        </motion.div>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                            Please check your inbox and click the verification link to activate your account.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4"
                    >
                        <div className="bg-zinc-950/30 border border-zinc-800 p-4 rounded-sm">
                            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Next Steps</p>
                            <ol className="text-left text-zinc-400 text-xs space-y-2 list-decimal list-inside">
                                <li>Open your email inbox</li>
                                <li>Click the verification link</li>
                                <li>Return here to sign in</li>
                            </ol>
                        </div>

                        <Link 
                            to="/login" 
                            className="block w-full py-3 bg-zinc-100 text-zinc-900 font-bold uppercase tracking-wider text-xs hover:bg-white transition-colors rounded-sm cursor-target"
                        >
                            Go to Login
                        </Link>

                        <p className="text-zinc-500 text-xs mt-4">
                            Didn't receive the email? Check your spam folder.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default VerifyEmail;
