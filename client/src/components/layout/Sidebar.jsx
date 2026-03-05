import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, FolderOpen, Video, Film, BarChart2,
    Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

const NAV = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: FolderOpen, label: 'Projects', to: '/dashboard' },
    { icon: Video, label: 'Videos', to: '/dashboard' },
    { icon: Film, label: 'Scenes', to: '/dashboard' },
    { icon: BarChart2, label: 'Analytics', to: '/dashboard' },
    { icon: Settings, label: 'Settings', to: '/dashboard' },
    { icon: HelpCircle, label: 'Help', to: '/dashboard' },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();

    return (
        <motion.aside
            animate={{ width: collapsed ? 72 : 240 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex flex-col fixed left-0 top-0 h-full z-40 border-r"
            style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 h-16 border-b flex-shrink-0" style={{ borderColor: 'var(--color-border)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--gradient-accent)' }}>
                    <Film className="w-5 h-5 text-white" />
                </div>
                {!collapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display font-bold gradient-text truncate">
                        ClipCrafters
                    </motion.span>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {NAV.map(({ icon: Icon, label, to }) => {
                    const active = location.pathname === to;
                    return (
                        <Link key={label} to={to}>
                            <motion.div
                                whileHover={{ x: collapsed ? 0 : 3 }}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative overflow-hidden group"
                                style={{
                                    background: active ? 'rgba(124,58,237,0.18)' : 'transparent',
                                    color: active ? '#a78bfa' : 'var(--color-text-muted)',
                                }}
                            >
                                {active && (
                                    <motion.div layoutId="sidebar-active"
                                        className="absolute inset-0 rounded-xl"
                                        style={{ background: 'linear-gradient(90deg,rgba(124,58,237,0.2),transparent)' }}
                                    />
                                )}
                                <Icon className="w-5 h-5 flex-shrink-0 relative z-10" />
                                {!collapsed && (
                                    <motion.span
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="text-sm font-medium relative z-10 truncate"
                                    >{label}</motion.span>
                                )}
                                {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full bg-purple-400" />}
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* User + collapse */}
            <div className="p-3 border-t flex-shrink-0 space-y-2" style={{ borderColor: 'var(--color-border)' }}>
                {user && (
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: 'var(--gradient-accent)' }}>
                            {user.name?.[0]?.toUpperCase()}
                        </div>
                        {!collapsed && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-w-0">
                                <p className="text-xs font-semibold truncate">{user.name}</p>
                                <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{user.email}</p>
                            </motion.div>
                        )}
                    </div>
                )}
                <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/8 transition-colors">
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span>Logout</span>}
                </button>
                <button onClick={() => setCollapsed(v => !v)}
                    className="w-full flex items-center justify-center px-3 py-2 rounded-xl transition-colors hover:bg-white/5"
                    style={{ color: 'var(--color-text-muted)' }}>
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </div>
        </motion.aside>
    );
}
