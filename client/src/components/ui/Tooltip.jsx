import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Tooltip({ children, label, side = 'top' }) {
    const [show, setShow] = useState(false);
    const posMap = {
        top: { bottom: '110%', left: '50%', transform: 'translateX(-50%)', mb: '6px' },
        bottom: { top: '110%', left: '50%', transform: 'translateX(-50%)', mt: '6px' },
        left: { right: '110%', top: '50%', transform: 'translateY(-50%)' },
        right: { left: '110%', top: '50%', transform: 'translateY(-50%)' },
    };
    return (
        <div className="relative inline-flex"
            onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {children}
            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.88 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-medium pointer-events-none"
                        style={{ ...posMap[side], background: 'rgba(14,14,26,0.95)', border: '1px solid rgba(124,58,237,0.25)', color: '#f0eeff' }}
                    >
                        {label}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
