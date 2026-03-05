import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Film } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import { staggerContainer, fadeUpVariant } from '../utils/animations';

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%,rgba(124,58,237,0.1),transparent)' }} />
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10 max-w-md">
          <motion.div variants={fadeUpVariant} className="font-display font-black text-[9rem] leading-none gradient-text mb-2">
            404
          </motion.div>
          <motion.div variants={fadeUpVariant} className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{ background: 'var(--gradient-accent)' }}>
            <Film className="w-7 h-7 text-white" />
          </motion.div>
          <motion.h1 variants={fadeUpVariant} className="section-title text-3xl mb-3">Scene not found</motion.h1>
          <motion.p variants={fadeUpVariant} className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
            This page was cut from the final edit. Let's get you back to the main production.
          </motion.p>
          <motion.div variants={fadeUpVariant}>
            <Link to="/">
              <motion.button className="btn-primary px-8 py-3.5 text-sm flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
