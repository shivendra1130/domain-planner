import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const rolesData = {
    'web-development': [
        { id: 'frontend-dev', title: 'Frontend Engineer', desc: 'Client-side Architecture' },
        { id: 'backend-dev', title: 'Backend Engineer', desc: 'Server & Database Systems' },
        { id: 'full-stack-dev', title: 'Full Stack Engineer', desc: 'Complete System Design' }
    ],
    'data-science': [
        { id: 'data-analyst', title: 'Data Analyst', desc: 'Business Intelligence' },
        { id: 'ml-engineer', title: 'ML Practitioner', desc: 'Algorithmic Modeling' }
    ],
    'mobile-app-development': [
        { id: 'android-dev', title: 'Android Engineer', desc: 'Kotlin Ecosystem' },
        { id: 'ios-dev', title: 'iOS Engineer', desc: 'Swift Ecosystem' }
    ]
};

const domainTitles = {
    'web-development': 'Web Engineering',
    'data-science': 'Data Science',
    'mobile-app-development': 'Mobile Systems'
};

export default function Roles() {
    const { domain } = useParams();
    const navigate = useNavigate();
    const roles = rolesData[domain] || [];
    const domainTitle = domainTitles[domain] || 'Unknown Domain';

    return (
        <div className="min-h-screen bg-zinc-950 p-8 text-zinc-200 font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 border-b border-zinc-900 pb-8">
                    <button
                        onClick={() => navigate('/domains')}
                        className="text-zinc-500 hover:text-white mb-6 text-xs uppercase tracking-widest flex items-center gap-2 transition-colors cursor-target"
                    >
                        ← Back to Domains
                    </button>
                    <h1 className="text-4xl font-serif text-white tracking-tight capitalize cursor-target">
                        {domain?.replace('-', ' ')} Roles
                    </h1>
                </header>

                <div className="grid gap-4">
                    {roles.map((role, index) => (
                        <motion.div
                            key={role.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 4 }}
                            onClick={() => navigate(`/skills/${role.id}`)}
                            className="group bg-zinc-900/50 border border-zinc-800 p-6 flex items-center justify-between hover:bg-zinc-900 hover:border-zinc-600 transition-all cursor-pointer rounded-sm cursor-target"
                        >
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-zinc-200">{role.title}</h3>
                                <p className="text-xs text-zinc-500 uppercase tracking-widest">
                                    {role.desc}
                                </p>
                            </div>
                            <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-500 group-hover:border-zinc-500 group-hover:text-zinc-300 transition-all cursor-target">
                                →
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
