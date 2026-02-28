import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
// You might want a markdown renderer here, e.g., react-markdown. 
// For now, checks if we can use a simple pre-wrap or dangerouslySetInnerHTML if trusted.
// Let's assume content is markdown-like text.

interface ArticleViewProps {
    title: string;
    content: string;
    resources: { title: string; url: string; type: string }[];
    onComplete: () => void;
    nextLabel?: string;
}

const ArticleView: React.FC<ArticleViewProps> = ({ title, content, resources, onComplete, nextLabel = "Start Quiz" }) => {
    return (
        <div className="max-w-4xl mx-auto p-8 h-full overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <BookOpen className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-display font-bold">{title}</h1>
                </div>

                <div className="prose prose-invert max-w-none bg-card p-8 rounded-xl border border-border/50 shadow-sm">
                    {/* Simple renderer for now. If rich markdown is needed, we'd install react-markdown */}
                    <div className="whitespace-pre-wrap font-sans text-lg leading-relaxed">
                        {content}
                    </div>
                </div>

                {resources && resources.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5" /> Resources
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            {resources.map((res, idx) => (
                                <a
                                    key={idx}
                                    href={res.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card hover:border-primary/50 transition-colors group"
                                >
                                    <span className="font-medium">{res.title}</span>
                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-12 flex justify-end">
                    <Button onClick={onComplete} size="lg" className="gap-2">
                        {nextLabel} <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default ArticleView;
