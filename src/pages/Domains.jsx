import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const domains = [
    {
        id: 'web-development',
        title: 'Web Development',
        description: 'Build modern websites and web applications using the latest technologies.',
        icon: '🌐'
    },
    {
        id: 'data-science',
        title: 'Data Science',
        description: 'Analyze data to discover hidden patterns and make data-driven decisions.',
        icon: '📊'
    },
    {
        id: 'mobile-app-development',
        title: 'Mobile App Development',
        description: 'Create native and cross-platform mobile applications for iOS and Android.',
        icon: '📱'
    }
];

export default function Domains() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-950 p-8 text-zinc-200">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-zinc-500 hover:text-white mb-4 flex items-center gap-2 transition-colors"
                    >
                        ← Back to Dashboard
                    </button>
                    <h1 className="text-4xl font-bold text-white">Select a Domain</h1>
                    <p className="text-zinc-400 mt-2">Choose a field you want to explore</p>
                </header>

                <div className="grid md:grid-cols-3 gap-8">
                    {domains.map((domain, index) => (
                        <motion.div
                            key={domain.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-zinc-600 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
                        >
                            <div className="text-4xl mb-6">{domain.icon}</div>
                            <h2 className="text-2xl font-bold text-white mb-4">{domain.title}</h2>
                            <p className="text-zinc-400 mb-8 leading-relaxed">
                                {domain.description}
                            </p>
                            <button
                                onClick={() => navigate(`/roles/${domain.id}`)}
                                className="w-full py-3 px-6 bg-zinc-950 border-2 border-indigo-500 text-indigo-400 rounded-xl font-semibold hover:bg-indigo-500 hover:text-white transition-all"
                            >
                                View Roles
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
