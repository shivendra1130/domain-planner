import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TextType from '../components/TextType';
import LogoLoop from '../components/LogoLoop';
import { SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiNodedotjs, SiPython, SiDocker, SiAmazonwebservices } from 'react-icons/si';

const domains = [
    {
        id: 'web-development',
        title: 'Web Engineering',
        description: 'Modern application architecture.',
        icon: '01'
    },
    {
        id: 'data-science',
        title: 'Data Science',
        description: 'Predictive modeling & analytics.',
        icon: '02'
    },
    {
        id: 'mobile-app-development',
        title: 'Mobile Systems',
        description: 'iOS & Android ecosystem.',
        icon: '03'
    }
];

export default function Domains() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-950 p-8 text-zinc-200 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="mb-16 border-b border-zinc-900 pb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-zinc-500 hover:text-white mb-6 text-xs uppercase tracking-widest flex items-center gap-2 transition-colors cursor-target"
                    >
                        ← Dashboard
                    </button>
                    <h1 className="text-4xl font-serif text-white tracking-tight cursor-target min-h-[48px]">
                        <TextType
                            text="Select Domain"
                            typingSpeed={100}
                            startDelay={500}
                            showCursor={true}
                        />
                    </h1>
                </header>

                <div className="grid md:grid-cols-3 gap-8">
                    {domains.map((domain, index) => (
                        <motion.div
                            key={domain.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="bg-zinc-950 border border-zinc-800 p-8 hover:border-zinc-500 transition-all rounded-sm group relative cursor-target"
                        >
                            <div className="text-6xl font-serif text-zinc-900 mb-6 absolute top-4 right-4 opacity-50 group-hover:opacity-100 group-hover:text-zinc-800 transition-all">
                                {domain.icon}
                            </div>
                            <h2 className="text-2xl font-serif text-white mb-4 relative z-10">{domain.title}</h2>
                            <p className="text-zinc-500 text-sm mb-12 leading-relaxed relative z-10">
                                {domain.description}
                            </p>
                            <button
                                onClick={() => navigate(`/roles/${domain.id}`)}
                                className="w-full py-4 px-6 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-zinc-950 transition-all cursor-target"
                            >
                                View Roles
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 border-t border-zinc-900/50 pt-16">
                    <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-8 text-center cursor-target">
                        Powered By Modern Tech Stack
                    </h3>
                    <LogoLoop
                        logos={[
                            { node: <SiReact className="text-zinc-500 group-hover:text-[#61DAFB] transition-colors" />, title: "React" },
                            { node: <SiNextdotjs className="text-zinc-500 group-hover:text-white transition-colors" />, title: "Next.js" },
                            { node: <SiTailwindcss className="text-zinc-500 group-hover:text-[#38B2AC] transition-colors" />, title: "Tailwind" },
                            { node: <SiFramer className="text-zinc-500 group-hover:text-white transition-colors" />, title: "Framer" },
                            { node: <SiNodedotjs className="text-zinc-500 group-hover:text-[#339933] transition-colors" />, title: "Node.js" },
                            { node: <SiPython className="text-zinc-500 group-hover:text-[#3776AB] transition-colors" />, title: "Python" },
                            { node: <SiDocker className="text-zinc-500 group-hover:text-[#2496ED] transition-colors" />, title: "Docker" },
                            { node: <SiAmazonwebservices className="text-zinc-500 group-hover:text-[#FF9900] transition-colors" />, title: "AWS" },
                        ]}
                        gap={60}
                        speed={50}
                        direction="left"
                        logoHeight={32}
                    />
                </div>
            </div>
        </div>
    );
}
