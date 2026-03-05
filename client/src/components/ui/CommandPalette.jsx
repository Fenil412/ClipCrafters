import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, FolderOpen, Video, User, LogOut, Zap, Moon, Sun, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { commandVariant, backdropVariant, fastStagger, fadeUpVariant } from '../../utils/animations';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

const COMMANDS = [
    { id: 'dashboard', label: 'Go to Dashboard', icon: LayoutDashboard, category: 'Pages', path: '/dashboard' },
    { id: 'projects', label: 'My Projects', icon: FolderOpen, category: 'Pages', path: '/dashboard' },
    { id: 'create', label: 'Create New Project', icon: Zap, category: 'Actions', path: '/projects/create' },
    { id: 'videos', label: 'Video Editor', icon: Video, category: 'Pages', path: '/editor' },
    { id: 'profile', label: 'View Profile', icon: User, category: 'Pages', path: '/profile' },
];

export default function CommandPalette({ open, onClose }) {
    const [q, setQ] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { toggleTheme, isDark } = useTheme();

    const allCommands = [
        ...COMMANDS,
        { id: 'theme', label: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`, icon: isDark ? Sun : Moon, category: 'Actions', action: toggleTheme },
        { id: 'logout', label: 'Logout', icon: LogOut, category: 'Actions', action: () => { logout(); navigate('/login'); } },
    ];

    const filtered = q
        ? allCommands.filter(c => c.label.toLowerCase().includes(q.toLowerCase()))
        : allCommands;

    const grouped = filtered.reduce((acc, c) => {
        if (!acc[c.category]) acc[c.category] = [];
        acc[c.category].push(c);
        return acc;
    }, {});

    useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);

    const run = (cmd) => {
        if (cmd.path) { navigate(cmd.path); }
        if (cmd.action) cmd.action();
        onClose();
        setQ('');
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        variants={backdropVariant} initial="hidden" animate="visible" exit="hidden"
                        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <div className="fixed inset-0 z-[201] flex items-start justify-center pt-28 px-4 pointer-events-none">
                        <motion.div
                            variants={commandVariant} initial="hidden" animate="visible" exit="exit"
                            className="w-full max-w-lg glass-dark rounded-2xl border border-purple-500/25 shadow-glow overflow-hidden pointer-events-auto"
                        >
                            {/* Search input */}
                            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
                                <Search className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                <input
                                    ref={inputRef}
                                    value={q} onChange={e => setQ(e.target.value)}
                                    placeholder="Search commands…"
                                    className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
                                    style={{ color: 'var(--color-text-primary)' }}
                                />
                                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded border border-white/10 text-xs text-gray-500">ESC</kbd>
                            </div>

                            {/* Results */}
                            <div className="max-h-80 overflow-y-auto p-2">
                                {Object.entries(grouped).length === 0 ? (
                                    <p className="text-center text-sm py-8" style={{ color: 'var(--color-text-muted)' }}>No results found</p>
                                ) : (
                                    <motion.div variants={fastStagger} initial="hidden" animate="visible">
                                        {Object.entries(grouped).map(([cat, cmds]) => (
                                            <div key={cat} className="mb-2">
                                                <p className="px-3 py-1 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{cat}</p>
                                                {cmds.map(cmd => (
                                                    <motion.button
                                                        key={cmd.id}
                                                        variants={fadeUpVariant}
                                                        onClick={() => run(cmd)}
                                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                                                        style={{ color: 'var(--color-text-primary)' }}
                                                        whileHover={{ background: 'rgba(124,58,237,0.14)' }}
                                                    >
                                                        <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                                            style={{ background: 'rgba(124,58,237,0.15)' }}>
                                                            <cmd.icon className="w-4 h-4 text-purple-400" />
                                                        </span>
                                                        <span className="text-sm font-medium">{cmd.label}</span>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </div>

                            <div className="px-4 py-2.5 border-t border-white/5 flex items-center gap-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                <Command className="w-3 h-3" />
                                <span>⌘K to toggle • ↑↓ navigate • ENTER to run</span>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
