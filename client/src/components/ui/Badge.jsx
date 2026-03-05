import { motion } from 'framer-motion';

export default function Badge({ status = 'draft', className = '' }) {
    const map = {
        draft: { label: 'Draft', bg: 'rgba(99,102,241,0.18)', color: '#818cf8', dot: '#818cf8' },
        processing: { label: 'Processing', bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', dot: '#fbbf24' },
        completed: { label: 'Completed', bg: 'rgba(16,185,129,0.15)', color: '#34d399', dot: '#34d399' },
        failed: { label: 'Failed', bg: 'rgba(239,68,68,0.15)', color: '#f87171', dot: '#f87171' },
    };
    const s = map[status] || map.draft;
    return (
        <motion.span
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono ${className}`}
            style={{ background: s.bg, color: s.color }}
        >
            <span className="relative pulse-dot w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.dot, color: s.dot }} />
            {s.label}
        </motion.span>
    );
}
