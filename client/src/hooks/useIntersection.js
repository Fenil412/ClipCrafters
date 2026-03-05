import { useState, useEffect, useRef } from 'react';
export const useIntersection = (options = {}) => {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.15, ...options }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return [ref, inView];
};
