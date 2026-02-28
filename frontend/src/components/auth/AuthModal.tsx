import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, Github, Chrome, School, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onLoginSuccess?: (user: any, isSignup: boolean) => void;
}

const AuthModal = ({ isOpen, onClose, initialMode = 'login', onLoginSuccess }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    college: '',
    age: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const url = mode === 'login'
        ? 'https://marga-silent-sparks-team16-2.onrender.com/api/auth/login'
        : 'https://marga-silent-sparks-team16-2.onrender.com/api/auth/signup';

      const payload = {
        email: formData.email,
        password: formData.password,
        ...(mode === 'signup' && {
          name: formData.username,
          college: formData.college,
          age: formData.age
        }),
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      localStorage.setItem('userInfo', JSON.stringify(data));
      if (onLoginSuccess) {
        onLoginSuccess(data, mode === 'signup');
      }

      if (mode === 'login') {
        toast.success('Welcome back, adventurer!', {
          description: 'Your quest continues...',
        });
      } else {
        toast.success('Account created successfully!', {
          description: 'Your coding journey begins now!',
        });
      }
      onClose();
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-cq-dark/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="relative rounded-2xl border border-border/50 bg-card p-8 shadow-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <motion.h2
                  key={mode}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-2xl font-bold text-foreground"
                >
                  {mode === 'login' ? 'Welcome Back' : 'Start Your Quest'}
                </motion.h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {mode === 'login'
                    ? 'Continue your coding adventure'
                    : 'Create an account to track your progress'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
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
                )}

                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <School className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        name="college"
                        placeholder="College / University"
                        value={formData.college}
                        onChange={handleInputChange}
                        className="pl-10 bg-muted/50 border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="pl-10 bg-muted/50 border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground"
                        required
                        min="1"
                        max="100"
                      />
                    </div>
                  </motion.div>
                )}

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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {mode === 'signup' && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 bg-muted/50 border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                )}

                {mode === 'login' && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        // We need to navigate to /forgot-password, but since we are in a modal, 
                        // we can't easily use Link if the modal is portaled outside (though it isn't here).
                        // However, simpler to just use window location or expect parent to handle navigation.
                        // Actually, I can use a simple link if I have access to router context, which I do.
                        // But wait, using `Link` component is better, or just `window.location.href` to be safe/simple
                        // or better yet, use a callback or just standard anchor for now if Link import is tricky to add 
                        // without breaking existing imports.
                        // Ah, I can just use window.location.assign('/forgot-password') for simplicity 
                        // or import Link if already imported? No UseNavigate is better.
                        window.location.href = '/forgot-password';
                      }}
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

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
                  ) : mode === 'login' ? (
                    'Log In'
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

              {/* Toggle mode */}
              <p className="mt-6 text-center text-sm text-muted-foreground">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-primary font-semibold hover:underline"
                >
                  {mode === 'login' ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </motion.div>
        </div >
      )}
    </AnimatePresence >
  );
};

export default AuthModal;
