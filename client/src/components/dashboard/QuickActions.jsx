import { motion } from 'framer-motion';
import { Plus, Upload, Zap, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tooltip from '../ui/Tooltip';

const ACTIONS = [
    { icon: Plus, label: 'New Project', to: '/projects/create', color: '#7c3aed' },
    { icon: Upload, label: 'Upload Video', to: '/dashboard', color: '#06b6d4' },
    { icon: Zap, label: 'AI Generate', to: '/projects/create', color: '#a855f7' },
    { icon: Download, label: 'Export', to: '/dashboard', color: '#f59e0b' },
];

export default function QuickActions() {
    return (
        <div className="flex items-center gap-3 flex-wrap">
            {ACTIONS.map(({ icon: Icon, label, to, color }) => (
                <Tooltip key={label} label={label} side="bottom">
                    <Link to={to}>
                        <motion.div
                            className="w-12 h-12 rounded-xl flex items-center justify-center glow-border"
                            style={{ background: `${color}12` }}
                            whileHover={{ scale: 1.12, y: -3, boxShadow: `0 8px 30px ${color}30` }}
                            whileTap={{ scale: 0.92 }}
                        >
                            <Icon className="w-5 h-5" style={{ color }} />
                        </motion.div>
                    </Link>
                </Tooltip>
            ))}
        </div>
    );
}
