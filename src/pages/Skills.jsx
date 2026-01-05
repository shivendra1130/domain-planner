import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import TextType from '../components/TextType';

const skillsData = {
    'frontend-dev': ['HTML5 Semantic Structure', 'CSS3 & Flexbox/Grid', 'Modern JavaScript (ES6+)', 'React.js Architecture'],
    'backend-dev': ['Node.js Runtime', 'Express.js Framework', 'MongoDB / NoSQL', 'SQL & Normalization'],
    'full-stack-dev': ['React & State Management', 'REST API Design', 'Database Modeling', 'CI/CD Pipelines'],
    'data-analyst': ['Python for Data Analysis', 'SQL Queries', 'Tableau/PowerBI', 'Excel Modeling'],
    'ml-engineer': ['Python & NumPy/Pandas', 'TensorFlow / PyTorch', 'Statistical Analysis', 'Neural Networks'],
    'android-dev': ['Java Fundamentals', 'Kotlin Coroutines', 'Android SDK', 'Material Design Guidelines'],
    'ios-dev': ['Swift Language', 'UIKit / SwiftUI', 'Xcode Tools', 'iOS Design Guidelines']
};

export default function Skills() {
    const { role } = useParams(); // roleId from URL
    const navigate = useNavigate();

    // Transform skillsData for the new structure
    const currentSkills = useMemo(() => {
        return (skillsData[role] || []).map((skillName, index) => ({
            id: `${role}-${index}`, // Unique ID for each skill
            name: skillName
        }));
    }, [role]);

    const [checkedSkills, setCheckedSkills] = useState(() => {
        // Initialize from localStorage if available
        const saved = localStorage.getItem(`checkedSkills-${role}`);
        return saved ? JSON.parse(saved) : [];
    });

    // Save to localStorage whenever checkedSkills changes
    useEffect(() => {
        localStorage.setItem(`checkedSkills-${role}`, JSON.stringify(checkedSkills));
    }, [checkedSkills, role]);

    const toggleSkill = (skillId) => {
        setCheckedSkills(prev => {
            const isChecked = prev.includes(skillId);
            let newCheckedSkills;
            if (isChecked) {
                newCheckedSkills = prev.filter(id => id !== skillId);
            } else {
                newCheckedSkills = [...prev, skillId];
                confetti({
                    particleCount: 50,
                    spread: 50,
                    origin: { y: 0.6 },
                    colors: ['#ffffff', '#a1a1aa', '#52525b'] // Monochrome confetti
                });
            }
            return newCheckedSkills;
        });
    };

    const progress = useMemo(() => {
        if (currentSkills.length === 0) return 0;
        return (checkedSkills.length / currentSkills.length) * 100;
    }, [checkedSkills, currentSkills]);

    return (
        <div className="min-h-screen bg-zinc-950 p-8 text-zinc-200 font-sans">
            <div className="max-w-3xl mx-auto">
                <header className="mb-12 border-b border-zinc-900 pb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-zinc-500 hover:text-white mb-6 text-xs uppercase tracking-widest flex items-center gap-2 transition-colors cursor-target"
                    >
                        ← Back to Roles
                    </button>
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl font-serif text-white tracking-tight capitalize mb-2 cursor-target min-h-[48px]">
                                <TextType
                                    text={role?.replace('-', ' ')}
                                    typingSpeed={80}
                                    startDelay={300}
                                    showCursor={true}
                                />
                            </h1>
                            <p className="text-zinc-500 text-sm">
                                Progress: {Math.round(progress)}%
                            </p>
                        </div>
                        {checkedSkills.length === currentSkills.length && currentSkills.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="px-4 py-2 bg-zinc-100 text-zinc-900 text-xs font-bold uppercase tracking-widest rounded-sm"
                            >
                                Completed
                            </motion.div>
                        )}
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-zinc-900 mt-8 rounded-sm overflow-hidden">
                        <motion.div
                            className="h-full bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </header>

                <div className="grid gap-3">
                    {currentSkills.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => toggleSkill(skill.id)}
                            className={`p-5 border rounded-sm flex items-center justify-between cursor-pointer transition-all group cursor-target ${checkedSkills.includes(skill.id)
                                ? 'bg-zinc-900 border-zinc-700 opacity-50'
                                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-500'
                                }`}
                        >
                            <span className={`font-medium transition-colors ${checkedSkills.includes(skill.id) ? 'text-zinc-500 line-through' : 'text-zinc-200 group-hover:text-white'
                                }`}>
                                {skill.name}
                            </span>

                            <div className={`w-5 h-5 border rounded-sm flex items-center justify-center transition-colors ${checkedSkills.includes(skill.id)
                                ? 'bg-zinc-200 border-zinc-200'
                                : 'border-zinc-700 group-hover:border-zinc-500'
                                }`}>
                                {checkedSkills.includes(skill.id) && (
                                    <svg className="w-3 h-3 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button
                        onClick={() => setCheckedSkills([])}
                        className="text-xs text-zinc-600 hover:text-red-400 uppercase tracking-widest transition-colors cursor-target"
                    >
                        Reset Progress
                    </button>
                </div>
            </div>
        </div>
    );
}
