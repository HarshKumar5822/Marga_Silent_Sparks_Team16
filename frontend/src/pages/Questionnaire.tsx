import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Code2 } from 'lucide-react';

type Difficulty = 'beginner' | 'intermediate' | 'advanced';

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
    language: string;
    difficulty: Difficulty;
}

const QUESTIONS: Question[] = [
    // Beginner
    { id: 1, text: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Text Markup Language', 'Hyper Tabular Markup Language', 'None of these'], correctAnswer: 0, language: 'HTML', difficulty: 'beginner' },
    { id: 2, text: 'What is the correct syntax to output "Hello World" in Python?', options: ['echo "Hello World"', 'print("Hello World")', 'p("Hello World")', 'console.log("Hello World")'], correctAnswer: 1, language: 'Python', difficulty: 'beginner' },
    { id: 3, text: 'Choose the correct HTML element for the largest heading:', options: ['<heading>', '<h6>', '<head>', '<h1>'], correctAnswer: 3, language: 'HTML', difficulty: 'beginner' },
    { id: 4, text: 'Inside which HTML element do we put the JavaScript?', options: ['<script>', '<javascript>', '<js>', '<scripting>'], correctAnswer: 0, language: 'JavaScript', difficulty: 'beginner' },
    { id: 5, text: 'How do you create a function in JavaScript?', options: ['function = myFunction()', 'function myFunction()', 'function:myFunction()', 'create myFunction()'], correctAnswer: 1, language: 'JavaScript', difficulty: 'beginner' },
    { id: 6, text: 'Which operator is used to assign a value to a variable in Python?', options: ['*', '-', '=', 'x'], correctAnswer: 2, language: 'Python', difficulty: 'beginner' },

    // Intermediate
    { id: 7, text: 'How to write an IF statement in JavaScript?', options: ['if i = 5 then', 'if i == 5 then', 'if (i == 5)', 'if i = 5'], correctAnswer: 2, language: 'JavaScript', difficulty: 'intermediate' },
    { id: 8, text: 'Which event occurs when the user clicks on an HTML element?', options: ['onmouseclick', 'onclick', 'onchange', 'onmouseover'], correctAnswer: 1, language: 'HTML/JS', difficulty: 'intermediate' },
    { id: 9, text: 'What is the correct way to write a Python dictionary?', options: ['x = {name: "John", age: 36}', 'x = ("name": "John", "age": 36)', 'x = {"name": "John", "age": 36}', 'x = ["name": "John", "age": 36]'], correctAnswer: 2, language: 'Python', difficulty: 'intermediate' },
    { id: 10, text: 'Are SQL statements case sensitive?', options: ['True', 'False', 'Depends on the database', 'Only keywords'], correctAnswer: 1, language: 'SQL', difficulty: 'intermediate' },
    { id: 11, text: 'Which SQL statement is used to update data in a database?', options: ['SAVE', 'MODIFY', 'UPDATE', 'SAVE AS'], correctAnswer: 2, language: 'SQL', difficulty: 'intermediate' },
    { id: 12, text: 'How do you add a comment in a CSS file?', options: ['// this is a comment', '/* this is a comment */', '\' this is a comment', '<!-- this is a comment -->'], correctAnswer: 1, language: 'CSS', difficulty: 'intermediate' },
    { id: 13, text: 'Which property is used to change the background color in CSS?', options: ['color', 'bgcolor', 'background-color', 'bg-color'], correctAnswer: 2, language: 'CSS', difficulty: 'intermediate' },
    { id: 14, text: 'How does a FOR loop start in JavaScript?', options: ['for (i <= 5; i++)', 'for i = 1 to 5', 'for (i = 0; i <= 5)', 'for (i = 0; i <= 5; i++)'], correctAnswer: 3, language: 'JavaScript', difficulty: 'intermediate' },

    // Advanced
    { id: 15, text: 'What is the output of JavaScript: console.log(typeof NaN)?', options: ['"number"', '"NaN"', '"undefined"', '"string"'], correctAnswer: 0, language: 'JavaScript', difficulty: 'advanced' },
    { id: 16, text: 'In Python, what is the use of the map() function?', options: ['Returns a map object of the results after applying the given function to each item', 'Creates a map (dictionary)', 'Converts a list to a dictionary', 'None of the above'], correctAnswer: 0, language: 'Python', difficulty: 'advanced' },
    { id: 17, text: 'What does CSS flex-basis do?', options: ['Specifies the initial main size of a flex item', 'Changes the flex direction', 'Determines the baseline alignment', 'Defines the order of items'], correctAnswer: 0, language: 'CSS', difficulty: 'advanced' },
    { id: 18, text: 'Which SQL keyword is used to sort the result-set?', options: ['SORT BY', 'ORDER', 'ORDER BY', 'SORT'], correctAnswer: 2, language: 'SQL', difficulty: 'advanced' },
    { id: 19, text: 'What is a closure in JavaScript?', options: ['A function inside another function that has access to the outer function\'s variables', 'A way to stop execution', 'A method to close browser tabs', 'Closing a database connection'], correctAnswer: 0, language: 'JavaScript', difficulty: 'advanced' },
    { id: 20, text: 'In React, what hook is used to perform side effects?', options: ['useState', 'useEffect', 'useContext', 'useReducer'], correctAnswer: 1, language: 'React', difficulty: 'advanced' },
];

const Questionnaire = () => {
    const navigate = useNavigate();
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [animDirection, setAnimDirection] = useState(1);

    const question = QUESTIONS[currentQuestionIdx];

    const handleOptionSelect = (optionIdx: number) => {
        setAnswers({ ...answers, [question.id]: optionIdx });
        nextQuestion();
    };

    const nextQuestion = () => {
        if (currentQuestionIdx < QUESTIONS.length - 1) {
            setAnimDirection(1);
            setCurrentQuestionIdx(currentQuestionIdx + 1);
        } else {
            finishQuestionnaire();
        }
    };

    const skipQuestionnaire = () => {
        finishQuestionnaire();
    };

    const finishQuestionnaire = () => {
        navigate('/dashboard');
    };

    const progressPercentage = ((currentQuestionIdx + 1) / QUESTIONS.length) * 100;

    const getDifficultyColor = (diff: Difficulty) => {
        switch (diff) {
            case 'beginner': return 'text-green-400 border-green-400/20 bg-green-400/10';
            case 'intermediate': return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';
            case 'advanced': return 'text-red-400 border-red-400/20 bg-red-400/10';
            default: return 'text-primary border-primary/20 bg-primary/10';
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-background">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cq-cyan/10 rounded-full blur-3xl animate-pulse" />

            <div className="relative w-full max-w-2xl">
                <div className="mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-cq-cyan to-cq-purple shadow-lg shadow-cq-cyan/20">
                            <Code2 className="h-6 w-6 text-cq-dark" />
                        </div>
                        <span className="font-display font-bold text-xl text-foreground">Marga Setup</span>
                    </div>
                    <Button variant="ghost" onClick={skipQuestionnaire} className="text-muted-foreground hover:text-foreground">
                        Skip Assessment
                    </Button>
                </div>

                <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md p-6 sm:p-10 shadow-2xl overflow-hidden">
                    {/* Progress bar */}
                    <div className="absolute top-0 left-0 h-1 bg-border/50 w-full">
                        <motion.div
                            className="h-full bg-gradient-to-r from-cq-cyan to-cq-purple"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-muted-foreground">
                                Question {currentQuestionIdx + 1} of {QUESTIONS.length}
                            </span>
                            <div className="flex gap-2">
                                <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(question.difficulty)} uppercase tracking-wider font-semibold`}>
                                    {question.difficulty}
                                </span>
                                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-semibold">
                                    {question.language}
                                </span>
                            </div>
                        </div>

                        <AnimatePresence mode="wait" custom={animDirection}>
                            <motion.div
                                key={question.id}
                                custom={animDirection}
                                initial={{ opacity: 0, x: animDirection * 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: animDirection * -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h2 className="text-2xl font-bold text-foreground mb-8">
                                    {question.text}
                                </h2>

                                <div className="space-y-3">
                                    {question.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(idx)}
                                            className="w-full text-left p-4 rounded-xl border border-border/50 bg-muted/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flexitems-center justify-center w-8 h-8 rounded-lg bg-background border border-border group-hover:border-primary/50 group-hover:bg-primary/20 text-muted-foreground font-mono text-sm transition-colors text-center leading-8">
                                                    {String.fromCharCode(65 + idx)}
                                                </div>
                                                <span className="text-foreground">{option}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questionnaire;
