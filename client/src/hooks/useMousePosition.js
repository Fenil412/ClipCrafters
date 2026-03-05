import { useState, useEffect, useRef } from 'react';
export const useMousePosition = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const raf = useRef(null);
    const next = useRef({ x: 0, y: 0 });
    useEffect(() => {
        const onMove = (e) => { next.current = { x: e.clientX, y: e.clientY }; };
        const loop = () => {
            setPos({ ...next.current });
            raf.current = requestAnimationFrame(loop);
        };
        window.addEventListener('mousemove', onMove);
        raf.current = requestAnimationFrame(loop);
        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf.current);
        };
    }, []);
    return pos;
};
