import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../services/firebase';
import TextType from '../components/TextType';

const trends = [
    { name: 'Web Development', demand: 'High', salary: '₹8–12 LPA', color: 'bg-zinc-200', percent: 90 },
    { name: 'Data Analytics', demand: 'Medium', salary: '₹6–10 LPA', color: 'bg-zinc-400', percent: 75 },
    { name: 'UI/UX Design', demand: 'Growing', salary: '₹5–8 LPA', color: 'bg-zinc-500', percent: 60 },
];

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-950 p-8 text-zinc-200 font-sans">
            <div className="max-w-5xl mx-auto">
                <header className="flex justify-between items-center mb-16 border-b border-zinc-900 pb-8">
                    <div>
                        <h1 className="text-4xl font-serif text-white mb-2 tracking-tight min-h-[48px] cursor-target">
                            <TextType
                                text={["Career Trends", "Future Insights", "Market Analysis"]}
                                typingSpeed={75}
                                pauseDuration={1500}
                                showCursor={true}
                                cursorCharacter="|"
                                loop={true}
                            />
                        </h1>
                        <p className="text-zinc-500 text-sm uppercase tracking-widest min-h-[20px] cursor-target">
                            <TextType
                                text="Explore the most in-demand domains"
                                typingSpeed={50}
                                initialDelay={1000}
                                showCursor={false}
                                loop={false}
                            />
                        </p>
                    </div>
                    <button
                        onClick={() => auth.signOut()}
                        className="px-6 py-2 border border-zinc-800 rounded-sm text-xs font-bold text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-all uppercase tracking-wider cursor-target"
                    >
                        Sign Out
                    </button>
                </header>

                <div className="grid gap-px bg-zinc-900 border border-zinc-900 rounded-sm overflow-hidden mb-16">
                    {trends.map((trend, index) => (
                        <motion.div
                            key={trend.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-zinc-950 p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-zinc-900/30 transition-colors cursor-target"
                        >
                            <div className="flex-1">
                                <h3 className="text-xl font-serif text-white mb-2">{trend.name}</h3>
                                <div className="flex gap-6 text-xs text-zinc-500 font-mono uppercase tracking-wide">
                                    <span className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-none"></span>
                                        Demand: {trend.demand}
                                    </span>
                                    <span>Salary: {trend.salary}</span>
                                </div>
                            </div>

                            <div className="w-full md:w-64 h-1 bg-zinc-900 rounded-sm overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${trend.percent}%` }}
                                    transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
                                    className={`h-full ${trend.color}`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/domains')}
                        className="px-10 py-4 bg-white text-zinc-950 rounded-sm font-bold text-sm shadow-xl hover:bg-zinc-200 transition-colors uppercase tracking-widest cursor-target"
                    >
                        Explore Domains
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
