import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const rolesData = {
    'web-development': [
        { id: 'frontend-dev', title: 'Frontend Developer', desc: 'Focus on user interface and experience.' },
        { id: 'backend-dev', title: 'Backend Developer', desc: 'Handle server-side logic and databases.' },
        { id: 'full-stack-dev', title: 'Full Stack Developer', desc: 'Master both frontend and backend technologies.' }
    ],
    'data-science': [
        { id: 'data-analyst', title: 'Data Analyst', desc: 'Interpret complex data to help companies make decisions.' },
        { id: 'ml-engineer', title: 'Machine Learning Engineer', desc: 'Build AI models and systems.' }
    ],
    'mobile-app-development': [
        { id: 'android-dev', title: 'Android Developer', desc: 'Build apps for the Android ecosystem.' },
        { id: 'ios-dev', title: 'iOS Developer', desc: 'Build apps for the Apple ecosystem.' }
    ]
};

const domainTitles = {
    'web-development': 'Web Development',
    'data-science': 'Data Science',
    'mobile-app-development': 'Mobile App Development'
};

export default function Roles() {
    const { domain } = useParams();
    const navigate = useNavigate();
    const roles = rolesData[domain] || [];
    const domainTitle = domainTitles[domain] || 'Unknown Domain';

    return (
        <div className="min-h-screen bg-zinc-950 p-8 text-zinc-200">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12">
                    <button
                        onClick={() => navigate('/domains')}
                        className="text-zinc-500 hover:text-white mb-4 flex items-center gap-2 transition-colors"
                    >
                        ← Back to Domains
                    </button>
                    <h1 className="text-4xl font-bold text-white">{domainTitle} Roles</h1>
                    <p className="text-zinc-400 mt-2">Which path suits you best?</p>
                </header>

                <div className="space-y-4">
                    {roles.map((role, index) => (
                        <motion.div
                            key={role.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 flex items-center justify-between group hover:border-indigo-500/50 transition-colors"
                        >
                            <div>
                                <h3 className="text-xl font-bold text-white">{role.title}</h3>
                                <p className="text-zinc-400 text-sm mt-1">{role.desc}</p>
                            </div>
                            <button
                                onClick={() => navigate(`/skills/${role.id}`)}
                                className="px-6 py-2 bg-zinc-800 text-indigo-400 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 border border-zinc-700 hover:border-indigo-500"
                            >
                                View Skills →
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
