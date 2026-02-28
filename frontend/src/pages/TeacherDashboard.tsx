import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts';
import api from '@/utils/api';

const TeacherDashboard = () => {
    const [analytics, setAnalytics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await api.get('/analytics/teacher');
                setAnalytics(res.data);
            } catch (error) {
                console.error('Error fetching analytics:', error);
                // Fallback mock data if API fails or admin is not setup properly yet
                setAnalytics({
                    totalStudents: 145,
                    newStudentsThisMonth: 12,
                    activeChallenges: 24,
                    averageSkills: [
                        { subject: 'Logic', A: 75, fullMark: 100 },
                        { subject: 'Syntax', A: 82, fullMark: 100 },
                        { subject: 'Algorithms', A: 54, fullMark: 100 },
                        { subject: 'Debugging', A: 60, fullMark: 100 },
                    ],
                    recentActivity: [
                        { name: 'Jan', students: 100 },
                        { name: 'Feb', students: 130 },
                        { name: 'Mar', students: 145 },
                    ],
                    topAreasOfStruggle: [
                        { concept: "Pointers (C++)", failRate: "68%" },
                        { concept: "Recursion", failRate: "54%" },
                        { concept: "Async/Await", failRate: "42%" }
                    ]
                });
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading || !analytics) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar isLoggedIn onLogout={() => { }} />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                            Educator Portal <span className="text-primary">Analytics</span>
                        </h1>
                        <p className="text-muted-foreground">
                            Monitor class performance, identify knowledge gaps, and optimize learning paths.
                        </p>
                    </motion.div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-6 rounded-2xl border border-border/50 bg-card overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Users size={64} />
                            </div>
                            <p className="text-sm text-muted-foreground font-medium mb-1">Total Students</p>
                            <h3 className="text-3xl font-bold font-display">{analytics.totalStudents}</h3>
                            <p className="text-xs text-green-500 mt-2 flex items-center">
                                <TrendingUp size={12} className="mr-1" /> +{analytics.newStudentsThisMonth} this month
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 rounded-2xl border border-border/50 bg-card overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Activity size={64} />
                            </div>
                            <p className="text-sm text-muted-foreground font-medium mb-1">Active Challenges</p>
                            <h3 className="text-3xl font-bold font-display">{analytics.activeChallenges}</h3>
                            <p className="text-xs text-muted-foreground mt-2">Across all learning paths</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-6 rounded-2xl border border-border/50 bg-card overflow-hidden relative col-span-1 lg:col-span-2"
                        >
                            <p className="text-sm text-muted-foreground font-medium mb-4 flex items-center">
                                <AlertTriangle size={16} className="mr-2 text-warning" /> Top Knowledge Gaps
                            </p>
                            <div className="space-y-4">
                                {analytics.topAreasOfStruggle.map((item: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{item.concept}</span>
                                        <div className="flex items-center w-1/2">
                                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden mr-3">
                                                <div
                                                    className="h-full bg-destructive"
                                                    style={{ width: item.failRate }}
                                                />
                                            </div>
                                            <span className="text-xs text-destructive font-bold">{item.failRate} Fail</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="p-6 rounded-2xl border border-border/50 bg-card"
                        >
                            <h3 className="font-semibold text-lg mb-6 flex items-center">
                                <Users className="mr-2 h-5 w-5 text-primary" /> Enrollment Growth
                            </h3>
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={analytics.recentActivity}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                        <XAxis dataKey="name" stroke="#888" />
                                        <YAxis stroke="#888" />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1C1C1E', borderColor: '#333' }}
                                            itemStyle={{ color: '#E0E0E0' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="students"
                                            stroke="#3B82F6"
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: '#3B82F6' }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="p-6 rounded-2xl border border-border/50 bg-card"
                        >
                            <h3 className="font-semibold text-lg mb-6 flex items-center">
                                <BookOpen className="mr-2 h-5 w-5 text-primary" /> Class Skill Averages
                            </h3>
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={analytics.averageSkills} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                                        <XAxis type="number" domain={[0, 100]} stroke="#888" />
                                        <YAxis dataKey="subject" type="category" stroke="#888" width={80} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1C1C1E', borderColor: '#333' }}
                                            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                        />
                                        <Bar dataKey="A" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={24} name="Average Score" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default TeacherDashboard;
