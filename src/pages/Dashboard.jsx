import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../services/firebase';

const trends = [
    { name: 'Web Development', demand: 'High', salary: '₹8–12 LPA', color: 'bg-blue-500', percent: 90 },
    { name: 'Data Analytics', demand: 'Medium', salary: '₹6–10 LPA', color: 'bg-green-500', percent: 75 },
    { name: 'UI/UX Design', demand: 'Growing', salary: '₹5–8 LPA', color: 'bg-purple-500', percent: 60 },
];

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Career Trends</h1>
                        <p className="text-gray-600 text-lg">Discover the most in-demand domains and plan your future.</p>
                    </div>
                    <button
                        onClick={() => auth.signOut()}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        Sign Out
                    </button>
                </header>

                <div className="grid gap-6 mb-12">
                    {trends.map((trend, index) => (
                        <motion.div
                            key={trend.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between"
                        >
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{trend.name}</h3>
                                <div className="flex gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <span className={`w-2 h-2 rounded-full ${trend.color}`}></span>
                                        Demand: {trend.demand}
                                    </span>
                                    <span> Salary: {trend.salary}</span>
                                </div>
                            </div>

                            <div className="w-48 h-2 bg-gray-100 rounded-full ml-8 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${trend.percent}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className={`h-full ${trend.color}`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/domains')}
                        className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition-colors"
                    >
                        Explore Domains →
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
