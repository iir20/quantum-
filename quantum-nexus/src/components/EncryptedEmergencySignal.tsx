'use client';

import { useState, useEffect } from 'react';

export default function EncryptedEmergencySignal() {
  const [isSending, setIsSending] = useState(false);
  const [pulseRadius, setPulseRadius] = useState(0);
  const [pulseOpacity, setPulseOpacity] = useState(0);

  // Trigger pulse animation
  useEffect(() => {
    let animationFrameId: number;

    if (isSending) {
      setPulseRadius(20);
      setPulseOpacity(0.8);

      const animatePulse = () => {
        setPulseRadius((prev) => {
          if (prev > 200) {
            setIsSending(false);
            setPulseOpacity(0);
            return 0;
          }
          return prev + 4;
        });

        setPulseOpacity((prev) => Math.max(0, prev - 0.02));

        animationFrameId = requestAnimationFrame(animatePulse);
      };

      animationFrameId = requestAnimationFrame(animatePulse);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isSending]);

  const handleSendSOS = () => {
    if (isSending) return;

    // TODO: Implement quantum-encrypted burst signal sending logic here

    setIsSending(true);
  };

  return (
    <div className="relative flex justify-center items-center">
      <button
        onClick={handleSendSOS}
        disabled={isSending}
        className={`relative w-20 h-20 rounded-full bg-red-600 text-white font-bold text-xl shadow-lg transition-transform ${
          isSending ? 'scale-110' : 'hover:scale-105'
        } focus:outline-none focus:ring-4 focus:ring-red-400`}
        title="Send Quantum-Encrypted Emergency Signal"
      >
        SOS
      </button>

      {/* Pulse shockwave */}
      {isSending && (
        <span
          className="absolute rounded-full border-4 border-red-600"
          style={{
            width: pulseRadius * 2,
            height: pulseRadius * 2,
            opacity: pulseOpacity,
            top: `calc(50% - ${pulseRadius}px)`,
            left: `calc(50% - ${pulseRadius}px)`,
            pointerEvents: 'none',
            boxShadow: '0 0 20px 10px rgba(255, 0, 0, 0.7)',
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </div>
  );
}
