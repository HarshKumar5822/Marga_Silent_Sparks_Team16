import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Github, Chrome, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            localStorage.setItem('userInfo', JSON.stringify(data));

            toast.success('Account created successfully!', {
                description: 'Your coding journey begins now!',
            });

            navigate('/questionnaire');
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-background">
            {/* Background effects */}
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cq-cyan/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cq-purple/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-md"
            >
                <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md p-8 shadow-2xl">
                    {/* Logo - Optional */}
                    <div className="flex justify-center mb-6">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-cq-cyan to-cq-purple shadow-lg shadow-cq-cyan/20">
                            <Code2 className="h-8 w-8 text-cq-dark" />
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="font-display text-2xl font-bold text-foreground">
                            Start Your Quest
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Create an account to track your progress
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                        >
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="pl-10 bg-muted/50 border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground"
                                    required
                                />
                            </div>
                        </motion.div>

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="pl-10 bg-muted/50 border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground"
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="pl-10 pr-10 bg-muted/50 border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        <Button
                            type="submit"
                            variant="hero"
                            size="lg"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="h-5 w-5 border-2 border-cq-dark border-t-transparent rounded-full"
                                />
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-card px-4 text-muted-foreground">or continue with</span>
                        </div>
                    </div>

                    {/* Social login buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" type="button" className="gap-2 border-border/50 text-foreground hover:bg-muted hover:text-foreground">
                            <Github className="h-4 w-4" />
                            GitHub
                        </Button>
                        <Button variant="outline" type="button" className="gap-2 border-border/50 text-foreground hover:bg-muted hover:text-foreground">
                            <Chrome className="h-4 w-4" />
                            Google
                        </Button>
                    </div>

                    {/* Login Link */}
                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link
                            to="/"
                            className="text-primary font-semibold hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
