import { motion } from 'framer-motion';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { useInView } from 'react-intersection-observer';

export default function StatWidget({ icon: Icon, label, value, suffix = '', color = '#7c3aed' }) {
    const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true });
    const count = useAnimatedCounter(typeof value === 'number' ? value : 0, 1800, inView);

    return (
        <motion.div ref={ref} className="card p-6 group" whileHover={{ y: -6, boxShadow: `0 16px 50px ${color}25` }}
            style={{ borderTop: `2px solid ${color}` }}>
            <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                </div>
            </div>
            <div className="font-display font-black text-3xl number-glow mb-1" style={{ color }}>
                {typeof value === 'number' ? count : value}{suffix}
            </div>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
        </motion.div>
    );
}
