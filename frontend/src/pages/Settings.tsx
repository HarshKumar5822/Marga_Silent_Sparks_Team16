import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ModeToggle } from "@/components/theme/ModeToggle";

const Settings = () => {
    const navigate = useNavigate();
    const [userInfo] = useState(() => {
        const saved = localStorage.getItem('userInfo');
        return saved ? JSON.parse(saved) : { name: 'Adventurer', email: 'adventurer@marga.dev' };
    });

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    const sections = [
        {
            title: 'Profile Settings',
            icon: <User className="h-5 w-5 text-cq-cyan" />,
            content: (
                <div className="space-y-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-muted-foreground">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                defaultValue={userInfo.name}
                                className="pl-9 bg-muted/50 border-border/50"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                defaultValue={userInfo.email}
                                className="pl-9 bg-muted/50 border-border/50"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Appearance',
            icon: <Shield className="h-5 w-5 text-cq-purple" />,
            content: (
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
                    <div className="space-y-1">
                        <h4 className="font-medium text-foreground">Theme Preference</h4>
                        <p className="text-sm text-muted-foreground">Toggle between light and dark modes</p>
                    </div>
                    <ModeToggle />
                </div>
            )
        },
        {
            title: 'Notifications',
            icon: <Bell className="h-5 w-5 text-cq-gold" />,
            content: (
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
                        <div className="space-y-1">
                            <h4 className="font-medium text-foreground">Email Notifications</h4>
                            <p className="text-sm text-muted-foreground">Receive updates about new challenges</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
                        <div className="space-y-1">
                            <h4 className="font-medium text-foreground">Achievement Alerts</h4>
                            <p className="text-sm text-muted-foreground">Get notified when you earn badges</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar isLoggedIn onLogout={handleLogout} />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Settings</h1>
                        <p className="text-muted-foreground">Manage your account preferences and settings</p>
                    </motion.div>

                    <div className="space-y-6">
                        {sections.map((section, index) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl border border-border/50 bg-card"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-muted/50">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                                </div>
                                {section.content}
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex justify-start"
                        >
                            <Button
                                variant="destructive"
                                onClick={handleLogout}
                                className="gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;
