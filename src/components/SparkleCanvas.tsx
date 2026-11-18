import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  alphaSpeed: number;
  hue: 'gold' | 'rose' | 'ivory';
}

export function SparkleCanvas({ intensified = false }: { intensified?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intensifiedRef = useRef(intensified);

  useEffect(() => {
    intensifiedRef.current = intensified;
  }, [intensified]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const count = prefersReducedMotion ? 24 : 58;
    const hues: Array<Particle['hue']> = ['gold', 'rose', 'ivory'];
    const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -0.12 - Math.random() * 0.35,
      radius: 0.9 + Math.random() * 2.2,
      alpha: 0.15 + Math.random() * 0.55,
      alphaSpeed: (Math.random() > 0.5 ? 1 : -1) * (0.004 + Math.random() * 0.008),
      hue: hues[i % hues.length],
    }));

    const colorMap: Record<Particle['hue'], string> = {
      gold: '245, 208, 138',
      rose: '251, 113, 133',
      ivory: '250, 245, 240',
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      const boost = intensifiedRef.current ? 1.55 : 1;

      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.vx * boost;
          p.y += p.vy * boost;
          p.alpha += p.alphaSpeed;

          if (p.alpha >= 0.85 || p.alpha <= 0.1) {
            p.alphaSpeed *= -1;
          }
          if (p.y < -12) {
            p.y = height + 12;
            p.x = Math.random() * width;
          }
          if (p.x < -12) p.x = width + 12;
          if (p.x > width + 12) p.x = -12;
        }

        const rgb = colorMap[p.hue];
        const glowRadius = p.radius * (intensifiedRef.current ? 4.8 : 3.6);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        grad.addColorStop(0, `rgba(${rgb}, ${Math.min(1, p.alpha * 1.15)})`);
        grad.addColorStop(0.45, `rgba(${rgb}, ${p.alpha * 0.35})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.65, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${Math.min(1, p.alpha * 1.3)})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90"
    />
  );
}
