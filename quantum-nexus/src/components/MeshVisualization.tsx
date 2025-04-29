'use client';

import { useEffect, useRef } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
  connections: Node[];
  pulseRadius: number;
  pulseOpacity: number;
  isPulsing: boolean;
  type: 'peer' | 'data';
  trustLevel: number; // 0 to 1
  communicationFrequency: number; // 0 to 1
  urgency: number; // 0 to 1
  angle: number; // orbital angle
  orbitRadius: number; // distance from center
}

export default function MeshVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const updateDimensions = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Perspective projection parameters
    const focalLength = 300;

    // Create nodes
    const nodes: Node[] = [];
    const dataTransfers: { x: number; y: number; targetX: number; targetY: number; progress: number }[] = [];
    const nodeCount = Math.floor(canvas.width / 80);
    const dataNodeCount = Math.floor(nodeCount * 1.5);

    // Helper to generate random number between min and max
    const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

    // Create peer nodes with orbital parameters
    for (let i = 0; i < nodeCount; i++) {
      const trustLevel = Math.random();
      const communicationFrequency = Math.random();
      const urgency = Math.random();

      // Orbit radius based on trust and urgency (closer if higher trust or urgency)
      const orbitRadius = 100 + (1 - trustLevel) * 150 - urgency * 50;

      // Initial angle
      const angle = Math.random() * Math.PI * 2;

      // Position in 3D space (x, y, z)
      const x = centerX + orbitRadius * Math.cos(angle);
      const y = centerY + orbitRadius * Math.sin(angle);
      const z = randomBetween(-50, 50);

      nodes.push({
        id: `peer-${i}`,
        x,
        y,
        z,
        vx: 0,
        vy: 0,
        vz: 0,
        radius: 6,
        color: '#6c2bd9',
        connections: [],
        pulseRadius: 0,
        pulseOpacity: 0,
        isPulsing: false,
        type: 'peer',
        trustLevel,
        communicationFrequency,
        urgency,
        angle,
        orbitRadius,
      });
    }

    // Create data nodes randomly positioned in 3D space
    for (let i = 0; i < dataNodeCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const z = randomBetween(-50, 50);
      nodes.push({
        id: `data-${i}`,
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
        radius: 3,
        color: '#00c8ff',
        connections: [],
        pulseRadius: 0,
        pulseOpacity: 0,
        isPulsing: false,
        type: 'data',
        trustLevel: 0,
        communicationFrequency: 0,
        urgency: 0,
        angle: 0,
        orbitRadius: 0,
      });
    }

    // Create connections between nodes randomly
    nodes.forEach((node) => {
      nodes.forEach((otherNode) => {
        if (node !== otherNode && Math.random() < 0.1) {
          node.connections.push(otherNode);
        }
      });
    });

    // Start random pulses on peer nodes
    const startRandomPulses = () => {
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      if (randomNode.type === 'peer') {
        randomNode.isPulsing = true;
        randomNode.pulseRadius = randomNode.radius;
        randomNode.pulseOpacity = 0.5;
      }
      setTimeout(startRandomPulses, Math.random() * 1000 + 500);
    };

    setTimeout(startRandomPulses, 1000);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update orbital positions
      nodes.forEach((node) => {
        if (node.type === 'peer') {
          // Orbit rotation speed based on communication frequency and urgency
          const speed = 0.002 + node.communicationFrequency * 0.005 + node.urgency * 0.01;
          node.angle += speed;

          // Update position based on orbit
          node.x = centerX + node.orbitRadius * Math.cos(node.angle);
          node.y = centerY + node.orbitRadius * Math.sin(node.angle);

          // Simple z oscillation for depth effect
          node.z = 30 * Math.sin(node.angle * 2);
        } else {
          // Move data nodes randomly
          node.x += node.vx;
          node.y += node.vy;
          node.z += node.vz;

          // Bounce off walls
          if (node.x < node.radius || node.x > canvas.width - node.radius) node.vx *= -1;
          if (node.y < node.radius || node.y > canvas.height - node.radius) node.vy *= -1;
          if (node.z < -50 || node.z > 50) node.vz *= -1;
        }
      });

      // Sort nodes by z for painter's algorithm (draw farthest first)
      nodes.sort((a, b) => a.z - b.z);

      // Draw connections
      nodes.forEach((node) => {
        node.connections.forEach((conn) => {
          // Project 3D points to 2D
          const project = (x: number, y: number, z: number) => {
            const scale = focalLength / (focalLength + z);
            return {
              x: centerX + (x - centerX) * scale,
              y: centerY + (y - centerY) * scale,
              scale,
            };
          };

          const p1 = project(node.x, node.y, node.z);
          const p2 = project(conn.x, conn.y, conn.z);

          // Draw line with gradient
          const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          gradient.addColorStop(0, node.color);
          gradient.addColorStop(1, conn.color);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = 0.6;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        const project = (x: number, y: number, z: number) => {
          const scale = focalLength / (focalLength + z);
          return {
            x: centerX + (x - centerX) * scale,
            y: centerY + (y - centerY) * scale,
            scale,
          };
        };

        const p = project(node.x, node.y, node.z);

        // Draw pulse
        if (node.isPulsing) {
          ctx.strokeStyle = node.color;
          ctx.globalAlpha = node.pulseOpacity;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, node.pulseRadius * p.scale, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;

          node.pulseRadius += 0.5;
          node.pulseOpacity -= 0.01;

          if (node.pulseOpacity <= 0) {
            node.isPulsing = false;
            node.pulseRadius = node.radius;
            node.pulseOpacity = 0.5;
          }
        }

        // Draw node circle
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, node.radius * p.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Animate data transfers
      dataTransfers.forEach((transfer, index) => {
        transfer.progress += 0.02;

        const x = transfer.x + (transfer.targetX - transfer.x) * transfer.progress;
        const y = transfer.y + (transfer.targetY - transfer.y) * transfer.progress;

        ctx.fillStyle = '#fff';
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (transfer.progress >= 1) {
          dataTransfers.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 quantum-text">P2P Communication Layer</h2>
        <p className="text-xl max-w-3xl mx-auto mb-12">
          Quantum Nexus uses true decentralized P2P mesh networks, dynamically connecting peers with quantum-safe encryption.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-background/20 backdrop-blur-md rounded-lg p-8 quantum-border">
          <div>
            <h3 className="text-2xl font-bold mb-4">Zero-G Interface</h3>
            <p className="text-foreground/80">
              P2P communication isn't bound by geography or traditional networks. Users dynamically orbit in the spatial mesh, 
              shifting based on their social proximity. Gravitational lensing effects allow for subliminal interface control through quantum entanglement.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Security & Privacy</h3>
            <p className="text-foreground/80">
              Complete self-sovereign encryption via threshold cryptography, where only trusted P2P nodes can decrypt data.
              Quantum-resistant lattice algorithms ensure that P2P communications are impervious to quantum hacking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
