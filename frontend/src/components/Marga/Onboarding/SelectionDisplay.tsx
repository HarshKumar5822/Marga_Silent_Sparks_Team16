import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Database, Layers, Brain, Terminal } from 'lucide-react';

interface SelectionStepProps {
    onSelect: (value: string) => void;
    options: { id: string; label: string; icon: React.ReactNode; description: string }[];
    title: string;
    subtitle: string;
}

const SelectionDisplay: React.FC<SelectionStepProps> = ({ onSelect, options, title, subtitle }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h2 className="text-4xl font-display font-bold mb-4">{title}</h2>
                <p className="text-muted-foreground text-lg">{subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
                {options.map((option, idx) => (
                    <motion.div
                        key={option.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.05, borderColor: 'var(--primary)' }}
                        onClick={() => onSelect(option.id)}
                        className="cursor-pointer bg-card border border-border/50 rounded-xl p-8 flex flex-col items-center hover:bg-muted/50 transition-all border-2 border-transparent"
                    >
                        <div className="p-4 rounded-full bg-primary/10 text-primary mb-6">
                            {option.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{option.label}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SelectionDisplay;
