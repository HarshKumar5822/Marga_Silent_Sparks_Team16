import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Flame,
  Award,
  ChevronRight,
  Zap,
  BookOpen,
  Clock,
  Code,
  Users,
  ExternalLink,
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  PolarAngleAxis,
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import Navbar from '@/components/layout/Navbar';
import XPBar from '@/components/gamification/XPBar';
import Badge from '@/components/gamification/Badge';
import StreakCounter from '@/components/gamification/StreakCounter';
import ChallengeCard from '@/components/challenge/ChallengeCard';
import { Button } from '@/components/ui/button';
import { mockUser, mockChallenges, mockLinkedInProfiles } from '@/data/mockData';

const Dashboard = () => {
  const [language, setLanguage] = useState("javascript");
  const [challenges, setChallenges] = useState<any[]>([]);
  const [userStats, setUserStats] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [challengesRes, statsRes] = await Promise.all([
          api.get('/challenges'),
          api.get('/gamification/progress')
        ]);
        setChallenges(challengesRes.data);
        setUserStats(statsRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Fallback to mock data if API fails
        setUserStats(mockUser);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const displayChallenges = challenges.length > 0 ? challenges : mockChallenges;
  const recentChallenges = displayChallenges.slice(0, 4);
  const recommendedChallenge = displayChallenges.find(c => !c.isCompleted && !c.isLocked);

  if (!userStats) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn onLogout={handleLogout} />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Welcome back, <span className="text-primary">{JSON.parse(localStorage.getItem('userInfo') || '{}').name || JSON.parse(localStorage.getItem('userInfo') || '{}').username || 'Adventurer'}</span>! 👋
              </h1>
              <p className="text-muted-foreground">
                Continue your quest and conquer new challenges today.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-card p-2 rounded-lg border border-border/50">
              <Code className="h-5 w-5 text-muted-foreground" />
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px] bg-background/50 border-border/50 text-foreground">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                  <SelectItem value="ruby">Ruby</SelectItem>
                  <SelectItem value="php">PHP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* XP Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="col-span-1 md:col-span-2 p-6 rounded-2xl border border-border/50 bg-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Your Progress</h3>
                      <p className="text-sm text-muted-foreground">Keep pushing forward!</p>
                    </div>
                  </div>
                  <StreakCounter streak={userStats.streak || 0} />
                </div>

                <XPBar
                  currentXP={userStats.currentXP}
                  maxXP={userStats.xpToNextLevel}
                  level={userStats.level}
                  size="lg"
                />
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-display text-2xl font-bold text-foreground">
                    {userStats.totalXP ? userStats.totalXP.toLocaleString() : 0}
                  </p>
                  <p className="text-xs text-muted-foreground">Total XP</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-display text-2xl font-bold text-foreground">
                    {userStats.completedChallenges ? userStats.completedChallenges.length : 0}
                  </p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-display text-2xl font-bold text-cq-gold">
                    {userStats.badges ? userStats.badges.filter((b: any) => b.isEarned).length : 0}
                  </p>
                  <p className="text-xs text-muted-foreground">Badges</p>
                </div>
              </div>
            </motion.div>

            {/* Knowledge Profiling Radar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl border border-border/50 bg-card flex flex-col"
            >
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-5 w-5 text-cq-purple" />
                <h3 className="font-semibold text-foreground">Skill Profile</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Adaptive knowledge graph</p>

              <div className="flex-1 min-h-[200px] -ml-4 -mr-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                    { subject: 'Logic', A: userStats.skillLevels?.logic || 50, fullMark: 100 },
                    { subject: 'Syntax', A: userStats.skillLevels?.syntax || 50, fullMark: 100 },
                    { subject: 'Algo', A: userStats.skillLevels?.algorithms || 50, fullMark: 100 },
                    { subject: 'Debug', A: userStats.skillLevels?.debugging || 50, fullMark: 100 },
                    { subject: 'Speed', A: userStats.skillLevels?.speed || 50, fullMark: 100 },
                    { subject: 'Clean', A: userStats.skillLevels?.cleanCode || 50, fullMark: 100 },
                  ]}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Student"
                      dataKey="A"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.4}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-card border border-border/50 p-3 rounded-lg shadow-xl shadow-black/50">
                              <p className="font-semibold text-foreground mb-1">{payload[0].payload.subject}</p>
                              <p className="text-sm text-cq-purple font-mono">
                                Level: {payload[0].value} / 100
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Quick Action Card moved down to its own row with Badges or full width */}

            {/* Quick Action Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl border border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10"
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Continue Learning</h3>
              </div>

              {recommendedChallenge && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Recommended for you:</p>
                  <p className="font-display font-semibold text-foreground">
                    {recommendedChallenge.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-cq-gold">+{recommendedChallenge.xpReward} XP</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {recommendedChallenge.difficulty}
                    </span>
                  </div>
                </div>
              )}

              <Link to={recommendedChallenge ? `/challenge/${recommendedChallenge._id || recommendedChallenge.id}` : '/challenges'}>
                <Button variant="hero" className="w-full gap-2">
                  <BookOpen className="h-4 w-4" />
                  Start Challenge
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Badges Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 p-6 rounded-2xl border border-border/50 bg-card"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cq-gold/10">
                  <Award className="h-5 w-5 text-cq-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Your Badges</h3>
                  <p className="text-sm text-muted-foreground">
                    {userStats.badges ? userStats.badges.filter((b: any) => b.isEarned).length : 0} of {userStats.badges ? userStats.badges.length : 0} earned
                  </p>
                </div>
              </div>
              <Link to="/badges">
                <Button variant="default" size="sm" className="gap-1 bg-primary/20 text-primary hover:bg-primary/30 border border-primary/20">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6">
              {userStats.badges && userStats.badges.length > 0 ? (
                userStats.badges.slice(0, 6).map((badge: any, index: number) => (
                  <Badge
                    key={badge.id || index}
                    icon={badge.icon}
                    name={badge.name}
                    description={badge.description}
                    isEarned={badge.isEarned}
                  />
                ))
              ) : (
                <div className="text-muted-foreground text-sm p-4 w-full text-center border border-dashed rounded-xl border-border/50">
                  Complete challenges to earn your first badge!
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Available Challenges</h3>
                  <p className="text-sm text-muted-foreground">Pick up where you left off</p>
                </div>
              </div>
              <Link to="/challenges">
                <Button variant="default" size="sm" className="gap-1 bg-primary/20 text-primary hover:bg-primary/30 border border-primary/20">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {recentChallenges.map((challenge, index) => (
                <ChallengeCard key={challenge._id || challenge.id} challenge={challenge} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Recommended Experts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Recommended Experts in {language.charAt(0).toUpperCase() + language.slice(1)}</h3>
                  <p className="text-sm text-muted-foreground">AI-Curated network matches based on your tech stack</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockLinkedInProfiles.filter(profile => profile.techStack === language || (language === 'typescript' && profile.techStack === 'javascript')).slice(0, 10).map((profile) => (
                <div key={profile.id} className="p-5 rounded-2xl border border-border/50 bg-[#161616] hover:bg-[#1a1a1b] transition-colors relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50"></div>
                  <div className="flex items-start gap-4">
                    <img src={profile.imageUrl} alt={profile.name} className="w-12 h-12 rounded-full border border-white/10" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-200">{profile.name}</h4>
                      <p className="text-xs text-blue-400 mb-1">{profile.role} at {profile.company}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {profile.skills.map(skill => (
                          <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full mt-4 gap-2 border-blue-500/20 text-blue-400 hover:bg-blue-500/10">
                      View LinkedIn Profile <ExternalLink className="h-3 w-3" />
                    </Button>
                  </a>
                </div>
              ))}

              {mockLinkedInProfiles.filter(profile => profile.techStack === language || (language === 'typescript' && profile.techStack === 'javascript')).length === 0 && (
                <div className="col-span-full p-8 text-center border border-dashed border-border/50 rounded-2xl bg-card/50">
                  <Users className="h-8 w-8 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">Networking AI is currently analyzing profiles for {language}.<br />Check back later for curated connections.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
