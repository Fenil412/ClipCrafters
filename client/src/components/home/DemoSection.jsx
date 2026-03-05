import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedImage from '../common/AnimatedImage';
import { unsplash, IMAGES } from '../../utils/imageLoader';
import { Play, Zap, Film, Layers } from 'lucide-react';

export default function DemoSection() {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

    return (
        <section id="demo" ref={ref} className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
                <h2 className="section-title text-4xl sm:text-5xl mb-4">See it in <span className="gradient-text">action</span></h2>
                <p style={{ color: 'var(--color-text-muted)' }}>Watch ClipCrafters transform a simple prompt into a broadcast-quality video.</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden card"
                style={{ minHeight: '420px' }}
            >
                <AnimatedImage src={unsplash(IMAGES.videoEditor, 1400, 700)} alt="Product Demo" aspectRatio="2/1" />

                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'rgba(8,8,16,0.5)' }}>
                    <motion.button
                        className="w-20 h-20 rounded-full flex items-center justify-center shadow-glow"
                        style={{ background: 'var(--gradient-accent)' }}
                        whileHover={{ scale: 1.15, boxShadow: '0 0 60px rgba(124,58,237,0.7)' }}
                        whileTap={{ scale: 0.95 }}>
                        <Play className="w-8 h-8 text-white ml-1" />
                    </motion.button>
                </div>

                {/* Floating badges */}
                <div className="absolute top-6 left-6 flex gap-2 flex-wrap">
                    {[{ icon: Zap, label: 'AI powered' }, { icon: Film, label: '4K output' }, { icon: Layers, label: 'Multi-track' }].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold glass"
                            style={{ color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}>
                            <Icon className="w-3 h-3" /> {label}
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
