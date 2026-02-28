import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GamificationDashboard from '@/components/Marga/Gamification/GamificationDashboard';
import LevelMap from '@/components/Marga/Gamification/LevelMap';
import Navbar from '@/components/layout/Navbar';
import SelectionDisplay from '@/components/Marga/Onboarding/SelectionDisplay';
import { Code2, Terminal, Layers, Zap, BookOpen, Map, ArrowRight, Server, Database, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MargaDashboard = () => {
    const [step, setStep] = useState<'stack' | 'level' | 'dashboard'>('stack');
    const [selectedStack, setSelectedStack] = useState<string>('');
    const [selectedLevel, setSelectedLevel] = useState<string>('');

    // Load saved preferences on mount
    useEffect(() => {
        const savedStack = localStorage.getItem('marga_stack');
        const savedLevel = localStorage.getItem('marga_level');
        if (savedStack && savedLevel) {
            setSelectedStack(savedStack);
            setSelectedLevel(savedLevel);
            setStep('dashboard'); // Auto-skip if preferences exist
        }
    }, []);

    const handleStackSelect = (stack: string) => {
        setSelectedStack(stack);
        localStorage.setItem('marga_stack', stack);
        setStep('level');
    };

    const handleLevelSelect = (level: string) => {
        setSelectedLevel(level);
        localStorage.setItem('marga_level', level);
        setStep('dashboard');
    };

    const handleReset = () => {
        setStep('stack');
        localStorage.removeItem('marga_stack');
        localStorage.removeItem('marga_level');
    };

    const getRoadmapLink = (stack: string) => {
        const map: { [key: string]: string } = {
            'JavaScript': 'javascript',
            'Python': 'python',
            'React': 'react',
            'Java': 'java',
            'C++': 'cpp',
            'Go': 'go',
            'C': 'c',
            'C#': 'csharp', // roadmap.sh might not have C# explicitly, usually .NET, but let's try csharp or aspnet
            'Rust': 'rust',
            'TypeScript': 'typescript',
            'Swift': 'swift', // check roadmap.sh
            'Kotlin': 'kotlin', // android
            'PHP': 'php',
            'Ruby': 'ruby',
            'Lua': 'lua',
            'R': 'r', // maybe data-science
            'DBMS': 'sql',
            'Computer Networks': 'computer-science', // fallback
            'Operating Systems': 'computer-science',
            'DSA': 'computer-science',
            'System Design': 'system-design',
            'HTML/CSS': 'frontend',
            'Node.js': 'nodejs',
            'Git': 'git',
            'Docker': 'docker'
        };
        return `https://roadmap.sh/${map[stack] || 'computer-science'}`;
    };

    const stacks = [
        // Languages
        { id: 'JavaScript', label: 'JavaScript', icon: <Code2 className="w-8 h-8" />, description: 'The language of the web.' },
        { id: 'Python', label: 'Python', icon: <Terminal className="w-8 h-8" />, description: 'AI & Data Science.' },
        { id: 'Java', label: 'Java', icon: <Code2 className="w-8 h-8" />, description: 'Enterprise systems.' },
        { id: 'C++', label: 'C++', icon: <Code2 className="w-8 h-8" />, description: 'High performance.' },
        { id: 'C', label: 'C', icon: <Code2 className="w-8 h-8" />, description: 'System programming.' },
        { id: 'C#', label: 'C#', icon: <Code2 className="w-8 h-8" />, description: 'Game dev & Enterprise.' },
        { id: 'Go', label: 'Go', icon: <Code2 className="w-8 h-8" />, description: 'Scalable systems.' },
        { id: 'Rust', label: 'Rust', icon: <Code2 className="w-8 h-8" />, description: 'Memory safety.' },
        { id: 'TypeScript', label: 'TypeScript', icon: <Code2 className="w-8 h-8" />, description: 'Typed JavaScript.' },
        { id: 'Swift', label: 'Swift', icon: <Code2 className="w-8 h-8" />, description: 'iOS Development.' },
        { id: 'Kotlin', label: 'Kotlin', icon: <Code2 className="w-8 h-8" />, description: 'Android Development.' },
        { id: 'PHP', label: 'PHP', icon: <Code2 className="w-8 h-8" />, description: 'Web scripting.' },
        { id: 'Ruby', label: 'Ruby', icon: <Code2 className="w-8 h-8" />, description: 'Web development.' },
        { id: 'Lua', label: 'Lua', icon: <Code2 className="w-8 h-8" />, description: 'Embedded scripting.' },
        { id: 'R', label: 'R', icon: <Code2 className="w-8 h-8" />, description: 'Data Analysis.' },

        // Web & DevOps
        { id: 'React', label: 'React', icon: <Layers className="w-8 h-8" />, description: 'Modern Interfaces.' },
        { id: 'HTML/CSS', label: 'HTML/CSS', icon: <Code2 className="w-8 h-8" />, description: 'Web Fundamentals.' },
        { id: 'Node.js', label: 'Node.js', icon: <Server className="w-8 h-8" />, description: 'Backend JS.' },
        { id: 'Git', label: 'Git', icon: <Code2 className="w-8 h-8" />, description: 'Version Control.' },
        { id: 'Docker', label: 'Docker', icon: <Code2 className="w-8 h-8" />, description: 'Containerization.' },

        // CS Subjects
        { id: 'DBMS', label: 'DBMS', icon: <Database className="w-8 h-8" />, description: 'Database Systems.' },
        { id: 'Computer Networks', label: 'Networks', icon: <Server className="w-8 h-8" />, description: 'How internet works.' },
        { id: 'Operating Systems', label: 'OS', icon: <Terminal className="w-8 h-8" />, description: 'Kernel & Process.' },
        { id: 'DSA', label: 'DSA', icon: <Brain className="w-8 h-8" />, description: 'Algorithms & Structures.' },
        { id: 'System Design', label: 'System Design', icon: <Layers className="w-8 h-8" />, description: 'Scalable Architecture.' },
    ];

    const levels = [
        { id: 'Beginner', label: 'Beginner', icon: <BookOpen className="w-8 h-8" />, description: 'Start from scratch.' },
        { id: 'Intermediate', label: 'Intermediate', icon: <Zap className="w-8 h-8" />, description: 'Deepen your knowledge.' },
        { id: 'Advanced', label: 'Advanced', icon: <Map className="w-8 h-8" />, description: 'Master complex concepts.' },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar isLoggedIn />
            <div className="container mx-auto px-4 pt-24 pb-12">

                <AnimatePresence mode="wait">
                    {step === 'stack' && (
                        <motion.div key="stack" exit={{ opacity: 0, x: -50 }} className="w-full">
                            <SelectionDisplay
                                title="Choose Your Path"
                                subtitle="What technology do you want to master today?"
                                options={stacks}
                                onSelect={handleStackSelect}
                            />
                        </motion.div>
                    )}

                    {step === 'level' && (
                        <motion.div
                            key="level"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="w-full"
                        >
                            <SelectionDisplay
                                title="Select Difficulty"
                                subtitle={`How experienced are you with ${selectedStack}?`}
                                options={levels}
                                onSelect={handleLevelSelect}
                            />
                            <div className="text-center mt-8">
                                <Button variant="ghost" onClick={() => setStep('stack')}>Back</Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 'dashboard' && (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col lg:flex-row gap-8"
                        >
                            {/* Main Content: Learning Path */}
                            <div className="flex-1">
                                <div className="flex justify-between items-end mb-8">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-bold px-2 py-1 rounded bg-primary/20 text-primary uppercase tracking-wider">
                                                {selectedStack} • {selectedLevel}
                                            </span>
                                            <Button variant="ghost" size="sm" onClick={handleReset} className="h-6 text-xs text-muted-foreground">Change</Button>
                                        </div>
                                        <h1 className="text-4xl font-display font-bold">My Learning Path</h1>
                                    </div>

                                    <a href={getRoadmapLink(selectedStack)} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="gap-2">
                                            <Map className="w-4 h-4" />
                                            View Full Roadmap
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </a>
                                </div>

                                <LevelMap category={selectedStack} difficulty={selectedLevel} />
                            </div>

                            {/* Sidebar: Gamification Stats */}
                            <div className="w-full lg:w-96 space-y-6">
                                <GamificationDashboard />

                                <div className="bg-card border border-border/50 rounded-xl p-6">
                                    <h3 className="font-semibold mb-4">Daily Quests</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-sm">
                                            <div className="w-4 h-4 rounded-full border border-primary"></div>
                                            <span>Complete 1 Level</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MargaDashboard;
