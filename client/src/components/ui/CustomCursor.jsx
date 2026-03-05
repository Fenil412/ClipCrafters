import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING = { stiffness: 600, damping: 38 };
const SPRING_SLOW = { stiffness: 150, damping: 22 };

export default function CustomCursor() {
    const mx = useMotionValue(-100);
    const my = useMotionValue(-100);
    const rx = useSpring(mx, SPRING_SLOW);
    const ry = useSpring(my, SPRING_SLOW);
    const dx = useSpring(mx, SPRING);
    const dy = useSpring(my, SPRING);
    const isHover = useRef(false);
    const ringScale = useMotionValue(1);
    const ringScaleS = useSpring(ringScale, { stiffness: 280, damping: 24 });

    useEffect(() => {
        const onMove = (e) => { mx.set(e.clientX); my.set(e.clientY); };
        const onEnter = (e) => {
            const t = e.target;
            if (t.matches('button,a,[role=button],.card')) {
                ringScale.set(1.9);
                isHover.current = true;
            }
        };
        const onLeave = () => { ringScale.set(1); isHover.current = false; };
        const onClick = () => {
            ringScale.set(2.6);
            setTimeout(() => ringScale.set(isHover.current ? 1.9 : 1), 220);
        };

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseover', onEnter);
        document.addEventListener('mouseout', onLeave);
        window.addEventListener('click', onClick);
        return () => {
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onEnter);
            document.removeEventListener('mouseout', onLeave);
            window.removeEventListener('click', onClick);
        };
    }, [mx, my, ringScale]);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
            {/* Outer ring */}
            <motion.div
                style={{ x: rx, y: ry, scale: ringScaleS, translateX: '-50%', translateY: '-50%' }}
                className="absolute w-9 h-9 rounded-full border-2 border-purple-400/70 mix-blend-difference"
            />
            {/* Inner dot */}
            <motion.div
                style={{ x: dx, y: dy, translateX: '-50%', translateY: '-50%' }}
                className="absolute w-2 h-2 rounded-full bg-white"
            />
        </div>
    );
}
