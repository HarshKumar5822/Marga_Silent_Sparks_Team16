import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Play, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Level {
    _id: string;
    levelNumber: number;
    title: string;
    description: string;
    challenges: string[]; // Array of Challenge IDs
}

interface LevelMapProps {
    category?: string;
    difficulty?: string;
}

const LevelMap: React.FC<LevelMapProps> = ({ category, difficulty }) => {
    const [levels, setLevels] = useState<Level[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLevels = async () => {
            try {
                // Need authentication token typically, simplified for now
                // Get token from userInfo object
                const userInfoStr = localStorage.getItem('userInfo');
                const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
                const token = userInfo?.token;

                const headers = token ? {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                } : {
                    'Content-Type': 'application/json'
                };

                let url = 'https://marga-silent-sparks-team16-2.onrender.com/api/learning/levels';
                const params = new URLSearchParams();
                if (category) params.append('category', category);
                if (difficulty) params.append('difficulty', difficulty);
                if (params.toString()) url += `?${params.toString()}`;

                const res = await fetch(url, { headers });
                const data = await res.json();
                if (Array.isArray(data)) {
                    setLevels(data);
                }
            } catch (error) {
                console.error("Failed to fetch levels", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLevels();
    }, [category, difficulty]);

    if (loading) return <div>Loading Universe...</div>;

    if (levels.length === 0 && !loading) {
        return (
            <div className="text-center py-12 border border-border/50 rounded-xl bg-card">
                <p className="text-muted-foreground">No levels found for this path yet.</p>
                <p className="text-sm text-muted-foreground mt-2">Our galaxy is still expanding!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {levels.map((level, index) => (
                <motion.div
                    key={level._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 pb-8 border-l-2 border-primary/30 last:border-l-0 last:pb-0"
                >
                    <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                        {level.levelNumber}
                    </div>
                    <Link to={level.challenges && level.challenges.length > 0 ? `/challenge/${level.challenges[0]}?from=learning-path` : '/challenges?from=learning-path'}>
                        <div className="bg-card border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors group cursor-pointer h-full">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-display font-bold text-lg">{level.title}</h3>
                                    <p className="text-muted-foreground text-sm">{level.description}</p>
                                </div>
                                <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    <Play className="w-5 h-5 ml-0.5" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
};

export default LevelMap;
