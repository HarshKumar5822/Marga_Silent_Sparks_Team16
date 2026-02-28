import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types from parent
interface GalaxyVisualizationProps {
    nodes: { data: number | string }[];
    currentStep: 'create' | 'assign' | 'link' | 'traverse' | 'idle';
    traverseIndex?: number;
}

const GalaxyVisualization = ({ nodes, currentStep, traverseIndex = -1 }: GalaxyVisualizationProps) => {
    const [visualNodes, setVisualNodes] = useState<any[]>([]);

    useEffect(() => {
        // Linear layout for clarity with the new detailed design
        const newNodes = nodes.map((node, index) => ({
            id: `planet-${index}`,
            data: node.data,
            // Fixed spacing
            x: 100 + index * 180,
            y: 200,
            isNew: index === nodes.length - 1 && currentStep === 'create',
            isTraversing: currentStep === 'traverse' && index === traverseIndex,
        }));
        setVisualNodes(newNodes);
    }, [nodes, currentStep, traverseIndex]);

    return (
        <div className="relative w-full h-full min-h-[400px] overflow-hidden bg-slate-950">
            {/* Deep Space Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black" />

            {/* Distant Stars */}
            <div className="absolute inset-0 opacity-40">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={`star-${i}`}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: Math.random() < 0.1 ? 3 : 1,
                            height: Math.random() < 0.1 ? 3 : 1,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.8 + 0.2,
                            animation: `twinkle ${Math.random() * 5 + 3}s infinite`
                        }}
                    />
                ))}
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Connections (Beams) */}
                {visualNodes.map((node, index) => {
                    if (index < visualNodes.length - 1) {
                        const nextNode = visualNodes[index + 1];
                        // Connect from current node's "Moon" (Right side) to next node's "Planet" (Left side)
                        // Node radius ~40, Orbit radius ~60. Moon is at x + 60.
                        const startX = node.x + 60;
                        const startY = node.y;
                        const endX = nextNode.x - 30; // Touch the planet surface mostly
                        const endY = nextNode.y;

                        return (
                            <motion.g key={`link-${index}`}>
                                {/* Beam with gradient */}
                                <motion.line
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.5 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    x1={startX}
                                    y1={startY}
                                    x2={endX}
                                    y2={endY}
                                    stroke="url(#beamGradient)"
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                />

                                {/* Moving Pulse Packet */}
                                <motion.circle
                                    r="3"
                                    fill="#60a5fa"
                                    filter="url(#glow)"
                                >
                                    <animateMotion
                                        dur="1.5s"
                                        repeatCount="indefinite"
                                        path={`M${startX},${startY} L${endX},${endY}`}
                                    />
                                </motion.circle>
                            </motion.g>
                        );
                    }
                    // NULL Pointer for last node
                    if (index === visualNodes.length - 1) {
                        return (
                            <motion.line
                                key={`link-null-${index}`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 0.5, opacity: 0.3 }}
                                x1={node.x + 60}
                                y1={node.y}
                                x2={node.x + 120}
                                y2={node.y}
                                stroke="#475569"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                            />
                        )
                    }
                    return null;
                })}

                <linearGradient id="beamGradient" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#f472b6" />
                    <stop offset="1" stopColor="#60a5fa" />
                </linearGradient>
            </svg>

            {/* Nodes (System: Planet + Ring + Moon) */}
            <AnimatePresence>
                {visualNodes.map((node, index) => (
                    <motion.div
                        key={node.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: node.isTraversing ? 1.1 : 1,
                            opacity: 1
                        }}
                        transition={{ type: 'spring', damping: 15 }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2" // Centering trick requires w/h
                        style={{
                            left: node.x,
                            top: node.y,
                            width: 140, // Container size covering orbit
                            height: 140,
                            x: -70, // Framer motion offset to center since 'left' is top-left corner
                            y: -70
                        }}
                    >
                        {/* The Orbit Ring */}
                        <div className="absolute inset-0 rounded-full border border-slate-700/50" />

                        {/* The 'Moon' (Pointer) - Positioned on the ring at right (3 o'clock) */}
                        <motion.div
                            className="absolute top-1/2 right-0 w-5 h-5 -mt-2.5 -mr-2.5 bg-slate-600 rounded-full border border-slate-400 z-20 shadow-[0_0_10px_rgba(94,114,228,0.5)]"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 }}
                        />

                        {/* The Planet (Data) - Centered */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full z-10 flex items-center justify-center 
                 bg-gradient-to-br from-pink-500 to-rose-600 shadow-[0_4px_20px_rgba(236,72,153,0.4)]
                 border-4 border-slate-900 ring-2 ring-pink-500/20"
                        >
                            <span className="text-white font-bold text-2xl font-mono">{node.data}</span>

                            {/* Shine effect on planet */}
                            <div className="absolute top-2 left-3 w-4 h-2 bg-white/20 rounded-full blur-[2px] -rotate-45" />
                        </div>

                        {/* Traversal Highlight Ring */}
                        {node.isTraversing && (
                            <motion.div
                                layoutId="traversal-ring"
                                className="absolute inset-[-10px] rounded-full border-2 border-yellow-400/50 shadow-[0_0_30px_rgba(250,204,21,0.4)]"
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Traversal Rocket/Ship */}
            <AnimatePresence>
                {currentStep === 'traverse' && traverseIndex >= 0 && traverseIndex < visualNodes.length && (
                    <motion.div
                        className="absolute z-50 pointer-events-none text-3xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{
                            opacity: 1,
                            left: visualNodes[traverseIndex].x - 15, // Center on planet
                            top: visualNodes[traverseIndex].y - 80, // Float above
                            y: [0, -10, 0]
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        🚀
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Empty State */}
            {nodes.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                    <div className="w-24 h-24 rounded-full border border-dashed border-slate-700 animate-spin-slow flex items-center justify-center mb-4">
                        <div className="w-2 h-2 bg-slate-600 rounded-full" />
                    </div>
                    <p className="font-mono text-sm">System: Empty</p>
                </div>
            )}
        </div>
    );
};

export default GalaxyVisualization;
