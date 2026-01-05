import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const skillsData = {
    'frontend-dev': ['HTML5 Semantic Structure', 'CSS3 & Flexbox/Grid', 'Modern JavaScript (ES6+)', 'React.js Architecture'],
    'backend-dev': ['Node.js Runtime', 'Express.js Framework', 'MongoDB / NoSQL', 'SQL & Normalization'],
    'full-stack-dev': ['React & State Management', 'REST API Design', 'Database Modeling', 'CI/CD Pipelines'],
    'data-analyst': ['Python for Data Analysis', 'SQL Queries', 'Tableau/PowerBI', 'Excel Modeling'],
    'ml-engineer': ['Python & NumPy/Pandas', 'TensorFlow / PyTorch', 'Statistical Analysis', 'Neural Networks'],
    'android-dev': ['Java Fundamentals', 'Kotlin Coroutines', 'Android SDK', 'Material Design Guidelines'],
    'ios-dev': ['Swift Language', 'UIKit / SwiftUI', 'Xcode Tools', 'iOS Design Guidelines']
};

const roleTitles = {
    'frontend-dev': 'Frontend Engineer',
    'backend-dev': 'Backend Engineer',
    'full-stack-dev': 'Full Stack Engineer',
    'data-analyst': 'Data Analyst',
    'ml-engineer': 'ML Practitioner',
    'android-dev': 'Android Engineer',
    'ios-dev': 'iOS Engineer'
};

export default function Skills() {
    const { role } = useParams();
    const navigate = useNavigate();
    const skills = skillsData[role] || [];
    const roleTitle = roleTitles[role] || 'Role';

    const [completed, setCompleted] = useState({});

    const toggleSkill = (skill) => {
        if (!completed[skill]) {
            confetti({
                particleCount: 50,
                spread: 50,
                origin: { y: 0.6 },
                colors: ['#ffffff', '#a1a1aa', '#52525b'] // Monochrome confetti
            });
        }
        setCompleted(prev => ({
            ...prev,
            [skill]: !prev[skill]
        }));
    };

    return (
        <div className="min-h-screen bg-zinc-950 p-8 text-zinc-200 font-sans">
            <div className="max-w-3xl mx-auto">
                <header className="mb-16 border-b border-zinc-900 pb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-zinc-500 hover:text-white mb-6 text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                        ← Back
                    </button>
                    <h1 className="text-4xl font-serif text-white tracking-tight">{roleTitle}</h1>
                    <p className="text-zinc-500 text-sm mt-2 uppercase tracking-wide">Competency Checklist</p>
                </header>

                <div className="grid gap-px bg-zinc-800 border border-zinc-800 mb-16">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => toggleSkill(skill)}
                            className={`
                p-6 cursor-pointer transition-all duration-300 flex items-center justify-between group
                ${completed[skill] ? 'bg-zinc-900' : 'bg-zinc-950 hover:bg-zinc-900'}
              `}
                        >
                            <div className="flex items-center gap-6">
                                <div className={`
                  w-5 h-5 border flex items-center justify-center transition-all rounded-none
                  ${completed[skill]
                                        ? 'bg-zinc-100 border-zinc-100'
                                        : 'border-zinc-700 group-hover:border-zinc-400'}
                `}>
                                    {completed[skill] && (
                                        <motion.svg
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-3 h-3 text-zinc-900"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </motion.svg>
                                    )}
                                </div>
                                <span className={`text-base font-serif transition-colors ${completed[skill] ? 'text-zinc-600 line-through' : 'text-zinc-300 group-hover:text-white'
                                    }`}>
                                    {skill}
                                </span>
                            </div>

                            <AnimatePresence>
                                {completed[skill] && (
                                    <motion.span
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-xs font-bold text-zinc-900 bg-zinc-200 px-3 py-1 uppercase tracking-wider rounded-sm"
                                    >
                                        Done
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
