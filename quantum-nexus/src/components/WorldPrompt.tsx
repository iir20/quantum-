'use client';

import { useState } from 'react';

export default function WorldPrompt() {
  const [activePrompt, setActivePrompt] = useState(0);
  
  const prompts = [
    {
      question: "How does trust evolve in a society where every interaction happens in a P2P mesh, where each individual holds their identity securely and autonomously?",
      image: "trust.jpg"
    },
    {
      question: "What happens when memories, avatars, and conversations live within your control, transferred only between trusted peers?",
      image: "memory.jpg"
    },
    {
      question: "How does human interaction change when messages become physical objects, evolving in space and time without intermediaries?",
      image: "spatial.jpg"
    }
  ];
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary/10 to-black z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center quantum-text">World Prompt for P2P Society</h2>
        <p className="text-xl text-center mb-16 max-w-3xl mx-auto">
          The world of Quantum Nexus 3.5 is one where communication is not bound by any centralized authority.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Prompt Cards */}
          <div className="order-2 md:order-1">
            <div className="space-y-6">
              {prompts.map((prompt, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-lg transition-all cursor-pointer quantum-border backdrop-blur-sm
                    ${activePrompt === index ? 'bg-primary/20' : 'bg-background/20 hover:bg-background/30'}`}
                  onClick={() => setActivePrompt(index)}
                >
                  <p className="text-lg">{prompt.question}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <p className="text-foreground/80 mb-6">
                Design a new society, a new economy, and a new form of trust where quantum-safe, 
                self-sovereign, peer-to-peer communication becomes the backbone of civilization.
              </p>
              
              <button className="px-8 py-4 bg-primary rounded-full text-white hover:opacity-90 transition-all">
                Explore P2P Society
              </button>
            </div>
          </div>
          
          {/* Visual Representation */}
          <div className="order-1 md:order-2 quantum-border rounded-lg overflow-hidden h-[400px] relative">
            {/* This would be a real image in production */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-secondary/30 to-accent/50 animate-pulse-slow">
              <div className="w-full h-full flex items-center justify-center p-6 text-center">
                <p className="text-2xl font-bold">
                  {prompts[activePrompt].question}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 