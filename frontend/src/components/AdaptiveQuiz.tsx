import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Question {
    text: string;
    options: { text: string; isCorrect: boolean }[];
    explanation: string;
}

interface AdaptiveQuizProps {
    nodeId: string;
    nodeName: string;
    onComplete: (score: number, passed: boolean) => void;
}

// Mock data generator for demo purposes if backend doesn't return questions efficiently yet
const generateMockQuestions = (topic: string): Question[] => [
    {
        text: `What is the primary purpose of ${topic}?`,
        options: [
            { text: "To manage database connections", isCorrect: false },
            { text: "To handle UI rendering", isCorrect: true },
            { text: "To compile code", isCorrect: false }
        ],
        explanation: `${topic} is essential for building user interfaces efficiently.`
    },
    {
        text: "Which of the following is true?",
        options: [
            { text: "It is synchronous", isCorrect: false },
            { text: "It is component-based", isCorrect: true },
            { text: "It runs on Java", isCorrect: false }
        ],
        explanation: "Component-based architecture allows reusability."
    }
];

export const AdaptiveQuiz: React.FC<AdaptiveQuizProps> = ({ nodeId, nodeName, onComplete }) => {
    const [questions] = useState(generateMockQuestions(nodeName));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);

    const handleNext = () => {
        const isCorrect = questions[currentIndex].options[selectedOption!].isCorrect;
        if (isCorrect) setScore(s => s + 10);

        setShowExplanation(true);
    };

    const handleContinue = () => {
        setShowExplanation(false);
        setSelectedOption(null);
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // Finish
            const finalScore = score + (questions[currentIndex].options[selectedOption!].isCorrect ? 10 : 0);
            const passed = finalScore >= (questions.length * 10) * 0.6; // 60% pass
            onComplete(finalScore, passed);
        }
    };

    const currentQuestion = questions[currentIndex];

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Quiz: {nodeName}</CardTitle>
                <div className="text-sm text-muted-foreground">Question {currentIndex + 1} of {questions.length}</div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <p className="text-lg font-medium">{currentQuestion.text}</p>

                    <RadioGroup
                        value={selectedOption?.toString()}
                        onValueChange={(val) => !showExplanation && setSelectedOption(parseInt(val))}
                        disabled={showExplanation}
                    >
                        {currentQuestion.options.map((opt, idx) => (
                            <div key={idx} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                                <RadioGroupItem value={idx.toString()} id={`opt-${idx}`} />
                                <Label htmlFor={`opt-${idx}`}>{opt.text}</Label>
                            </div>
                        ))}
                    </RadioGroup>

                    {showExplanation && (
                        <Alert variant={questions[currentIndex].options[selectedOption!].isCorrect ? "default" : "destructive"}>
                            {questions[currentIndex].options[selectedOption!].isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                            <AlertTitle>{questions[currentIndex].options[selectedOption!].isCorrect ? "Correct!" : "Incorrect"}</AlertTitle>
                            <AlertDescription>
                                {currentQuestion.explanation}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="flex justify-end">
                        {!showExplanation ? (
                            <Button onClick={handleNext} disabled={selectedOption === null}>Submit Answer</Button>
                        ) : (
                            <Button onClick={handleContinue}>
                                {currentIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
