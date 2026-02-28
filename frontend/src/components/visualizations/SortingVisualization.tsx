import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SortingVisualizationProps {
    nodes: { data: number | string }[];
    currentStep: string;
    compareIndices?: [number, number]; // Indices being compared
    swapIndices?: [number, number];    // Indices being swapped
}

const SortingVisualization = ({
    nodes,
    currentStep,
    compareIndices = [-1, -1],
    swapIndices = [-1, -1]
}: SortingVisualizationProps) => {
    const [visualNodes, setVisualNodes] = useState<any[]>([]);

    useEffect(() => {
        // Map data to planets
        const newNodes = nodes.map((node, index) => ({
            id: `planet-${node.data}-${index}`, // Stable ID for reordering
            data: Number(node.data),
            // Size depends on value
            size: 40 + (Number(node.data) * 5),
            color: getPlanetColor(Number(node.data)),
        }));
        setVisualNodes(newNodes);
    }, [nodes]);

    const getPlanetColor = (val: number) => {
        if (val < 20) return 'from-red-400 to-orange-500';
        if (val < 50) return 'from-yellow-400 to-amber-500';
        if (val < 80) return 'from-green-400 to-emerald-500';
        return 'from-blue-400 to-cyan-500';
    };

    return (
        <div className="relative w-full h-full min-h-[400px] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
            {/* Starry Background */}
            <div className="absolute inset-0 opacity-50">
                {[...Array(30)].map((_, i) => (
                    <div key={i} className="absolute bg-white rounded-full"
                        style={{
                            width: Math.random() * 2 + 1,
                            height: Math.random() * 2 + 1,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random()
                        }}
                    />
                ))}
            </div>

            {/* Orbit Line */}
            <div className="absolute w-[90%] h-px bg-white/10 top-1/2 -translate-y-1/2" />

            <div className="relative z-10 flex gap-8 items-center h-[200px]">
                <AnimatePresence mode='popLayout'>
                    {visualNodes.map((node, index) => {
                        const isComparing = compareIndices.includes(index);
                        const isSwapping = swapIndices.includes(index);

                        return (
                            <motion.div
                                key={node.id}
                                layout // Magic prop for automatic reordering animations
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    y: isComparing ? -20 : 0, // Lift up when comparing
                                    boxShadow: isComparing
                                        ? '0 0 30px rgba(255, 255, 0, 0.6)'
                                        : '0 0 10px rgba(0,0,0,0.5)'
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`rounded-full flex items-center justify-center bg-gradient-to-br ${node.color} border-2 border-white/20`}
                                style={{
                                    width: node.size,
                                    height: node.size,
                                }}
                            >
                                <span className="font-bold text-white drop-shadow-md">{node.data}</span>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Status Text/Decoration */}
            <div className="absolute bottom-8 text-white/60 font-mono text-sm">
                {currentStep === 'compare' && 'Scanning planetary masses...'}
                {currentStep === 'swap' && 'Gravitational realignment in progress...'}
                {currentStep === 'sorted' && 'System stabilized.'}
            </div>
        </div>
    );
};

export default SortingVisualization;
