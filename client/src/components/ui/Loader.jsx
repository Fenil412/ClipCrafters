import { motion } from 'framer-motion';
import { Film } from 'lucide-react';

export default function Loader({ fullScreen = false }) {
    if (!fullScreen) {
        return (
            <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
                <motion.div
                    className="w-8 h-8 rounded-full border-2 border-transparent"
                    style={{ borderTopColor: '#7c3aed', borderRightColor: '#06b6d4' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                />
            </motion.div>
        );
    }

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{ background: 'var(--color-surface)' }}
            initial={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 14, stiffness: 200 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center mb-8 shadow-glow"
            >
                <Film className="w-10 h-10 text-white" />
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display font-bold text-xl gradient-text mb-6"
            >
                ClipCrafters
            </motion.p>

            <div className="w-48 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(124,58,237,0.15)' }}>
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'var(--gradient-accent)' }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
        </motion.div>
    );
}
