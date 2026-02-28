import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useLocation } from 'react-router-dom';

interface Message {
    id: string;
    sender: 'ai' | 'user';
    text: string;
    timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
    id: 'init-1',
    sender: 'ai',
    text: 'Hi there! I am your Marga AI learning assistant. Ask me anything about the platform, code challenges, or general programming help!',
    timestamp: new Date()
};

// Initialize Gemini
// Ensure you have VITE_GEMINI_API_KEY in your .env file
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "dummy_key");

const getFallbackResponse = (input: string, context: string) => {
    const lowerInput = input.toLowerCase();

    // Contextual Help based on Page
    if (context.includes('Coding Challenge')) {
        if (lowerInput.includes('stuck') || lowerInput.includes('help')) {
            return "I see you're working on a challenge! Try breaking the problem down. What data structures might be useful here? Array? Hashmap?";
        }
        if (lowerInput.includes('error') || lowerInput.includes('bug')) {
            return "Errors are stepping stones to success. Check the terminal output at the bottom right—it usually points to the exact line number.";
        }
        if (lowerInput.match(/solution|answer|code/)) {
            return "I won't give you the exact code—that ruins the fun! But I suggest you look closely at the Example Output in the left panel.";
        }
        if (lowerInput.includes('visualizer')) {
            return "The visualizer actively tracks memory and execution time in real-time as your code runs. It's a great tool to benchmark algorithms!";
        }
    }

    if (context.includes('Dashboard')) {
        if (lowerInput.includes('what') || lowerInput.includes('next')) {
            return "Based on your progress, you should head to the 'Challenges' tab to earn some more XP!";
        }
        if (lowerInput.includes('xp')) {
            return "XP is your mastery points! The more modules and challenges you solve, the higher you rank on the global leaderboard.";
        }
    }

    if (context.includes('Learning Paths') || context.includes('Modules')) {
        return "These curated modules are designed to take you step-by-step. Make sure to read the articles fully before taking the quizzes!";
    }

    if (context.includes('Leaderboard')) {
        return "The leaderboard is updated in real-time. Earn XP points by completing challenges to climb the ranks!";
    }

    // General Tech inquiries (Prioritized over Greetings)
    if (lowerInput.includes('python')) return "Python is a high-level, interpreted programming language incredibly popular for machine learning, data science, and algorithmic scripting. It emphasizes readability and minimal syntax. Remember to watch your indentation!";
    if (lowerInput.includes('javascript') || lowerInput.includes('js')) return "JavaScript powers the interactive web. It evolved from browser-only to full-stack with Node.js. Remember that it's single-threaded and asynchronous!";
    if (lowerInput.includes('react')) return "React is a JavaScript library for building user interfaces with reusable components! Marga is actually built with React, Vite, and Tailwind CSS.";
    if (lowerInput.includes('java')) return "Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible. 'Write once, run anywhere!'";
    if (lowerInput.includes('c++')) return "C++ is a high-performance language widely used for game engines, operating systems, and competitive programming where hardware-level control matters.";

    // Greetings
    if (lowerInput.match(/\b(hello|hi|hey|greetings|hola)\b/)) {
        const greets = [
            "Hello! Marga AI here. I see you're " + (context.includes('Dashboard') ? 'on your dashboard.' : 'working hard!') + " How can I assist?",
            "Hi there! Ready to learn something new today?",
            "Greetings! I am currently running in my offline intelligence engine, but I can still help you navigate!",
        ];
        return greets[Math.floor(Math.random() * greets.length)];
    }

    // Fallbacks
    const generics = [
        "That's an interesting point. How would you approach solving that?",
        "I'm operating without my Gemini API link right now, but I still believe in you! Keep going!",
        "Could you elaborate on that? In offline mode, I'm best at giving hints about your current page.",
        "Remember, the key to mastery is consistency. You're doing great.",
        "I don't have a specific answer for that in my offline database, but I suggest checking the Marga documentation or diving back into the code!"
    ];
    return generics[Math.floor(Math.random() * generics.length)];
};

const AIChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsgText = inputValue;

        const userMsg: Message = {
            id: `user-${Date.now()}-${Math.random()}`,
            sender: 'user',
            text: userMsgText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Injecting Page Context Awareness
        const pageContextMap: Record<string, string> = {
            '/dashboard': 'User is on their main Dashboard viewing their progress, recent activity, and recommended next steps.',
            '/challenges': 'User is browsing the Standalone Challenges list, looking for algorithmic or data structure coding problems.',
            '/learning-path': 'User is viewing the comprehensive Marga Learning Paths (Node map) progressing through curated difficulty modules.',
            '/leaderboard': 'User is checking the global Hackathon or Marga Leaderboard to see top rankings.',
            '/badges': 'User is viewing the Badges and Achievements they have unlocked.',
            '/settings': 'User is on the Account Settings page configuring their profile.',
            '/': 'User is on the public Landing Page of Marga.'
        };

        let currentPageInfo = "User is navigating the Marga platform.";
        if (location.pathname.startsWith('/challenge/')) {
            currentPageInfo = `User is actively solving a specific Coding Challenge (ID: ${location.pathname.split('/').pop()}). They might need hints, syntax help, or debugging assistance for code.`;
        } else {
            currentPageInfo = pageContextMap[location.pathname] || `User is on the "${location.pathname}" page.`;
        }

        const getSimulatedReply = () => getFallbackResponse(userMsgText, currentPageInfo);

        try {
            if (!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === "dummy_key") {
                // Highly Varied Fallback if no key provided

                // Add an artificial delay to simulate "thinking" but BLOCK the try segment 
                // so the 'finally' statement doesn't instantly snap 'isTyping' to false.
                await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 800));

                setMessages(prev => [...prev, {
                    id: `ai-${Date.now()}-${Math.random()}`,
                    sender: 'ai',
                    text: getSimulatedReply(),
                    timestamp: new Date()
                }]);
                return;
            }

            // We use gemini-1.5-flash for standard fast text replies
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const promptContext = `You are "Marga AI", an expert coding mentor, guide, and navigator for the Marga learning platform. \nCONTEXT: ${currentPageInfo}\nBe concise, encouraging, and helpful. Do not just output raw code unless asked; guide them.\nAnswer the user's question: ${userMsgText}`;

            const result = await model.generateContent(promptContext);
            const responseText = result.response.text();

            setMessages(prev => [...prev, {
                id: `ai-${Date.now()}-${Math.random()}`,
                sender: 'ai',
                text: responseText,
                timestamp: new Date()
            }]);
        } catch (error) {
            console.error("AI Generation Error:", error);
            // Dynamic Fallback to simulated offline reply if API key is invalid, exceeded quota, or blocked
            await new Promise(resolve => setTimeout(resolve, 1000)); // Artificial wait so it doesn't instantly snap
            setMessages(prev => [...prev, {
                id: `ai-${Date.now()}-${Math.random()}`,
                sender: 'ai',
                text: getSimulatedReply(),
                timestamp: new Date()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 p-4 bg-cq-green hover:bg-cq-green/90 text-cq-dark rounded-full shadow-[0_0_20px_rgba(0,255,136,0.4)] flex items-center justify-center transition-colors"
                    >
                        <Bot className="w-7 h-7" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Interface Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[380px] h-[600px] max-h-[85vh] bg-[#161616] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-4 py-3 bg-[#1e1e1e] border-b border-white/10 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-cq-green/20 flex items-center justify-center border border-cq-green/30">
                                    <Bot className="w-5 h-5 text-cq-green" />
                                </div>
                                <div>
                                    <h3 className="text-white font-display font-semibold text-sm flex items-center gap-1">
                                        Marga AI <Sparkles className="w-3 h-3 text-cq-gold" />
                                    </h3>
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-cq-green animate-pulse" />
                                        <span className="text-xs text-gray-400">Online</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 bg-[#0f1011]">
                            {messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id}
                                    className={`flex items-start gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-cq-cyan/20 text-cq-cyan' : 'bg-cq-green/20 text-cq-green'
                                        }`}>
                                        {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>
                                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-cq-cyan/10 text-white border border-cq-cyan/20 rounded-tr-sm'
                                        : 'bg-[#1e1e1e] text-gray-200 border border-white/5 rounded-tl-sm'
                                        }`}>
                                        {msg.text}
                                        <div className={`text-[10px] mt-1 opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-start gap-3 max-w-[85%]"
                                >
                                    <div className="w-8 h-8 rounded-full bg-cq-green/20 text-cq-green flex items-center justify-center shrink-0">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="p-4 bg-[#1e1e1e] border border-white/5 rounded-2xl rounded-tl-sm flex items-center gap-1">
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-cq-green rounded-full" />
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-cq-green rounded-full" />
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-cq-green rounded-full" />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-[#1e1e1e] border-t border-white/10 shrink-0">
                            <form onSubmit={handleSendMessage} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask Marga AI..."
                                    className="w-full bg-[#0f1011] border border-white/10 text-white text-sm rounded-full py-3 pl-4 pr-12 focus:outline-none focus:border-cq-green/50 focus:ring-1 focus:ring-cq-green/50 transition-all placeholder:text-gray-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="absolute right-2 p-2 bg-cq-green text-cq-dark rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cq-green/90 transition-colors"
                                >
                                    {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatbot;
