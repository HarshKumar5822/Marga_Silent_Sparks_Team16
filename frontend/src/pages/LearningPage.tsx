import React, { useState } from 'react';
import { SkillDashboard } from '../components/SkillDashboard';
import { LearningPathMap } from '../components/LearningPathMap';
import { AdaptiveQuiz } from '../components/AdaptiveQuiz';

// Mock data integration (replace with API calls)
const mockSkills = {
    'React': { level: 'Intermediate', score: 75, confidence: 90 },
    'Node.js': { level: 'Beginner', score: 40, confidence: 60 },
    'MongoDB': { level: 'Intermediate', score: 65, confidence: 80 }
};

const mockPath = {
    nodes: [
        { skillNode: { _id: '1', name: 'Intro to React', category: 'Frontend' }, status: 'Completed', score: 90 },
        { skillNode: { _id: '2', name: 'Components & Props', category: 'Frontend' }, status: 'In Progress', score: 0 },
        { skillNode: { _id: '3', name: 'State & Hooks', category: 'Frontend' }, status: 'Locked', score: 0 }
    ]
};

const LearningPage = () => {
    const [view, setView] = useState<'map' | 'quiz'>('map');
    const [activeNode, setActiveNode] = useState<string | null>(null);

    const handleNodeClick = (nodeId: string) => {
        // Logic: Only allow clicking if unlocked/in-progress
        console.log("Clicked node:", nodeId);
        setActiveNode(nodeId);
        setView('quiz');
    };

    const handleQuizComplete = (score: number, passed: boolean) => {
        alert(`Quiz Finished! Score: ${score}. Passed: ${passed}`);
        setView('map');
    };

    return (
        <div className="container mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                My Learning Journey
            </h1>

            <SkillDashboard skills={mockSkills} />

            <div className="border-t pt-8">
                <h2 className="text-2xl font-semibold mb-4">Adaptive Path</h2>

                {view === 'map' ? (
                    <LearningPathMap path={mockPath} onNodeClick={handleNodeClick} />
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4">
                        <button
                            onClick={() => setView('map')}
                            className="mb-4 text-sm text-blue-500 hover:underline"
                        >
                            &larr; Back to Map
                        </button>
                        <AdaptiveQuiz
                            nodeId={activeNode!}
                            nodeName="Components & Props" // Mock
                            onComplete={handleQuizComplete}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LearningPage;
