import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Code2,
  Zap,
  Trophy,
  BookOpen,
  Users,
  ArrowRight,
  Sparkles,
  Target,
  Rocket,
  ChevronRight,
  Star,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Landing = () => {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login',
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    // Check for logged-in user
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('login') === 'true') {
      setAuthModal({ isOpen: true, mode: 'login' });
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    toast.success('Logged out successfully', {
      description: 'Come back soon to continue your quest!',
    });
  };

  const features = [
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Interactive Challenges',
      description: 'Learn by doing with hands-on coding challenges that adapt to your skill level',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'Visual Learning',
      description: 'Watch algorithms come to life with beautiful, animated visualizations',
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: 'Earn Rewards',
      description: 'Gain XP, unlock badges, and climb the leaderboard as you progress',
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Step-by-Step Guidance',
      description: 'Follow guided instructions that break down complex concepts into simple steps',
    },
  ];

  const stats = [
    { value: '50+', label: 'Challenges' },
    { value: '10K+', label: 'Students' },
    { value: '15+', label: 'Topics' },
    { value: '4.9', label: 'Rating' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isLoggedIn={!!userInfo}
        onLoginClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
        onSignupClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cq-cyan/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cq-purple/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Level up your coding skills</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6"
            >
              Master{' '}
              <span className="bg-gradient-to-r from-cq-cyan to-cq-purple bg-clip-text text-transparent">
                Algorithms
              </span>
              <br />
              Through Play
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10"
            >
              Learn data structures and algorithms with interactive challenges, real-time visualizations, and a gamified learning experience.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                variant="hero"
                size="xl"
                onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
                className="gap-2"
              >
                <Rocket className="h-5 w-5" />
                Start Your Quest
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Link to="/challenges">
                <Button variant="heroOutline" size="xl" className="gap-2">
                  <BookOpen className="h-5 w-5" />
                  Browse Challenges
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Preview Image/Animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-20 relative"
          >
            <div className="relative mx-auto max-w-5xl rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted-foreground">marga.dev/challenge/linked-list</span>
                </div>
              </div>

              {/* Content preview */}
              <div className="p-8 grid grid-cols-3 gap-4 h-[400px]">
                {/* Left panel mock */}
                <div className="rounded-xl border border-border/30 bg-muted/20 p-4 space-y-4">
                  <div className="h-4 w-3/4 rounded bg-border/50" />
                  <div className="h-3 w-full rounded bg-border/30" />
                  <div className="h-3 w-5/6 rounded bg-border/30" />
                  <div className="space-y-2 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-cq-green/50" />
                      <div className="h-3 flex-1 rounded bg-border/30" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-cq-cyan/50" />
                      <div className="h-3 flex-1 rounded bg-border/30" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-border/30" />
                      <div className="h-3 flex-1 rounded bg-border/30" />
                    </div>
                  </div>
                </div>

                {/* Center visualization mock */}
                <div className="rounded-xl border border-border/30 bg-muted/20 p-4 flex items-center justify-center">
                  <div className="flex items-center gap-6">
                    {[42, 17, 88].map((val, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 + i * 0.2 }}
                        className="flex items-center"
                      >
                        <div className="w-16 h-12 rounded-lg border-2 border-cq-cyan/50 bg-card flex items-center justify-center">
                          <span className="font-mono font-bold text-foreground">{val}</span>
                        </div>
                        {i < 2 && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1 + i * 0.2 }}
                            className="w-8 h-0.5 bg-gradient-to-r from-cq-cyan to-cq-purple origin-left"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right editor mock */}
                <div className="rounded-xl border border-border/30 bg-cq-dark p-4 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-2 py-1 rounded bg-cq-purple/20 text-cq-purple text-xs">Python</div>
                  </div>
                  <div className="space-y-1 text-muted-foreground">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <span className="text-cq-purple">class</span>{' '}
                      <span className="text-cq-cyan">Node</span>:
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="pl-4"
                    >
                      <span className="text-cq-purple">def</span>{' '}
                      <span className="text-cq-gold">__init__</span>(self):
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6 }}
                      className="pl-8"
                    >
                      self.data = <span className="text-cq-gold">42</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-x-0 -bottom-20 h-40 bg-gradient-to-t from-background to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-cq-cyan to-cq-purple bg-clip-text text-transparent">
                Marga
              </span>
              ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've reimagined how programming should be learned—through play, visualization, and immediate feedback.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cq-cyan/20 to-cq-purple/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cq-cyan/10 to-cq-purple/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cq-purple/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-cq-gold fill-cq-gold" />
            ))}
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Begin Your Quest?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of students who are already mastering algorithms through our gamified platform.
          </p>
          <Button
            variant="hero"
            size="xl"
            onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
            className="gap-2"
          >
            <Code2 className="h-5 w-5" />
            Create Free Account
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="font-display font-bold text-foreground">Marga</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <Link to="/feedback" className="hover:text-foreground transition-colors">Feedback</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Marga. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        initialMode={authModal.mode}
        onLoginSuccess={(user, isSignup) => {
          setUserInfo(user);
          if (isSignup) {
            navigate('/questionnaire');
          } else {
            navigate('/dashboard');
          }
        }}
      />
    </div>
  );
};

export default Landing;
