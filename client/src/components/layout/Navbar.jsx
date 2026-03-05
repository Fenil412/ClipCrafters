import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Menu, X, Search, Bell, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useScrollY } from '../../hooks/useScrollY';
import ThemeToggle from '../ui/ThemeToggle';
import { staggerContainer, fadeUpVariant } from '../../utils/animations';

const NAV_LINKS = [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Demo', href: '/#demo' },
];

export default function Navbar({ onSearch }) {
    const scrollY = useScrollY();
    const { isAuthenticated, user, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [avatarOpen, setAvatarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const scrolled = scrollY > 55;

    const handleLogout = () => { logout(); navigate('/login'); setAvatarOpen(false); };

    return (
        <>
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
                animate={{ borderBottomColor: scrolled ? 'rgba(124,58,237,0.15)' : 'transparent' }}
                style={{
                    background: scrolled ? 'rgba(8,8,16,0.88)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: '1px solid',
                    boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <motion.div
                                className="w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{ background: 'var(--gradient-accent)' }}
                                whileHover={{ rotate: 10, scale: 1.08 }}
                                transition={{ type: 'spring', stiffness: 350 }}
                            >
                                <Film className="w-5 h-5 text-white" />
                            </motion.div>
                            <span className="font-display font-bold text-lg tracking-tight gradient-text">ClipCrafters</span>
                        </Link>

                        {/* Desktop links */}
                        <div className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map(l => (
                                <Link key={l.label} to={l.href}
                                    className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors group"
                                    style={{ color: 'var(--color-text-muted)' }}
                                >
                                    <span className="relative z-10 group-hover:text-white transition-colors duration-200">{l.label}</span>
                                    <motion.span
                                        className="absolute inset-0 rounded-lg"
                                        initial={false}
                                        whileHover={{ background: 'rgba(124,58,237,0.1)' }}
                                    />
                                </Link>
                            ))}
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-2">
                            {onSearch && (
                                <motion.button onClick={onSearch} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
                                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs border border-white/8 text-gray-500 hover:border-purple-500/35 transition-all">
                                    <Search className="w-3.5 h-3.5" />
                                    <span>Search</span>
                                    <kbd className="ml-1 text-xs opacity-60">⌘K</kbd>
                                </motion.button>
                            )}

                            <ThemeToggle />

                            {isAuthenticated ? (
                                <div className="relative">
                                    <motion.button
                                        onClick={() => setAvatarOpen(v => !v)}
                                        className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 glow-border"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                            style={{ background: 'var(--gradient-accent)' }}>
                                            {user?.name?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                        <span className="hidden sm:block text-xs font-medium max-w-[80px] truncate">{user?.name}</span>
                                        <ChevronDown className="w-3 h-3 opacity-60" />
                                    </motion.button>

                                    <AnimatePresence>
                                        {avatarOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                                transition={{ duration: 0.18 }}
                                                className="absolute right-0 top-full mt-2 w-48 glass-dark rounded-xl border border-white/8 shadow-glow overflow-hidden py-1"
                                                onClick={() => setAvatarOpen(false)}
                                            >
                                                {[
                                                    { icon: User, label: 'Profile', to: '/profile' },
                                                    { icon: Settings, label: 'Settings', to: '/dashboard' },
                                                ].map(({ icon: Icon, label, to }) => (
                                                    <Link key={label} to={to}
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                                                        style={{ color: 'var(--color-text-primary)' }}>
                                                        <Icon className="w-4 h-4 text-purple-400" />
                                                        {label}
                                                    </Link>
                                                ))}
                                                <div className="border-t border-white/5 mt-1 pt-1">
                                                    <button onClick={handleLogout}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/8 transition-colors">
                                                        <LogOut className="w-4 h-4" />
                                                        Logout
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="hidden sm:flex items-center gap-2">
                                    <Link to="/login" className="btn-ghost px-4 py-2 text-sm">Login</Link>
                                    <Link to="/register">
                                        <motion.span className="btn-primary px-4 py-2 text-sm inline-block" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                                            Get Started
                                        </motion.span>
                                    </Link>
                                </div>
                            )}

                            {/* Mobile hamburger */}
                            <motion.button onClick={() => setMobileOpen(v => !v)} className="md:hidden p-2" whileTap={{ scale: 0.9 }}>
                                <AnimatePresence mode="wait">
                                    {mobileOpen
                                        ? <motion.span key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }}><X className="w-5 h-5" /></motion.span>
                                        : <motion.span key="m" initial={{ rotate: 90 }} animate={{ rotate: 0 }}><Menu className="w-5 h-5" /></motion.span>}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 pt-16 glass-dark md:hidden"
                        onClick={() => setMobileOpen(false)}
                    >
                        <motion.div
                            variants={staggerContainer} initial="hidden" animate="visible"
                            className="flex flex-col items-center justify-center h-full gap-4 p-8"
                            onClick={e => e.stopPropagation()}
                        >
                            {NAV_LINKS.map(l => (
                                <motion.div key={l.label} variants={fadeUpVariant}>
                                    <Link to={l.href} onClick={() => setMobileOpen(false)}
                                        className="block text-2xl font-display font-bold py-2 gradient-text">{l.label}</Link>
                                </motion.div>
                            ))}
                            <motion.div variants={fadeUpVariant} className="flex gap-3 mt-6">
                                {isAuthenticated ? (
                                    <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="btn-ghost px-6 py-3">Logout</button>
                                ) : (
                                    <>
                                        <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-ghost px-6 py-3">Login</Link>
                                        <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary px-6 py-3">Get Started</Link>
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
