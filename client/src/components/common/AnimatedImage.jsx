import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedImage({ src, alt = '', className = '', aspectRatio = '16/9' }) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio }}>
            {!loaded && !error && <div className="absolute inset-0 skeleton" />}
            {error ? (
                <div className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(6,182,212,0.1))' }}>
                    <span className="text-4xl opacity-30">🎬</span>
                </div>
            ) : (
                <motion.img
                    src={src} alt={alt} loading="lazy"
                    onLoad={() => setLoaded(true)}
                    onError={() => setError(true)}
                    initial={{ opacity: 0, scale: 1.06, filter: 'blur(8px)' }}
                    animate={loaded ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}
        </div>
    );
}
