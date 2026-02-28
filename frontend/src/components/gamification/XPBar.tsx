import { motion } from 'framer-motion';

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const XPBar = ({ currentXP = 0, maxXP = 100, level = 1, showLabels = true, size = 'md' }: XPBarProps) => {
  const safeCurrent = currentXP || 0;
  const safeMax = maxXP || 100;
  const safeLevel = level || 1;
  const progress = (safeCurrent / safeMax) * 100;

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {showLabels && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="level-badge px-3 py-1 rounded-full text-sm">
              LVL {safeLevel}
            </div>
          </div>
          <span className="text-sm text-muted-foreground font-mono">
            {safeCurrent.toLocaleString()} / {safeMax.toLocaleString()} XP
          </span>
        </div>
      )}

      <div className={`relative w-full ${sizeClasses[size]} bg-muted rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 xp-bar rounded-full"
        />

        {/* Shine effect */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      </div>
    </div>
  );
};

export default XPBar;
