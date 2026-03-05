import { useEffect, useRef } from 'react';

export default function ParticleField({ count = 90 }) {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: -999, y: -999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let raf;
        const particles = [];
        const isMobile = window.innerWidth < 768;
        const N = isMobile ? 45 : count;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();

        for (let i = 0; i < N; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                r: Math.random() * 1.8 + 0.5,
                opacity: Math.random() * 0.5 + 0.15,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < N; i++) {
                const p = particles[i];
                // Repel from mouse
                const dx = p.x - mouse.current.x;
                const dy = p.y - mouse.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    p.vx += dx / dist * 0.3;
                    p.vy += dy / dist * 0.3;
                }
                p.vx *= 0.98;
                p.vy *= 0.98;
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(124,58,237,${p.opacity})`;
                ctx.fill();

                // Connect nearby
                for (let j = i + 1; j < N; j++) {
                    const q = particles[j];
                    const len = Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);
                    if (len < 140) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = `rgba(124,58,237,${0.25 * (1 - len / 140)})`;
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }
            }
            raf = requestAnimationFrame(draw);
        };

        draw();
        window.addEventListener('resize', resize);
        const trackMouse = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
        window.addEventListener('mousemove', trackMouse);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', trackMouse);
        };
    }, [count]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.7 }}
        />
    );
}
