'use client';

import { useEffect, useRef } from 'react';

interface Notification {
  id: string;
  message: string;
  importance: number; // 0 to 1
  frequency: number; // 0 to 1
  relationship: number; // 0 to 1
  angle: number;
  radius: number;
}

export default function FractalNotificationCenter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = canvas.clientWidth * window.devicePixelRatio;
    const height = canvas.height = canvas.clientHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const centerX = width / 2;
    const centerY = height / 2;

    // Generate sample notifications
    const notifications: Notification[] = [];
    const count = 30;

    for (let i = 0; i < count; i++) {
      notifications.push({
        id: `notif-${i}`,
        message: `Notification ${i + 1}`,
        importance: Math.random(),
        frequency: Math.random(),
        relationship: Math.random(),
        angle: (i / count) * 2 * Math.PI,
        radius: 50 + Math.random() * 150,
      });
    }

    // Animation variables
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw fractal branches
      notifications.forEach((notif) => {
        const angle = notif.angle + time * 0.001 * (1 + notif.importance);
        const radius = notif.radius + 10 * Math.sin(time * 0.005 + notif.angle * 10);

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        // Branch length based on importance and frequency
        const branchLength = 20 + notif.importance * 30 + notif.frequency * 20;

        // Draw branch
        ctx.strokeStyle = `rgba(108, 43, 217, ${notif.relationship})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Draw notification circle
        ctx.fillStyle = `rgba(108, 43, 217, ${notif.relationship})`;
        ctx.beginPath();
        ctx.arc(x, y, 6 + notif.importance * 6, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full h-96 bg-black rounded-lg overflow-hidden quantum-border">
      <canvas ref={canvasRef} className="w-full h-full" />
    </section>
  );
}
