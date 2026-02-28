import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <h1 className="font-display text-4xl font-bold text-foreground">About Marga</h1>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p className="text-lg">
                                Marga is a platform designed to make learning algorithms and data structures engaging, interactive, and fun.
                            </p>
                            <p>
                                We believe that the best way to master complex programming concepts is through hands-on practice and visualization. Our mission is to bridge the gap between abstract theory and practical application.
                            </p>
                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Values</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Interactive Learning:</strong> Learning by doing is more effective than passive reading.</li>
                                <li><strong>Visualization:</strong> Seeing how algorithms work step-by-step builds deeper intuition.</li>
                                <li><strong>Accessibility:</strong> Quality computer science education should be available to everyone.</li>
                                <li><strong>Community:</strong> We learn better when we learn together.</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default About;
