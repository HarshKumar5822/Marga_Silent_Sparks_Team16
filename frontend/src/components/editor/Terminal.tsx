import { motion, AnimatePresence } from 'framer-motion';
import { ExecutionResult } from '@/services/judge0';

interface TerminalProps {
    result: ExecutionResult | null;
    isExecuting?: boolean;
    height?: number;
    onHeightChange?: (height: number) => void;
}

const Terminal = ({ result, isExecuting, height = 200, onHeightChange }: TerminalProps) => {
    const hasResult = result !== null;
    const isError = result?.status.id !== 3 && result?.status.id !== undefined; // 3 = Accepted in Judge0

    return (
        <div className="h-full flex flex-col bg-[#1e1e1e] border-t border-border/50 overflow-hidden font-mono text-sm leading-relaxed" style={{ minHeight: height }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/5 select-none">
                <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Console Output</span>
                    {hasResult && !isExecuting && (
                        <div className="flex items-center gap-3 text-xs">
                            <span className={isError ? 'text-red-400' : 'text-green-400'}>
                                {result.status.description}
                            </span>
                            <span className="text-gray-500">
                                Time: {result.time}s
                            </span>
                            <span className="text-gray-500">
                                Mem: {result.memory} KB
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex gap-1.5 opacity-75">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                </div>
            </div>

            {/* Output Area */}
            <div className="flex-1 p-4 overflow-auto scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                <div className="flex gap-2 text-muted-foreground mb-3 opacity-50 select-none">
                    <span className="text-green-500">➜</span>
                    <span>~ Executing...</span>
                </div>

                <AnimatePresence mode="wait">
                    {isExecuting ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-gray-400 animate-pulse"
                        >
                            Communicating with Judge0 execution engine...
                        </motion.div>
                    ) : hasResult ? (
                        <motion.pre
                            key="output"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`whitespace-pre-wrap break-all ${isError ? 'text-red-400' : 'text-gray-300'}`}
                        >
                            {result.compile_output || result.stderr || result.stdout || result.message || "No Output"}
                        </motion.pre>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            className="text-muted-foreground italic"
                        >
                            Run your code to see output logic here...
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Terminal;
