import { motion } from 'framer-motion';

export default function TimelineBar({ scenes = [], activeId, onSeek }) {
    const colors = ['#7c3aed', '#06b6d4', '#a855f7', '#f59e0b', '#10b981'];

    return (
        <div className="px-4 py-3 border-t" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-2)' }}>
            <div className="text-xs mb-2 font-mono" style={{ color: 'var(--color-text-muted)' }}>Timeline</div>
            <div className="relative h-10 rounded-xl overflow-hidden flex gap-0.5" style={{ background: 'rgba(124,58,237,0.06)' }}>
                {scenes.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        No scenes
                    </div>
                ) : (
                    scenes.map((s, i) => (
                        <motion.button
                            key={s._id || i}
                            onClick={() => onSeek?.(s._id)}
                            className="h-full flex-1 rounded-lg flex items-center justify-center text-xs font-mono relative"
                            style={{ background: activeId === s._id ? colors[i % colors.length] : `${colors[i % colors.length]}35`, color: '#fff' }}
                            whileHover={{ opacity: 0.9 }}
                        >
                            {i + 1}
                        </motion.button>
                    ))
                )}
                {/* Playhead */}
                <motion.div
                    className="absolute top-0 bottom-0 w-0.5 rounded-full bg-white shadow-glow-sm"
                    initial={{ left: '35%' }}
                    style={{ left: '35%' }}
                />
            </div>
        </div>
    );
}
