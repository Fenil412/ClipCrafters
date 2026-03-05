import { motion } from 'framer-motion';
import { Film, FolderOpen, Zap, Check, Clock, Upload } from 'lucide-react';
import { fastStagger, fadeUpVariant } from '../../utils/animations';
import { timeAgo } from '../../utils/formatDate';

const MOCK = [
    { icon: Check, label: 'Video render completed', time: new Date(Date.now() - 3e5), color: '#10b981' },
    { icon: Zap, label: 'Scene AI generation started', time: new Date(Date.now() - 9e5), color: '#7c3aed' },
    { icon: FolderOpen, label: 'New project created', time: new Date(Date.now() - 1.8e6), color: '#06b6d4' },
    { icon: Upload, label: 'Video uploaded successfully', time: new Date(Date.now() - 3.6e6), color: '#a855f7' },
    { icon: Film, label: 'Script generated', time: new Date(Date.now() - 7.2e6), color: '#f59e0b' },
];

export default function ActivityFeed() {
    return (
        <div className="card p-6">
            <h3 className="font-display font-bold text-base mb-5">Recent Activity</h3>
            <motion.div variants={fastStagger} initial="hidden" animate="visible" className="space-y-4">
                {MOCK.map((item, i) => (
                    <motion.div key={i} variants={fadeUpVariant} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: `${item.color}18` }}>
                            <item.icon className="w-4 h-4" style={{ color: item.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.label}</p>
                            <div className="flex items-center gap-1 mt-0.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                <Clock className="w-3 h-3" />
                                {timeAgo(item.time)}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
