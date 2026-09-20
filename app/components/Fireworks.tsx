'use client';
import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number };
export default function Fireworks({ run, reduced = false }: { run: number; reduced?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!run || reduced || !ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = 0, h = 0, raf = 0, previous = 0, elapsed = 0, nextBurst = 0;
    let particles: Particle[] = [];
    const resize = () => { const r = canvas.getBoundingClientRect(); w = r.width; h = r.height; const dpr = Math.min(window.devicePixelRatio || 1, 1.5); canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    const observer = new ResizeObserver(resize); observer.observe(canvas);
    const colors = ['#e9c690', '#edb6c7', '#ffeed8'];
    const burst = () => {
      const x = w * (.15 + Math.random() * .7), y = h * (.12 + Math.random() * .4);
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < (w < 600 ? 48 : 85); i++) {
        const angle = Math.PI * 2 * Math.random(), speed = 55 + Math.random() * 120;
        particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, color, size: 1 + Math.random() });
      }
    };
    const draw = (time: number) => {
      const dt = previous ? Math.min((time - previous) / 1000, .035) : .016; previous = time;
      if (!document.hidden) {
        elapsed += dt;
        ctx.clearRect(0, 0, w, h);
        if (elapsed >= nextBurst && elapsed < 9) { burst(); nextBurst = elapsed + .8; }
        particles = particles.filter(p => p.life > 0);
        for (const p of particles) {
          const px = p.x, py = p.y; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 35 * dt; p.vx *= .99; p.life -= dt * .42;
          ctx.globalAlpha = Math.max(0, p.life); ctx.strokeStyle = p.color; ctx.lineWidth = p.size;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(p.x, p.y); ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
      if (elapsed < 12) raf = requestAnimationFrame(draw); else ctx.clearRect(0, 0, w, h);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); ctx.clearRect(0, 0, w, h); };
  }, [run, reduced]);
  return <canvas ref={ref} className="fireworks" aria-hidden="true"/>;
}
