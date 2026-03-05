import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTABanner() {
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
    return (
        <section ref={ref} className="py-16 px-4 sm:px-8 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                className="relative overflow-hidden rounded-3xl p-12 sm:p-20 text-center"
                style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.25) 0%,rgba(6,182,212,0.15) 100%)', border: '1px solid rgba(124,58,237,0.3)' }}>
                <div className="absolute inset-0 opacity-30"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(124,58,237,0.5),transparent 70%)' }} />
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6"
                        style={{ background: 'rgba(124,58,237,0.2)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}>
                        <Zap className="w-3 h-3" /> Limited time — First 3 videos free
                    </div>
                    <h2 className="section-title text-4xl sm:text-6xl mb-5">
                        Ready to create <span className="gradient-text">extraordinary</span> videos?
                    </h2>
                    <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                        Join 10,000+ creators already using ClipCrafters to build their content empires.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register">
                            <motion.button className="btn-primary px-10 py-4 text-lg flex items-center gap-2"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(124,58,237,0.5)' }}
                                whileTap={{ scale: 0.97 }}>
                                Start for Free <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
