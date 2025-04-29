'use client';

import { useState, useEffect } from 'react';

interface Thread {
  id: string;
  label: string;
  spinSpeed: number;
  radius: number;
  angle: number;
  isMuted: boolean;
  isArchived: boolean;
}

export default function QuantumThreads() {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    // Initialize threads
    const initialThreads: Thread[] = [];
    for (let i = 0; i < 10; i++) {
      initialThreads.push({
        id: `thread-${i}`,
        label: `Thread ${i + 1}`,
        spinSpeed: 0.01 + Math.random() * 0.02,
        radius: 100 + i * 20,
        angle: Math.random() * 2 * Math.PI,
        isMuted: false,
        isArchived: false,
      });
    }
    setThreads(initialThreads);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setThreads((prevThreads) =>
        prevThreads.map((thread) => ({
          ...thread,
          angle: (thread.angle + thread.spinSpeed) % (2 * Math.PI),
        }))
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMute = (id: string) => {
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === id ? { ...thread, isMuted: !thread.isMuted } : thread
      )
    );
  };

  const handleArchive = (id: string) => {
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === id ? { ...thread, isArchived: !thread.isArchived } : thread
      )
    );
  };

  return (
    <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden quantum-border">
      <div className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-purple-700 to-blue-500 shadow-lg flex items-center justify-center text-white font-bold text-lg quantum-glow">
        Core Node
      </div>

      {threads.map((thread) => {
        if (thread.isArchived) return null;

        const x = 200 + thread.radius * Math.cos(thread.angle);
        const y = 200 + thread.radius * Math.sin(thread.angle);

        return (
          <div
            key={thread.id}
            className={`absolute rounded-full flex items-center justify-center cursor-pointer select-none transition-all duration-300 ${
              thread.isMuted ? 'opacity-50' : 'opacity-100'
            }`}
            style={{
              width: 60,
              height: 60,
              top: y,
              left: x,
              background:
                'radial-gradient(circle at center, #6c2bd9, #1e1b4b)',
              boxShadow: '0 0 10px 2px #6c2bd9',
              color: 'white',
              fontWeight: 'bold',
              userSelect: 'none',
            }}
            title={`${thread.label} ${thread.isMuted ? '(Muted)' : ''}`}
            onClick={() => handleMute(thread.id)}
            onContextMenu={(e) => {
              e.preventDefault();
              handleArchive(thread.id);
            }}
          >
            {thread.label}
          </div>
        );
      })}
    </div>
  );
}
