import { motion, AnimatePresence } from 'framer-motion';
import { backdropVariant, modalVariant } from '../../utils/animations';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function Modal({ open, onClose, title, children, size = 'md' }) {
    const sizes = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' };

    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    useEffect(() => {
        const h = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [onClose]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        key="backdrop"
                        variants={backdropVariant} initial="hidden" animate="visible" exit="hidden"
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            key="modal"
                            variants={modalVariant} initial="hidden" animate="visible" exit="exit"
                            className={`relative w-full ${sizes[size]} glass-dark rounded-2xl border border-purple-500/20 shadow-glow pointer-events-auto`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {title && (
                                <div className="flex items-center justify-between p-6 border-b border-white/5">
                                    <h2 className="font-display font-bold text-lg">{title}</h2>
                                    <motion.button onClick={onClose} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/8 transition-colors">
                                        <X className="w-4 h-4 text-gray-400" />
                                    </motion.button>
                                </div>
                            )}
                            <div className="p-6">{children}</div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
