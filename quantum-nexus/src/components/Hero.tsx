'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;
    
    // Particle system
    const particles: {x: number, y: number, size: number, speed: number, color: string}[] = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 1 + 0.2,
        color: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 155 + 100}, ${Math.random() * 0.5 + 0.2})`
      });
    }
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((particle, i) => {
        // Move particle
        particle.y -= particle.speed;
        
        // Reset if off screen
        if (particle.y < 0) {
          particle.y = height;
          particle.x = Math.random() * width;
        }
        
        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.strokeStyle = `rgba(108, 43, 217, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      
      requestAnimationFrame(drawParticles);
    };
    
    drawParticles();
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 quantum-text">
          Quantum Nexus 3.5
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl leading-relaxed">
          The Sentient Mesh of Peer-to-Peer Communication
        </p>
        
        <div className="quantum-border p-6 rounded-lg bg-background/20 backdrop-blur-md mb-12 max-w-4xl">
          <p className="text-lg md:text-xl leading-relaxed">
            Welcome to Quantum Nexus 3.5: a next-generation, peer-to-peer (P2P), decentralized communication system that transcends traditional networks. 
            Powered by neuromorphic interfaces, quantum-safe cryptography, and holographic consciousness frameworks, this is the future of human interaction — 
            completely autonomous, secure, and self-evolving.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <button className="px-8 py-4 bg-primary rounded-full text-white hover:opacity-90 transition-all">
            Join the Mesh
          </button>
          <button className="px-8 py-4 quantum-border rounded-full hover:bg-background/40 transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
} 