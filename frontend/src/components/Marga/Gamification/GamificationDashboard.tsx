import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Medal } from 'lucide-react';

interface Badge {
    _id: string;
    name: string;
    description: string;
    iconUrl: string;
    rarity: string;
}

interface UserProgress {
    totalXp: number;
    level: number;
    unlockedBadges: { badge: Badge; unlockedAt: string }[];
    currentStreak: number;
}

const GamificationDashboard: React.FC = () => {
    const [progress, setProgress] = useState<UserProgress | null>(null);
    const [loading, setLoading] = useState(true);

    // Mock fetch for now, replace with actual API call
    // const fetchProgress = async () => {
    //   const res = await fetch('/api/gamification/progress'); ...
    // }

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const userInfoStr = localStorage.getItem('userInfo');
                const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
                const token = userInfo?.token;

                if (!token) {
                    setLoading(false);
                    return;
                }

                const res = await fetch('http://localhost:5000/api/gamification/progress', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setProgress(data);
                }
            } catch (error) {
                console.error("Failed to fetch progress", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, []);

    if (loading) return <div className="p-4 text-center">Loading stats...</div>;

    return (
        <div className="bg-card border border-border/50 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-foreground">Your Progress</h2>
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary font-bold">
                    <Star className="w-5 h-5 fill-current" />
                    <span>Level {progress?.level}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center">
                    <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
                    <span className="text-2xl font-bold">{progress?.totalXp}</span>
                    <span className="text-muted-foreground text-sm">Total XP</span>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center">
                    <Medal className="w-8 h-8 text-blue-500 mb-2" />
                    <span className="text-2xl font-bold">{progress?.unlockedBadges.length}</span>
                    <span className="text-muted-foreground text-sm">Badges Earned</span>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center">
                    <span className="text-3xl">🔥</span>
                    <span className="text-2xl font-bold">{progress?.currentStreak} Days</span>
                    <span className="text-muted-foreground text-sm">Current Streak</span>
                </div>
            </div>

            <h3 className="text-lg font-semibold mb-3">Recent Badges</h3>
            <div className="flex flex-wrap gap-3">
                {progress?.unlockedBadges.map((item) => (
                    <motion.div
                        key={item.badge._id}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border/50 max-w-xs"
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                            {item.badge.name[0]}
                        </div>
                        <div>
                            <p className="font-semibold text-sm">{item.badge.name}</p>
                            <p className="text-xs text-muted-foreground">{item.badge.rarity}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default GamificationDashboard;
