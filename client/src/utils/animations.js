export const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};
export const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
};
export const slideInLeftVariant = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};
export const slideInRightVariant = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};
export const scaleUpVariant = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } }
};
export const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};
export const fastStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } }
};
export const cardHoverVariant = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.025, y: -7, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }
};
export const modalVariant = {
    hidden: { opacity: 0, scale: 0.88, y: 24 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.94, y: 12, transition: { duration: 0.22 } }
};
export const backdropVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25 } }
};
export const pageVariant = {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -18, transition: { duration: 0.28 } }
};
export const sidebarVariant = {
    open: { x: 0, transition: { type: 'spring', damping: 26, stiffness: 210 } },
    closed: { x: '-100%', transition: { duration: 0.3, ease: 'easeIn' } }
};
export const commandVariant = {
    hidden: { opacity: 0, y: -22, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 26, stiffness: 320 } },
    exit: { opacity: 0, y: -12, scale: 0.97, transition: { duration: 0.2 } }
};
export const floatVariant = (delay = 0) => ({
    animate: {
        y: [0, -18, 0],
        transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay }
    }
});
