import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ScrollReveal({ children, delay = 0, className = '', once = true }) {
    const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: once });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
