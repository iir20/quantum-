'use client';

import { useState } from 'react';

type LocationMode = 'ghost' | 'fuzzy' | 'beacon';

export default function MimblewimbleLocationSharing() {
  const [mode, setMode] = useState<LocationMode>('ghost');

  return (
    <div className="p-4 bg-background/20 quantum-border rounded-lg max-w-md mx-auto text-center">
      <h3 className="text-xl font-bold mb-4 text-white">Location Sharing Mode</h3>
      <div className="flex justify-center gap-4">
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            mode === 'ghost' ? 'bg-purple-700 text-white' : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => setMode('ghost')}
          title="Ghost Mode: Completely hidden"
        >
          Ghost Mode
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            mode === 'fuzzy' ? 'bg-purple-700 text-white' : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => setMode('fuzzy')}
          title="Fuzzy Zone: Approximate location"
        >
          Fuzzy Zone
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            mode === 'beacon' ? 'bg-purple-700 text-white' : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => setMode('beacon')}
          title="Beacon Mode: For emergency use only"
        >
          Beacon Mode
        </button>
      </div>
      <p className="mt-4 text-foreground/80">
        Current mode: <span className="font-semibold">{mode}</span>
      </p>
    </div>
  );
}
