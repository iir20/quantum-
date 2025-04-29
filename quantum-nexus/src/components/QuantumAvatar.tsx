'use client';

import { useState } from 'react';

interface AvatarProps {
  userId: string;
  mood: 'happy' | 'neutral' | 'sad' | 'angry';
  trustLevel: number; // 0 to 1
  socialInteraction: number; // 0 to 1
  onOpenPortal: (userId: string) => void;
}

const moodColors = {
  happy: '#6ee7b7',
  neutral: '#a5b4fc',
  sad: '#f87171',
  angry: '#ef4444',
};

export default function QuantumAvatar({
  userId,
  mood,
  trustLevel,
  socialInteraction,
  onOpenPortal,
}: AvatarProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Size and glow intensity based on trust and social interaction
  const size = 60 + trustLevel * 40;
  const glowIntensity = 0.5 + socialInteraction * 1.5;

  return (
    <>
      <div
        className="relative rounded-full cursor-pointer transition-transform duration-300"
        style={{
          width: size,
          height: size,
          boxShadow: `0 0 ${glowIntensity * 20}px ${glowIntensity * 10}px ${moodColors[mood]}`,
          backgroundColor: moodColors[mood],
          filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
        }}
        onClick={() => onOpenPortal(userId)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={`User ${userId} - Mood: ${mood}`}
      >
        {/* Animated avatar circle */}
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            boxShadow: `0 0 15px 5px ${moodColors[mood]}`,
            opacity: 0.6,
          }}
        ></div>

        {/* User initials or icon */}
        <div className="flex items-center justify-center h-full text-white font-bold text-xl select-none">
          {userId.slice(0, 2).toUpperCase()}
        </div>

        {/* Emotional state rings */}
        <svg
          className="absolute inset-0"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size / 2) * 0.8}
            stroke={moodColors[mood]}
            strokeWidth={2}
            strokeDasharray={`${trustLevel * 100} ${100 - trustLevel * 100}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.3s ease' }}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size / 2) * 0.6}
            stroke={moodColors[mood]}
            strokeWidth={2}
            strokeDasharray={`${socialInteraction * 100} ${100 - socialInteraction * 100}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.3s ease' }}
          />
        </svg>
      </div>
    </>
  );
}
