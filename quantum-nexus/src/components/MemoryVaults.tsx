'use client';

import { useState, useEffect } from 'react';

interface LivingMessage {
  id: string;
  content: string;
  unlockCondition?: 'time' | 'presence' | 'emotion' | 'proximity';
  unlockValue?: any;
  decayRate?: number; // 0 to 1, how fast it decays
  morphing?: boolean;
  visible: boolean;
}

export default function MemoryVaults() {
  const [messages, setMessages] = useState<LivingMessage[]>([
    {
      id: 'msg1',
      content: 'This message will unlock at a specific time.',
      unlockCondition: 'time',
      unlockValue: new Date(Date.now() + 60000), // unlock in 1 min
      visible: false,
    },
    {
      id: 'msg2',
      content: 'This message morphs visually over time.',
      morphing: true,
      visible: true,
    },
    {
      id: 'msg3',
      content: 'This message decays and will disappear.',
      decayRate: 0.01,
      visible: true,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => {
          let visible = msg.visible;

          // Unlock by time
          if (msg.unlockCondition === 'time' && msg.unlockValue instanceof Date) {
            if (new Date() >= msg.unlockValue) {
              visible = true;
            }
          }

          // Decay message visibility
          if (msg.decayRate && visible) {
            // For simplicity, hide message after decayRate * 1000 intervals
            // This is a placeholder for actual decay logic
            visible = Math.random() > msg.decayRate;
          }

          return {
            ...msg,
            visible,
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-background/20 quantum-border rounded-lg max-w-3xl mx-auto space-y-4">
      <h3 className="text-2xl font-bold text-white mb-4">Memory Vaults & Living Messages</h3>
      {messages.map((msg) =>
        msg.visible ? (
          <div
            key={msg.id}
            className={`p-4 rounded-lg ${
              msg.morphing ? 'bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 animate-gradient-x' : 'bg-background/40'
            } quantum-border text-white`}
          >
            {msg.content}
          </div>
        ) : null
      )}
    </div>
  );
}
