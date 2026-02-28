import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';

const Terms = () => {
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
                        <h1 className="font-display text-4xl font-bold text-foreground">Terms of Service</h1>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p>Last updated: December 30, 2024</p>
                            <p>
                                Please read these Terms of Service carefully before using Marga.
                            </p>
                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Acceptance of Terms</h2>
                            <p>
                                By accessing or using Marga, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
                            </p>
                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">User Accounts</h2>
                            <p>
                                When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms.
                            </p>
                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Code of Conduct</h2>
                            <p>
                                You agree not to engage in any of the following prohibited activities:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Cheating or plagarizing solutions.</li>
                                <li>Harassing other users.</li>
                                <li>Attempting to interfere with the proper working of the service.</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Terms;
