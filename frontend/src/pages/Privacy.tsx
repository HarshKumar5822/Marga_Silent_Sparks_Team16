import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';

const Privacy = () => {
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
                        <h1 className="font-display text-4xl font-bold text-foreground">Privacy Policy</h1>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p>Last updated: December 30, 2024</p>
                            <p>
                                At Marga, we take your privacy seriously. This Privacy Policy describes how we collect, use, and protect your personal information.
                            </p>
                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Information We Collect</h2>
                            <p>
                                We collect information you provide directly to us, such as when you create an account, update your profile, or contact us. This may include your name, email address, and educational information.
                            </p>
                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">How We Use Your Information</h2>
                            <p>
                                We use your information to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Provide, maintain, and improve our services.</li>
                                <li>Track your progress and achievements.</li>
                                <li>Send you technical notices and support messages.</li>
                                <li>Communicate with you about new challenges and features.</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Privacy;
