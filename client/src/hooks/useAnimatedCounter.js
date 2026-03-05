import { useState, useEffect, useRef } from 'react';
export const useAnimatedCounter = (target, duration = 2000, start = false) => {
    const [count, setCount] = useState(0);
    const raf = useRef(null);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (ts) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) raf.current = requestAnimationFrame(step);
        };
        raf.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf.current);
    }, [target, duration, start]);
    return count;
};
