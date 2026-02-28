import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Brain, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Question {
    question: string;
    options: string[];
    correctOption: number;
    explanation: string;
}

interface QuizViewProps {
    title: string;
    questions: Question[];
    onComplete: (score: number) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ title, questions, onComplete }) => {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const currentQuestion = questions[currentQuestionIdx];

    const handleOptionSelect = (idx: number) => {
        if (isAnswered) return;
        setSelectedOption(idx);
    };

    const checkAnswer = () => {
        if (selectedOption === null) return;

        setIsAnswered(true);
        const isCorrect = selectedOption === currentQuestion.correctOption;

        if (isCorrect) {
            setScore(prev => prev + 1);
            toast.success('Correct!', { icon: '🎉' });
        } else {
            toast.error('Incorrect', { icon: '❌' });
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIdx < questions.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResult(true);
        }
    };

    if (showResult) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="max-w-2xl mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-card border border-border/50 rounded-2xl p-12 shadow-xl w-full"
                >
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                        <Brain className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
                    <p className="text-muted-foreground mb-8 text-lg">You scored {score} out of {questions.length}</p>

                    <div className="w-full bg-secondary h-4 rounded-full overflow-hidden mb-8">
                        <div
                            className={`h-full ${percentage >= 70 ? 'bg-green-500' : 'bg-yellow-500'}`}
                            style={{ width: `${percentage}%` }}
                        />
                    </div>

                    <Button onClick={() => onComplete(score)} size="lg" className="w-full">
                        Continue Journey <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">{title}</h1>
                <span className="text-muted-foreground font-mono">Q{currentQuestionIdx + 1}/{questions.length}</span>
            </div>

            <div className="w-full bg-secondary h-2 rounded-full mb-12">
                <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIdx) / questions.length) * 100}%` }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-card border border-border/50 rounded-xl p-8 shadow-sm"
                >
                    <h3 className="text-xl font-medium mb-8 leading-relaxed">{currentQuestion.question}</h3>

                    <div className="space-y-4">
                        {currentQuestion.options.map((option, idx) => {
                            let variant = "bg-secondary/50 border-transparent hover:border-primary/50";
                            if (selectedOption === idx) variant = "border-primary bg-primary/10";

                            if (isAnswered) {
                                if (idx === currentQuestion.correctOption) variant = "bg-green-500/20 border-green-500 text-green-500";
                                else if (selectedOption === idx) variant = "bg-red-500/20 border-red-500 text-red-500";
                                else variant = "opacity-50";
                            }

                            return (
                                <div
                                    key={idx}
                                    onClick={() => handleOptionSelect(idx)}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex justify-between items-center ${variant}`}
                                >
                                    <span className="font-medium">{option}</span>
                                    {isAnswered && idx === currentQuestion.correctOption && <CheckCircle className="w-5 h-5 text-green-500" />}
                                    {isAnswered && selectedOption === idx && idx !== currentQuestion.correctOption && <XCircle className="w-5 h-5 text-red-500" />}
                                </div>
                            );
                        })}
                    </div>

                    {isAnswered && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-6 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground"
                        >
                            <span className="font-bold mr-2">Explanation:</span> {currentQuestion.explanation}
                        </motion.div>
                    )}

                </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-end">
                {!isAnswered ? (
                    <Button onClick={checkAnswer} disabled={selectedOption === null} size="lg">
                        Check Answer
                    </Button>
                ) : (
                    <Button onClick={nextQuestion} size="lg">
                        {currentQuestionIdx < questions.length - 1 ? 'Next Question' : 'View Results'} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default QuizView;
