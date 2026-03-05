import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Film, Users2, Zap, Star } from 'lucide-react';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

const STATS = [
    { icon: Film, label: 'Videos Generated', value: 2400000, suffix: 'M+', display: (n) => `${(n / 1000000).toFixed(1)}`, color: '#7c3aed' },
    { icon: Users2, label: 'Active Creators', value: 10000, suffix: '+', display: (n) => `${n.toLocaleString()}`, color: '#06b6d4' },
    { icon: Zap, label: 'Faster Processing', value: 10, suffix: '×', display: (n) => `${n}`, color: '#a855f7' },
    { icon: Star, label: 'Satisfaction Rate', value: 998, suffix: '%', display: (n) => `${(n / 10).toFixed(1)}`, color: '#f59e0b' },
];

function StatCard({ stat, start }) {
    const count = useAnimatedCounter(stat.value, 2200, start);
    const displayed = stat.display(count);

    return (
        <motion.div
            className="card p-8 text-center group"
            whileHover={{ y: -8, boxShadow: `0 20px 60px ${stat.color}25` }}
            style={{ borderTop: `2px solid ${stat.color}` }}
        >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5"
                style={{ background: `${stat.color}15` }}>
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>
            <div className="font-display font-black text-4xl sm:text-5xl mb-1 number-glow" style={{ color: stat.color }}>
                {displayed}<span>{stat.suffix}</span>
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
        </motion.div>
    );
}

export default function StatsSection() {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

    return (
        <section ref={ref} className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((s) => <StatCard key={s.label} stat={s} start={inView} />)}
            </div>
        </section>
    );
}
