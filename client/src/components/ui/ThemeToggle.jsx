import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center glow-border overflow-hidden"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait">
                {isDark ? (
                    <motion.span key="moon"
                        initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}
                    >
                        <Moon className="w-4 h-4 text-purple-300" />
                    </motion.span>
                ) : (
                    <motion.span key="sun"
                        initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }}
                    >
                        <Sun className="w-4 h-4 text-amber-400" />
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
