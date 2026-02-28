import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Star, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Feedback = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submission
        console.log({ rating, category, message });
        toast.success("Thank you for your feedback!", {
            description: "We've received your thoughts and will use them to improve Marga."
        });
        // Reset form
        setRating(0);
        setCategory('');
        setMessage('');
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 pb-16 px-4">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="text-center mb-10">
                            <h1 className="font-display text-4xl font-bold text-foreground mb-4">We Value Your Feedback</h1>
                            <p className="text-muted-foreground text-lg">
                                Help us make Marga better. Share your thoughts, report bugs, or suggest new features.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl border border-border/50 bg-card shadow-lg">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Rating */}
                                <div className="space-y-4 text-center">
                                    <label className="text-sm font-medium text-foreground">How would you rate your experience?</label>
                                    <div className="flex justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    className={`h-8 w-8 transition-colors ${star <= (hoverRating || rating)
                                                        ? 'text-cq-gold fill-cq-gold'
                                                        : 'text-muted-foreground/30'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border/50 focus:border-primary text-foreground outline-none"
                                        required
                                    >
                                        <option value="" disabled>Select a category</option>
                                        <option value="bug">Bug Report</option>
                                        <option value="feature">Feature Request</option>
                                        <option value="content">Content/Challenge Feedback</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Your Thoughts</label>
                                    <Textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Tell us what you think..."
                                        className="min-h-[150px] bg-muted/50 border-border/50"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full gap-2" variant="hero">
                                    <Send className="h-4 w-4" />
                                    Submit Feedback
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Feedback;
