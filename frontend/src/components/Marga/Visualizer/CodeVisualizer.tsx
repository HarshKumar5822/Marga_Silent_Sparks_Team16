import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface VisualizerProps {
    data: number[]; // Array to visualize
    activeIndices: number[]; // Indices currently being compared/swapped
    highlightIndices: number[]; // Indices that are "sorted" or special
}

const CodeVisualizer: React.FC<VisualizerProps> = ({ data, activeIndices, highlightIndices }) => {
    return (
        <div className="flex items-end justify-center h-64 w-full bg-gray-900 border border-gray-700 rounded-lg p-4 gap-1">
            {data.map((value, idx) => {
                let colorClass = 'bg-blue-500';
                if (activeIndices.includes(idx)) colorClass = 'bg-yellow-500';
                if (highlightIndices.includes(idx)) colorClass = 'bg-green-500';

                // Normalize height for display (assuming max value relates to height percentage)
                // If values are arbitrary, we might need to find max first.
                const maxVal = Math.max(...data, 100);
                const heightPercentage = (value / maxVal) * 100;

                return (
                    <motion.div
                        key={idx}
                        layout
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercentage}%` }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`w-4 rounded-t-md ${colorClass} opacity-80 hover:opacity-100 transition-colors`}
                        title={`Value: ${value}`}
                    />
                );
            })}
        </div>
    );
};

export default CodeVisualizer;
