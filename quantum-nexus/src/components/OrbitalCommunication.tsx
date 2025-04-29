'use client';

import { useState, useEffect, useRef } from 'react';

interface OrbitalNode {
  id: string;
  label: string;
  category: 'private' | 'group' | 'emergency' | 'vault';
  trustLevel: number; // 0 to 1
  communicationFrequency: number; // 0 to 1
  urgency: number; // 0 to 1
  angle: number; // current angle in orbit
  orbitRadius: number; // distance from center
  x: number;
  y: number;
  isSelected: boolean;
}

const categories = ['private', 'group', 'emergency', 'vault'] as const;

export default function OrbitalCommunication() {
  const [nodes, setNodes] = useState<OrbitalNode[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize nodes with random data
  useEffect(() => {
    const initialNodes: OrbitalNode[] = [];
    const centerX = 0;
    const centerY = 0;

    for (let i = 0; i < 20; i++) {
      const category = categories[i % categories.length];
      const trustLevel = Math.random();
      const communicationFrequency = Math.random();
      const urgency = Math.random();

      // Orbit radius based on category and trust/urgency
      let baseOrbit = 100;
      switch (category) {
        case 'private':
          baseOrbit = 120;
          break;
        case 'group':
          baseOrbit = 160;
          break;
        case 'emergency':
          baseOrbit = 80;
          break;
        case 'vault':
          baseOrbit = 200;
          break;
      }

      const orbitRadius = baseOrbit + (1 - trustLevel) * 50 - urgency * 30;
      const angle = (i / 20) * 2 * Math.PI;

      const x = centerX + orbitRadius * Math.cos(angle);
      const y = centerY + orbitRadius * Math.sin(angle);

      initialNodes.push({
        id: `node-${i}`,
        label: `${category} ${i + 1}`,
        category,
        trustLevel,
        communicationFrequency,
        urgency,
        angle,
        orbitRadius,
        x,
        y,
        isSelected: false,
      });
    }

    setNodes(initialNodes);
  }, []);

  // Animate orbiting nodes
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          // Orbit speed based on communication frequency and urgency
          const speed = 0.002 + node.communicationFrequency * 0.005 + node.urgency * 0.01;
          const newAngle = node.angle + speed;

          const x = node.orbitRadius * Math.cos(newAngle);
          const y = node.orbitRadius * Math.sin(newAngle);

          return {
            ...node,
            angle: newAngle,
            x,
            y,
          };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Handle node click to select/deselect
  const handleNodeClick = (id: string) => {
    setSelectedNodeId((prev) => (prev === id ? null : id));
    setNodes((prevNodes) =>
      prevNodes.map((node) => ({
        ...node,
        isSelected: node.id === id,
      }))
    );
  };

  // Handle drag to pull or push nodes (simplified for demo)
  const dragState = useRef<{ draggingId: string | null; startX: number; startY: number }>({
    draggingId: null,
    startX: 0,
    startY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    dragState.current = {
      draggingId: id,
      startX: e.clientX,
      startY: e.clientY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.draggingId) return;

    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    const distanceChange = Math.sqrt(dx * dx + dy * dy) * 0.5; // scale factor

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === dragState.current.draggingId) {
          // Pull closer or push back based on drag direction (dy)
          const newOrbitRadius = Math.max(50, node.orbitRadius - dy * 0.5);
          return {
            ...node,
            orbitRadius: newOrbitRadius,
          };
        }
        return node;
      })
    );

    dragState.current.startX = e.clientX;
    dragState.current.startY = e.clientY;
  };

  const handleMouseUp = () => {
    dragState.current.draggingId = null;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] bg-black rounded-lg overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Central Core Node */}
      <div className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-purple-700 to-blue-500 shadow-lg flex items-center justify-center text-white font-bold text-lg quantum-glow">
        Core Node
      </div>

      {/* Orbiting Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          onClick={() => handleNodeClick(node.id)}
          onMouseDown={(e) => handleMouseDown(e, node.id)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(calc(${node.x}px - 50%), calc(${node.y}px - 50%))`,
            width: node.isSelected ? 80 : 50,
            height: node.isSelected ? 80 : 50,
            borderRadius: '50%',
            backgroundColor:
              node.category === 'private'
                ? 'rgba(108, 43, 217, 0.8)'
                : node.category === 'group'
                ? 'rgba(0, 200, 255, 0.8)'
                : node.category === 'emergency'
                ? 'rgba(255, 69, 58, 0.8)'
                : 'rgba(255, 215, 0, 0.8)',
            boxShadow: node.isSelected ? '0 0 15px 5px rgba(255, 255, 255, 0.7)' : 'none',
            cursor: 'pointer',
            transition: 'width 0.3s, height 0.3s, box-shadow 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
          title={`${node.label} (${node.category})`}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}
