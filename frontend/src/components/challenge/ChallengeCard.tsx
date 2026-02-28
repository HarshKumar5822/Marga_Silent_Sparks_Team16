import { motion } from 'framer-motion';
import { Lock, CheckCircle2, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Challenge } from '@/data/mockData';

interface ChallengeCardProps {
  challenge: Challenge;
  index: number;
}

const difficultyColors: Record<string, string> = {
  beginner: 'from-cq-green to-emerald-600',
  intermediate: 'from-cq-cyan to-blue-600',
  advanced: 'from-cq-purple to-pink-600',
  Easy: 'from-cq-green to-emerald-600',
  Medium: 'from-cq-cyan to-blue-600',
  Hard: 'from-cq-purple to-pink-600',
};

const difficultyLabels: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  Easy: 'Beginner',
  Medium: 'Intermediate',
  Hard: 'Advanced',
};

const ChallengeCard = ({ challenge, index }: ChallengeCardProps) => {
  const isAccessible = !challenge.isLocked;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={isAccessible ? { scale: 1.02, y: -5 } : {}}
      className={`relative group ${!isAccessible ? 'opacity-60' : ''}`}
    >
      {isAccessible ? (
        <Link to={`/challenge/${challenge._id || challenge.id}`}>
          <CardContent challenge={challenge} />
        </Link>
      ) : (
        <CardContent challenge={challenge} />
      )}

      {/* Lock overlay */}
      {challenge.isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <Lock className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Complete previous challenge</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const CardContent = ({ challenge }: { challenge: Challenge }) => (
  <div className="relative p-6 rounded-xl border border-border/50 bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden">
    {/* Gradient accent */}
    <div
      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${difficultyColors[challenge.difficulty]}`}
    />

    {/* Completed badge */}
    {challenge.isCompleted && (
      <div className="absolute top-4 right-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-1 px-2 py-1 rounded-full bg-cq-green/20 text-cq-green text-xs font-medium"
        >
          <CheckCircle2 className="h-3 w-3" />
          Completed
        </motion.div>
      </div>
    )}

    {/* Category */}
    <span className="text-xs text-muted-foreground uppercase tracking-wider">
      {challenge.category || challenge.type || 'General'}
    </span>

    {/* Title */}
    <h3 className="mt-2 font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
      {challenge.title}
    </h3>

    {/* Description */}
    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
      {challenge.description}
    </p>

    {/* Footer */}
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Difficulty */}
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r ${difficultyColors[challenge.difficulty]} text-cq-dark`}
        >
          {difficultyLabels[challenge.difficulty]}
        </span>

        {/* XP Reward */}
        <div className="flex items-center gap-1 text-cq-gold">
          <Star className="h-4 w-4" />
          <span className="text-sm font-semibold">{challenge.xpReward} XP</span>
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </div>
  </div>
);

export default ChallengeCard;
