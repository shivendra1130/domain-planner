import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const skillsData = {
    'frontend-dev': ['HTML', 'CSS', 'JavaScript', 'React'],
    'backend-dev': ['Node.js', 'Express', 'MongoDB', 'SQL'],
    'full-stack-dev': ['React', 'Node.js', 'Database Architecture', 'DevOps'],
    'data-analyst': ['Python', 'SQL', 'Tableau', 'Excel'],
    'ml-engineer': ['Python', 'TensorFlow', 'Statistics', 'Deep Learning'],
    'android-dev': ['Java', 'Kotlin', 'Android SDK', 'Material Design'],
    'ios-dev': ['Swift', 'UIKit', 'SwiftUI', 'Xcode']
};

const roleTitles = {
    'frontend-dev': 'Frontend Developer',
    'backend-dev': 'Backend Developer',
    'full-stack-dev': 'Full Stack Developer',
    'data-analyst': 'Data Analyst',
    'ml-engineer': 'ML Engineer',
    'android-dev': 'Android Developer',
    'ios-dev': 'iOS Developer'
};

export default function Skills() {
    const { role } = useParams();
    const navigate = useNavigate();
    const skills = skillsData[role] || ['HTML', 'CSS', 'JavaScript'];
    const roleTitle = roleTitles[role] || 'Role';

    const [completed, setCompleted] = useState({});

    const toggleSkill = (skill) => {
        if (!completed[skill]) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
        setCompleted(prev => ({
            ...prev,
            [skill]: !prev[skill]
        }));
    };

    return (
        <div className="min-h-screen bg-zinc-950 p-8 text-zinc-200">
            <div className="max-w-2xl mx-auto">
                <header className="mb-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-zinc-500 hover:text-white mb-4 flex items-center gap-2 transition-colors"
                    >
                        ← Back to Roles
                    </button>
                    <h1 className="text-4xl font-bold text-white">{roleTitle} Skills</h1>
                    <p className="text-zinc-400 mt-2">Master these to succeed</p>
                </header>

                <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
                    {skills.map((skill, index) => (
                        <div
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            className="p-6 border-b border-zinc-800 hover:bg-zinc-800/50 cursor-pointer transition-colors flex items-center justify-between group last:border-0"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${completed[skill]
                                        ? 'bg-green-500 border-green-500'
                                        : 'border-zinc-600 group-hover:border-indigo-400'
                                    }`}>
                                    {completed[skill] && (
                                        <motion.svg
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-4 h-4 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </motion.svg>
                                    )}
                                </div>
                                <span className={`text-lg font-medium transition-colors ${completed[skill] ? 'text-zinc-600 line-through' : 'text-zinc-200'
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
                                        className="text-sm font-medium text-green-400 bg-green-900/30 px-3 py-1 rounded-full"
                                    >
                                        🎉 Complete!
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
