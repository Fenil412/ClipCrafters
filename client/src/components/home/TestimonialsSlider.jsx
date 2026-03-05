import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { unsplash, IMAGES } from '../../utils/imageLoader';

const TESTIMONIALS = [
    { name: 'Sarah Chen', role: 'YouTube Creator — 2M subscribers', text: 'ClipCrafters cut my video production time from 3 days to 3 hours. The AI scripts are genuinely better than what I would write myself.', img: IMAGES.t1 },
    { name: 'Marcus Rivera', role: 'Marketing Director — TechStartup', text: 'We scaled from 4 videos/month to 40. The quality is indistinguishable from our human editors. This is the future.', img: IMAGES.t2 },
    { name: 'Priya Sharma', role: 'Film Director', text: 'I was skeptical. Then I used it. The AI understands cinematic language better than most junior editors I have worked with.', img: IMAGES.t3 },
];

export default function TestimonialsSlider() {
    const [idx, setIdx] = useState(0);
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
    const t = TESTIMONIALS[idx];

    return (
        <section ref={ref} className="py-24 px-4 sm:px-8 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                className="text-center mb-12">
                <h2 className="section-title text-4xl sm:text-5xl mb-3">Loved by <span className="gradient-text">creators</span></h2>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
                className="card p-10 sm:p-14 relative">
                <Quote className="w-10 h-10 text-purple-400/30 absolute top-8 left-8" />

                <AnimatePresence mode="wait">
                    <motion.div key={idx}
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.35 }} className="text-center">
                        <p className="text-xl sm:text-2xl font-medium leading-relaxed mb-8" style={{ color: 'var(--color-text-primary)' }}>
                            "{t.text}"
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <img src={unsplash(t.img, 80, 80)} alt={t.name}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/40" />
                            <div className="text-left">
                                <p className="font-display font-bold text-sm">{t.name}</p>
                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{t.role}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <motion.button onClick={() => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                        className="w-10 h-10 rounded-xl glow-border flex items-center justify-center"
                        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                        <ChevronLeft className="w-4 h-4 text-purple-400" />
                    </motion.button>
                    <div className="flex gap-2">
                        {TESTIMONIALS.map((_, i) => (
                            <button key={i} onClick={() => setIdx(i)}
                                className="transition-all duration-300 rounded-full"
                                style={{ width: i === idx ? '24px' : '8px', height: '8px', background: i === idx ? 'var(--gradient-accent)' : 'rgba(124,58,237,0.25)' }} />
                        ))}
                    </div>
                    <motion.button onClick={() => setIdx((i) => (i + 1) % TESTIMONIALS.length)}
                        className="w-10 h-10 rounded-xl glow-border flex items-center justify-center"
                        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                        <ChevronRight className="w-4 h-4 text-purple-400" />
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}
