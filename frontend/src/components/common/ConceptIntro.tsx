import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { introData, IntroStep } from '@/data/introData';

interface ConceptIntroProps {
    onComplete: () => void;
    title: string;
    conceptId?: string;
}

const Avatar = ({ character }: { character: string }) => {
    if (character === 'Robo-9000') {
        return (
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="25" y="25" width="50" height="50" rx="10" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                <rect x="35" y="40" width="30" height="20" fill="#0f172a" />
                <circle cx="40" cy="50" r="3" fill="#ef4444" className="animate-ping" />
                <circle cx="60" cy="50" r="3" fill="#22c55e" />
                <path d="M 20 50 L 25 50" stroke="#94a3b8" strokeWidth="4" />
                <path d="M 75 50 L 80 50" stroke="#94a3b8" strokeWidth="4" />
                <path d="M 40 85 L 60 85 L 50 75 Z" fill="#64748b" />
            </svg>
        );
    }
    if (character === 'Nova') {
        return (
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="40" fill="url(#grad1)" stroke="#d8b4fe" strokeWidth="2" />
                <path d="M 30 50 Q 50 70 70 50" stroke="white" strokeWidth="3" fill="none" />
                <circle cx="35" cy="40" r="5" fill="white" />
                <circle cx="65" cy="40" r="5" fill="white" />
                <circle cx="35" cy="40" r="2" fill="#581c87" />
                <circle cx="65" cy="40" r="2" fill="#581c87" />
                {/* Hair */}
                <path d="M 10 50 Q 20 10 50 10 Q 80 10 90 50" stroke="#e9d5ff" strokeWidth="4" fill="none" />
            </svg>
        );
    }
    // Captain Bit (Default)
    return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="50" cy="50" r="40" fill="#0f172a" />
            <path d="M 25 35 Q 50 15 75 35" stroke="#38bdf8" strokeWidth="3" fill="none" opacity="0.5" />
            <circle cx="35" cy="45" r="5" fill="white" />
            <circle cx="65" cy="45" r="5" fill="white" />
            <path d="M 40 65 Q 50 75 60 65" stroke="white" strokeWidth="3" fill="none" />
            <line x1="50" y1="5" x2="50" y2="-15" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="50" cy="-15" r="3" fill="#ef4444" className="animate-pulse" />
        </svg>
    );
};

const ConceptIntro = ({ onComplete, title, conceptId }: ConceptIntroProps) => {
    const [step, setStep] = useState(0);

    const steps: IntroStep[] = (conceptId && introData[conceptId])
        ? introData[conceptId]
        : introData['default'];

    const currentStep = steps[step];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const isRight = currentStep.position === 'right';

    return (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
                key={step} // Re-animate container slightly on step change
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`relative max-w-2xl w-full bg-slate-900/90 border border-blue-500/30 rounded-2xl shadow-[0_0_50px_rgba(56,189,248,0.2)] overflow-hidden flex flex-col ${isRight ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
                {/* Floating Emojis Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {currentStep.emojis?.map((emoji, index) => (
                        <motion.div
                            key={`${step}-emoji-${index}`}
                            initial={{ opacity: 0, y: 50, scale: 0 }}
                            animate={{
                                opacity: [0, 1, 1, 0],
                                y: -100,
                                x: Math.sin(index * 100) * 50, // Slight wave
                                scale: 1
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: index * 0.5,
                                ease: "easeInOut"
                            }}
                            className="absolute text-4xl opacity-20"
                            style={{
                                left: `${20 + index * 30}%`,
                                top: '80%',
                            }}
                        >
                            {emoji}
                        </motion.div>
                    ))}
                </div>

                {/* Close Button */}
                <button
                    onClick={onComplete}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white z-50 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Avatar Side */}
                <div className={`w-full md:w-1/3 bg-slate-800/50 p-6 flex flex-col items-center justify-center ${isRight ? 'md:border-l border-blue-500/20' : 'md:border-r border-blue-500/20'} border-b md:border-b-0`}>
                    <motion.div
                        key={`avatar-${step}`}
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{
                            scale: 1,
                            rotate: 0,
                            y: [0, -10, 0] // Bobbing animation
                        }}
                        transition={{
                            type: "spring", stiffness: 200, damping: 15,
                            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="w-32 h-32 mb-4 filter drop-shadow-xl"
                    >
                        <Avatar character={currentStep.character} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center relative z-10"
                    >
                        <h3 className="text-blue-400 font-display font-bold text-lg">{currentStep.character}</h3>
                        <p className="text-slate-400 text-xs uppercase tracking-wider">Mission Guide</p>
                    </motion.div>
                </div>

                {/* Content Side */}
                <div className="flex-1 p-8 flex flex-col justify-between min-h-[300px] relative z-10">
                    <div className="space-y-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: isRight ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: isRight ? 20 : -20 }}
                                className="space-y-4"
                            >
                                <p className="text-xl md:text-2xl font-light leading-relaxed text-white">
                                    "{currentStep.text}"
                                </p>
                                {currentStep.mediaUrl && (
                                    <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
                                        <img src={currentStep.mediaUrl} alt="Visual explanation" className="w-full h-auto object-cover" />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Progress & Next Button */}
                    <div className="mt-8 space-y-6">
                        <div className="flex gap-2">
                            {steps.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-blue-500' : 'bg-slate-700'}`}
                                />
                            ))}
                        </div>

                        <div className="flex justify-end">
                            <Button
                                onClick={handleNext}
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-500 text-white gap-2 px-8"
                            >
                                {step === steps.length - 1 ? "Start Mission" : "Next"}
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ConceptIntro;

