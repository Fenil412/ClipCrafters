import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Film, Mic2, Monitor, Users2, Cloud, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import AnimatedImage from '../common/AnimatedImage';
import { unsplash, IMAGES } from '../../utils/imageLoader';

const FEATURES = [
    { icon: Sparkles, title: 'AI Script Generation', desc: 'Transform any text, idea, or topic into a compelling video script in seconds. Our AI understands context, tone, and intent.', img: IMAGES.feature1, color: '#7c3aed' },
    { icon: Film, title: 'Auto Scene Editing', desc: 'Intelligent scene detection and automatic editing. AI cuts, transitions, and arranges your video for maximum impact.', img: IMAGES.feature2, color: '#06b6d4' },
    { icon: Mic2, title: 'Voice Synthesis', desc: 'Studio-quality AI voices in 30+ languages. Perfect lip sync and emotion matching for every scene.', img: IMAGES.feature3, color: '#a855f7' },
    { icon: Monitor, title: '4K Export', desc: 'Render in stunning 4K quality with HDR support. Export to any platform in the perfect format.', img: IMAGES.feature1, color: '#f59e0b' },
    { icon: Users2, title: 'Collaboration', desc: 'Real-time multi-user editing. Comment, suggest, and approve changes with your entire team.', img: IMAGES.feature2, color: '#10b981' },
    { icon: Cloud, title: 'Cloud Storage', desc: 'Unlimited cloud storage with instant CDN delivery. Your projects are always safe and accessible.', img: IMAGES.feature3, color: '#ef4444' },
];

function FeatureCard({ feature, index }) {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const onMove = (e) => {
        const el = cardRef.current;
        if (!el) return;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 18;
        const y = ((e.clientY - top) / height - 0.5) * -18;
        setTilt({ x, y });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.div
                ref={cardRef}
                className="card hover-gradient-border overflow-hidden h-full group"
                style={{ transformStyle: 'perspective(1000px)' }}
                animate={{ rotateX: tilt.y, rotateY: tilt.x }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                whileHover={{ y: -8, boxShadow: `0 20px 60px ${feature.color}25, 0 4px 20px rgba(0,0,0,0.4)` }}
            >
                {/* Image */}
                <div className="overflow-hidden relative">
                    <AnimatedImage src={`https://images.unsplash.com/photo-${feature.img}?w=600&h=280&fit=crop&auto=format&q=80`} alt={feature.title} aspectRatio="16/7" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom,transparent 50%,rgba(8,8,16,0.8))` }} />
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                        style={{ background: `${feature.color}20` }}>
                        <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>{feature.desc}</p>
                    <motion.span className="inline-flex items-center gap-1.5 text-sm font-semibold group/link"
                        style={{ color: feature.color }}
                        whileHover={{ gap: '0.5rem' }}>
                        Learn more
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </motion.span>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function FeatureCards() {
    const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

    return (
        <section id="features" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto">
            <div ref={ref} className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                    style={{ background: 'rgba(124,58,237,0.12)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.25)' }}>
                    <Sparkles className="w-3 h-3" /> Everything you need
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="section-title text-4xl sm:text-6xl mb-5">
                    Features that <span className="gradient-text">ship fast</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                    Everything you need to create, edit, and publish AI-powered videos — in one platform.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURES.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
            </div>
        </section>
    );
}
