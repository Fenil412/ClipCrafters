import { motion } from 'framer-motion';
import { pageVariant } from '../../utils/animations';

export default function PageTransition({ children }) {
    return (
        <motion.div
            variants={pageVariant}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>
    );
}
