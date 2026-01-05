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
                <header className="mb-16 border-b border-zinc-900 pb-8">
                    <button
                        onClick={() => navigate('/domains')}
                        className="text-zinc-500 hover:text-white mb-6 text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                        ← Return
                    </button>
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest block mb-2">{domainTitle}</span>
                    <h1 className="text-4xl font-serif text-white tracking-tight">Available Positions</h1>
                </header>

                <div className="space-y-px bg-zinc-800 border-t border-b border-zinc-800">
                    {roles.map((role, index) => (
                        <motion.div
                            key={role.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-zinc-950 p-8 flex items-center justify-between group hover:bg-zinc-900 cursor-pointer transition-colors"
                            onClick={() => navigate(`/skills/${role.id}`)}
                        >
                            <div>
                                <h3 className="text-xl font-serif text-zinc-200 group-hover:text-white transition-colors">{role.title}</h3>
                                <p className="text-zinc-500 text-xs mt-1 uppercase tracking-wide">{role.desc}</p>
                            </div>
                            <span className="text-zinc-600 text-xl font-serif group-hover:text-white transition-colors group-hover:translate-x-2 duration-300">
                                &rarr;
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
