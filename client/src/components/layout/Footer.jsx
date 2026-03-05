import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Github, Twitter, Linkedin, Zap } from 'lucide-react';

const links = {
    Product: ['Features', 'Pricing', 'Demo', 'Changelog'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Cookies'],
};

export default function Footer() {
    return (
        <footer className="relative mt-24 border-t" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-2)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
                    {/* Brand */}
                    <div className="col-span-2">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-accent)' }}>
                                <Film className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-display font-bold text-lg gradient-text">ClipCrafters</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
                            AI-powered video creation for the next generation of content creators.
                        </p>
                        <div className="flex gap-3">
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <motion.a key={i} href="#" whileHover={{ scale: 1.12, y: -2 }}
                                    className="w-9 h-9 rounded-xl flex items-center justify-center glow-border transition-colors hover:border-purple-400/50"
                                    style={{ color: 'var(--color-text-muted)' }}>
                                    <Icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(links).map(([cat, items]) => (
                        <div key={cat}>
                            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>{cat}</p>
                            <ul className="space-y-2.5">
                                {items.map(item => (
                                    <li key={item}>
                                        <a href="#" className="text-sm transition-colors hover:text-purple-400"
                                            style={{ color: 'var(--color-text-muted)' }}>{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'var(--color-border)' }}>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        © {new Date().getFullYear()} ClipCrafters. Made with <Zap className="w-3 h-3 inline text-purple-400" /> AI.
                    </p>
                    <p className="text-xs gradient-text font-semibold">The future of video editing is here.</p>
                </div>
            </div>
        </footer>
    );
}
