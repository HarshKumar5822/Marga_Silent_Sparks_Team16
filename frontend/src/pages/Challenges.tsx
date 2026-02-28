import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Layers } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import ChallengeCard from '@/components/challenge/ChallengeCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/utils/api';

// Define interface matching backend response + frontend needs
interface Challenge {
  _id: string;
  id?: string; // Fallback
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpReward: number;
  category: string;
  isLocked?: boolean;
  isCompleted?: boolean;
  type?: string;
}

type FilterType = 'all' | 'beginner' | 'intermediate' | 'advanced';
type StatusType = 'all' | 'completed' | 'inProgress' | 'locked';

const Challenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<StatusType>('all');

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await api.get('/challenges');
        console.log("Challenges API Response:", res.data);
        setChallenges(res.data);
      } catch (error) {
        console.error("Failed to fetch challenges API ERROR:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  const filteredChallenges = challenges.filter(challenge => {
    // Search filter
    if (searchQuery && !challenge.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Difficulty filter (Backend uses PascalCase 'Easy', 'Medium', 'Hard')
    if (difficultyFilter !== 'all') {
      const diffMap: Record<string, string> = { 'beginner': 'Easy', 'intermediate': 'Medium', 'advanced': 'Hard' };
      if (challenge.difficulty !== diffMap[difficultyFilter]) return false;
    }

    // Status filter
    if (statusFilter === 'completed' && !challenge.isCompleted) return false;
    if (statusFilter === 'inProgress' && (challenge.isCompleted || challenge.isLocked)) return false;
    if (statusFilter === 'locked' && !challenge.isLocked) return false;

    return true;
  });

  const difficulties: FilterType[] = ['all', 'beginner', 'intermediate', 'advanced'];
  const statuses: { value: StatusType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'completed', label: 'Completed' },
    { value: 'inProgress', label: 'In Progress' },
    { value: 'locked', label: 'Locked' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Loading challenges...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Challenges
              </h1>
            </div>
            <p className="text-muted-foreground">
              Choose your next adventure and level up your skills
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 space-y-4"
          >
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search challenges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/20"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex flex-col gap-6">
              {/* Difficulty */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-2 min-w-[100px]">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Difficulty:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((diff) => (
                    <Button
                      key={diff}
                      variant={difficultyFilter === diff ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setDifficultyFilter(diff)}
                      className={`capitalize ${difficultyFilter !== diff ? 'text-muted-foreground hover:text-foreground' : ''}`}
                    >
                      {diff}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-2 min-w-[100px]">
                  <span className="text-sm font-medium text-muted-foreground pl-6">Status:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <Button
                      key={status.value}
                      variant={statusFilter === status.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setStatusFilter(status.value)}
                      className={statusFilter !== status.value ? 'text-muted-foreground hover:text-foreground' : ''}
                    >
                      {status.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredChallenges.length} of {challenges.length} challenges
          </p>

          {/* Challenge Grid without Category Grouping */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge, index) => (
              <ChallengeCard key={challenge._id || challenge.id} challenge={challenge as any} index={index} />
            ))}
          </div>

          {/* Empty state */}
          {filteredChallenges.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No challenges found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Challenges;
