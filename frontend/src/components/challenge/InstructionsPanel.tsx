import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Lightbulb, CheckCircle2, Circle, BookOpen, PenLine } from 'lucide-react';
import { ChallengeStep } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import NotesPanel from './NotesPanel';

interface InstructionsPanelProps {
  title: string;
  description: string;
  steps: ChallengeStep[];
  currentStepIndex: number;
  onStepComplete?: (stepId: number) => void;
  showHint?: boolean;
  onHintToggle?: () => void;
  challengeId: string;
}

const InstructionsPanel = ({
  title,
  description,
  steps,
  currentStepIndex,
  onStepComplete,
  challengeId,
}: InstructionsPanelProps) => {
  const [activeTab, setActiveTab] = useState<'instructions' | 'notes'>('instructions');
  const [expandedStep, setExpandedStep] = useState<number | null>(currentStepIndex);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className="h-full flex flex-col rounded-xl border border-border/50 bg-card overflow-hidden">
      {/* Tabs Header */}
      <div className="flex border-b border-border/50 bg-muted/30">
        <button
          onClick={() => setActiveTab('instructions')}
          className={cn(
            "flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2",
            activeTab === 'instructions'
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          <BookOpen className="h-4 w-4" />
          Instructions
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={cn(
            "flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2",
            activeTab === 'notes'
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          <PenLine className="h-4 w-4" />
          Notes
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'notes' ? (
          <NotesPanel challengeId={challengeId} />
        ) : (
          <div className="flex flex-col h-full">
            {/* Header Content for Instructions */}
            <div className="p-4 border-b border-border/50 bg-muted/10">
              <h2 className="font-display text-xl font-bold text-foreground">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p>
            </div>

            {/* Progress indicator */}
            <div className="px-4 py-2 border-b border-border/50 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-mono text-foreground font-medium">
                {currentStepIndex + 1}/{steps.length}
              </span>
            </div>

            {/* Steps list */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
              {steps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const isLocked = index > currentStepIndex;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-lg border transition-all ${isCurrent
                      ? 'border-primary bg-primary/5'
                      : isCompleted
                        ? 'border-cq-green/30 bg-cq-green/5'
                        : 'border-border/50 bg-muted/20 opacity-50'
                      }`}
                  >
                    <button
                      onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                      className="w-full flex items-start gap-3 p-3 text-left"
                      disabled={isLocked}
                    >
                      {/* Status icon */}
                      <div className="mt-0.5">
                        {isCompleted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring' }}
                          >
                            <CheckCircle2 className="h-5 w-5 text-cq-green" />
                          </motion.div>
                        ) : isCurrent ? (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Circle className="h-5 w-5 text-primary fill-primary/20" />
                          </motion.div>
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground/50" />
                        )}
                      </div>

                      {/* Step content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground">
                            Step {step.id}
                          </span>
                          {isCurrent && (
                            <span className="text-xs font-medium text-primary px-2 py-0.5 rounded-full bg-primary/10">
                              Current
                            </span>
                          )}
                        </div>
                        <p className={`mt-1 text-sm font-medium ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                          {step.instruction}
                        </p>
                      </div>

                      {/* Expand indicator */}
                      <ChevronRight
                        className={`h-4 w-4 text-muted-foreground transition-transform ${expandedStep === index ? 'rotate-90' : ''
                          }`}
                      />
                    </button>

                    {/* Expanded content */}
                    {expandedStep === index && !isLocked && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-3 pb-3"
                      >
                        {/* Details if needed */}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Action button */}
            <div className="p-4 border-t border-border/50 space-y-3">
              <Button
                variant="outline"
                className="w-full gap-2 border-cq-gold/50 text-cq-gold hover:bg-cq-gold/10 hover:text-cq-gold"
                onClick={() => setIsGuideOpen(true)}
              >
                <Lightbulb className="h-4 w-4" />
                Mission Guide & Hints
              </Button>

              <Button
                variant="success"
                className="w-full"
                onClick={() => onStepComplete?.(steps[currentStepIndex]?.id)}
                disabled={currentStepIndex >= steps.length}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {currentStepIndex >= steps.length ? 'Challenge Complete!' : 'Mark Step Complete'}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Guide Modal */}
      <AnimatePresence>
        {isGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGuideOpen(false)}
              className="absolute inset-0 bg-cq-dark/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-6 border-b border-border/50 flex items-center justify-between bg-muted/30">
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Mission Briefing
                  </h3>
                  <p className="text-sm text-muted-foreground">Detailed instructions and field notes</p>
                </div>
                <button
                  onClick={() => setIsGuideOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-foreground border-b border-border/50 pb-2">
                    Current Objective: Step {currentStepIndex + 1}
                  </h4>
                  <p className="text-lg text-foreground/90">
                    {steps[currentStepIndex]?.instruction}
                  </p>
                </div>

                <div className="rounded-lg bg-cq-gold/5 border border-cq-gold/20 p-5">
                  <h4 className="flex items-center gap-2 font-semibold text-cq-gold mb-3">
                    <Lightbulb className="h-5 w-5" />
                    Field Notes (Hint)
                  </h4>
                  <p className="text-foreground/80 leading-relaxed">
                    {steps[currentStepIndex]?.hint}
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                    Mission Context
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-border/50 bg-muted/20 flex justify-end">
                <Button variant="outline" onClick={() => setIsGuideOpen(false)}>
                  Close Briefing
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstructionsPanel;
