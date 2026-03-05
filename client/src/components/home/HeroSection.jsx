import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Film, Cpu, Wand2, Zap, Play, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleField from '../ui/ParticleField';
import { staggerContainer, fadeUpVariant, floatVariant } from '../../utils/animations';
import { unsplash, IMAGES } from '../../utils/imageLoader';
import { useScrollY } from '../../hooks/useScrollY';

const FLOATING_ICONS = [
    { Icon: Film, top: '20%', left: '8%', delay: 0, color: '#7c3aed' },
    { Icon: Cpu, top: '35%', right: '9%', delay: 0.8, color: '#06b6d4' },
    { Icon: Wand2, top: '70%', left: '10%', delay: 1.5, color: '#a855f7' },
    { Icon: Zap, top: '65%', right: '7%', delay: 0.4, color: '#7c3aed' },
];

const FLOATING_CARDS = [
    { label: '4K Output', sub: 'Ultra HD rendering', top: '28%', left: '4%' },
    { label: 'AI Scripts', sub: '10× faster writing', top: '55%', right: '3%' },
    { label: 'Voice Sync', sub: 'Perfect lip sync', bottom: '22%', left: '6%' },
];

const AVATARS = [
    'https://i.pravatar.cc/40?img=1',
    'https://i.pravatar.cc/40?img=5',
    'https://i.pravatar.cc/40?img=9',
    'https://i.pravatar.cc/40?img=12',
];

export default function HeroSection() {
    const scrollY = useScrollY();
    const words = ['AI-Powered', 'Video', 'Creation,', 'Reimagined.'];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Particles */}
            <div className="absolute inset-0 z-0"><ParticleField /></div>

            {/* BG image with parallax */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: scrollY * 0.4 }}
            >
                <img src={unsplash(IMAGES.hero, 1920, 1080)} alt=""
                    className="w-full h-full object-cover opacity-10" loading="eager" />
                <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom,rgba(8,8,16,0.2),rgba(8,8,16,0.7),rgba(8,8,16,1))' }} />
            </motion.div>

            {/* Glow radial */}
            <div className="absolute inset-0 z-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%,rgba(124,58,237,0.22),transparent)' }} />

            {/* Floating icons */}
            {FLOATING_ICONS.map(({ Icon, delay, color, ...pos }) => (
                <motion.div key={delay}
                    className="absolute z-10 hidden lg:flex w-12 h-12 rounded-2xl items-center justify-center glass glow-border"
                    style={{ ...pos }}
                    variants={floatVariant(delay)} animate="animate"
                >
                    <Icon className="w-5 h-5" style={{ color }} />
                </motion.div>
            ))}

            {/* Floating info cards */}
            {FLOATING_CARDS.map(({ label, sub, ...pos }) => (
                <motion.div key={label}
                    className="absolute z-10 hidden xl:block glass rounded-xl px-4 py-2.5 glow-border"
                    style={{ ...pos }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                    transition={{ delay: 1, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
                >
                    <p className="text-xs font-bold">{label}</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{sub}</p>
                </motion.div>
            ))}

            {/* Content */}
            <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-8 text-center">
                <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                    {/* Badge */}
                    <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold glow-border"
                        style={{ background: 'rgba(124,58,237,0.12)', color: '#a78bfa' }}>
                        <Zap className="w-3 h-3" />
                        AI-Powered Video Creation Platform
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    </motion.div>

                    {/* Headline */}
                    <div className="overflow-hidden">
                        <motion.h1 className="section-title text-5xl sm:text-7xl lg:text-8xl mb-6">
                            {words.map((word, i) => (
                                <motion.span key={i}
                                    variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] } } }}
                                    className={`inline-block mr-3 ${i < 2 ? 'gradient-text' : 'text-white'}`}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </div>

                    {/* Sub */}
                    <motion.p variants={fadeUpVariant}
                        className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                        style={{ color: 'var(--color-text-muted)' }}>
                        Generate stunning videos from text in minutes. AI writes scripts, creates scenes, syncs voices — you just hit publish.
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <Link to="/register">
                            <motion.button
                                className="btn-primary px-8 py-4 text-base flex items-center gap-2.5"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(124,58,237,0.5)' }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Start Creating Free
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                        <motion.button
                            className="btn-ghost px-7 py-4 text-base flex items-center gap-2.5"
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        >
                            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.2)' }}>
                                <Play className="w-3.5 h-3.5 text-purple-400 ml-0.5" />
                            </div>
                            Watch Demo
                        </motion.button>
                    </motion.div>

                    {/* Social proof */}
                    <motion.div variants={fadeUpVariant} className="flex items-center justify-center gap-3">
                        <div className="flex -space-x-2.5">
                            {AVATARS.map((src, i) => (
                                <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-purple-900/50" />
                            ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                            </div>
                            <span>Trusted by <strong className="text-white">10,000+</strong> creators</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ color: 'var(--color-text-muted)' }}
            >
                <div className="w-px h-8 rounded-full bg-gradient-to-b from-transparent via-purple-400 to-transparent" />
                <span className="text-xs">Scroll</span>
            </motion.div>
        </section>
    );
}
