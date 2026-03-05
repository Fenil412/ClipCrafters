import { motion } from 'framer-motion';

const blobs = [
    { color: 'rgba(124,58,237,0.5)', w: 600, h: 600, top: '-10%', left: '-10%', dur: 12 },
    { color: 'rgba(6,182,212,0.35)', w: 500, h: 500, top: '40%', right: '-15%', dur: 16 },
    { color: 'rgba(168,85,247,0.3)', w: 400, h: 400, bottom: '-10%', left: '20%', dur: 10 },
];

export default function GradientBlob() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            {blobs.map((b, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: b.w,
                        height: b.h,
                        borderRadius: '50%',
                        background: b.color,
                        filter: 'blur(80px)',
                        top: b.top,
                        left: b.left,
                        right: b.right,
                        bottom: b.bottom,
                    }}
                    animate={{
                        scale: [1, 1.15, 0.92, 1.08, 1],
                        x: [0, 30, -20, 15, 0],
                        y: [0, -20, 25, -10, 0],
                    }}
                    transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
        </div>
    );
}
