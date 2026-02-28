import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TreeVisualizationProps {
    nodes: { data: number | string; left?: any; right?: any }[]; // Simplified tree structure
    currentStep: string;
}

// Helper to convert flat array or hierarchical object to visual nodes/edges
// For this MVP, we assume 'nodes' is a flat list of visited/created nodes with parent info if available, 
// OR we assume the Challenge logic builds a tree object.
// Let's stick to the list-based approach similar to LinkedList for simplicity in this demo.
// We'll calculate positions based on simple binary tree levels.

const TreeVisualization = ({ nodes, currentStep }: TreeVisualizationProps) => {
    const [visualNodes, setVisualNodes] = useState<any[]>([]);
    const [edges, setEdges] = useState<any[]>([]);

    useEffect(() => {
        // Simple BST layout algorithm
        // Root at (50%, 10%), Level 1 at (25%, 30%), (75%, 30%), etc.
        const newVisualNodes: any[] = [];
        const newEdges: any[] = [];

        // We assume 'nodes' come in Level Order or just insertion order which we can map to a tree
        // For visual simplicity, let's map index 0 -> Root, 1 -> Left, 2 -> Right (if we treat it like a heap array)
        // Or we handle explicit parent-child if provided. 
        // To make it easy for the user validation logic, let's assume the user builds an array representing a heap:
        // [root, left, right, left-left, left-right, ...]

        nodes.forEach((node, index) => {
            if (!node) return;

            const level = Math.floor(Math.log2(index + 1));
            const itemsInLevel = Math.pow(2, level);
            const positionInLevel = index - itemsInLevel + 1;
            const sectionWidth = 100 / itemsInLevel;

            const x = sectionWidth * positionInLevel + (sectionWidth / 2);
            const y = 15 + (level * 20); // % from top

            const visualNode = {
                id: `star-${index}`,
                data: node.data,
                x: x, // percentage
                y: y, // percentage
                color: 'bg-white',
                glow: 'shadow-[0_0_15px_rgba(255,255,255,0.8)]'
            };
            newVisualNodes.push(visualNode);

            // Calculate parent edge
            if (index > 0) {
                const parentIndex = Math.floor((index - 1) / 2);
                if (nodes[parentIndex]) {
                    const parent = newVisualNodes.find(n => n.id === `star-${parentIndex}`);
                    if (parent) {
                        newEdges.push({
                            id: `edge-${parentIndex}-${index}`,
                            x1: parent.x,
                            y1: parent.y + 5, // Offset for node size
                            x2: x,
                            y2: y - 5
                        });
                    }
                }
            }
        });

        setVisualNodes(newVisualNodes);
        setEdges(newEdges);
    }, [nodes]);

    return (
        <div className="relative w-full h-full min-h-[400px] bg-slate-950 overflow-hidden">
            {/* Nebula Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-black pointer-events-none" />

            {/* Edges (Constellation Lines) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {edges.map((edge) => (
                    <motion.line
                        key={edge.id}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        transition={{ duration: 1 }}
                        x1={`${edge.x1}%`}
                        y1={`${edge.y1}%`}
                        x2={`${edge.x2}%`}
                        y2={`${edge.y2}%`}
                        stroke="white"
                        strokeWidth="1"
                    />
                ))}
            </svg>

            {/* Nodes (Stars) */}
            <AnimatePresence>
                {visualNodes.map((node) => (
                    <motion.div
                        key={node.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`absolute w-10 h-10 -ml-5 -mt-5 rounded-full flex items-center justify-center ${node.color} ${node.glow} z-10`}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                        <span className="text-slate-900 font-bold text-xs">{node.data}</span>
                    </motion.div>
                ))}
            </AnimatePresence>

            {nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-white/30">
                    <p>Form a Constellation...</p>
                </div>
            )}
        </div>
    );
};

export default TreeVisualization;
