'use client';

import { useState } from 'react';

type Feature = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    id: 1,
    icon: '💱',
    title: 'Quantum-Safe P2P Economy',
    description: 'zkSNARK-powered $MASH tokens for secure and instant P2P microtransactions, with plasma sharded blockchain for instant, low-latency payments.'
  },
  {
    id: 2,
    icon: '👥',
    title: 'Neural Shadow Cloning',
    description: 'Your neural twin, stored as a P2P NFT, evolves over time with each interaction, learning and adapting to your style with holographic mirroring.'
  },
  {
    id: 3,
    icon: '💬',
    title: 'Self-Sovereign Messaging',
    description: 'Decentralized P2P channels powered by Web3.js, IPFS-Cluster, and Filecoin FVM with Holographic AR and Quantum Tunneling RTC.'
  },
  {
    id: 4,
    icon: '⚖️',
    title: 'Sentient Reputation System',
    description: 'Build a peer-rated reputation, soulbound to you (via ERC-4973) with federated AI models continuously updating your standing within the mesh.'
  },
  {
    id: 5,
    icon: '🧠',
    title: 'Neuroadaptive Interface',
    description: 'Communicate not just through words, but emotional resonance with biometric feedback directly influencing your P2P interactions.'
  },
  {
    id: 6,
    icon: '🔮',
    title: 'Cerebral Memory Fabric',
    description: 'Using IPFS + IPLD combined with homomorphic encryption, store memories and conversations across a P2P mesh with self-healing Merkle DAGs.'
  },
  {
    id: 7,
    icon: '👁️',
    title: 'Holo-UI Framework',
    description: 'WebXR-powered holographic avatars communicate in real-time over decentralized P2P networks with no servers required.'
  },
  {
    id: 8,
    icon: '⏱️',
    title: 'Temporal Smart Contracts',
    description: 'Deploy holomorphic, self-modifying contracts that execute over the P2P mesh with real-time decentralized validation.'
  },
  {
    id: 9,
    icon: '🆘',
    title: 'Emergency Neural Pulse',
    description: 'Send emergency P2P pulses to trusted peers through WebBluetooth-enabled wearables with private, decentralized identity graph.'
  },
  {
    id: 10,
    icon: '🔄',
    title: 'Cross-Chain Interactions',
    description: 'Build true interoperable connections across different blockchain ecosystems, powered by SocketDL with seamless cross-chain communication.'
  },
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center quantum-text">Core P2P-Driven Features</h2>
        <p className="text-xl text-center mb-16 max-w-3xl mx-auto">
          Unlike traditional systems that rely on centralized nodes, Quantum Nexus uses true decentralized P2P mesh networks, 
          ensuring that you own and control your identity, your data, and every aspect of your digital interaction.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className={`quantum-border rounded-lg p-6 cursor-pointer transition-all duration-300 backdrop-blur-sm
                ${activeFeature === feature.id ? 'bg-primary/20' : 'bg-background/20 hover:bg-background/30'}`}
              onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-foreground/80">{feature.description}</p>
              
              <div className={`mt-4 overflow-hidden transition-all duration-300 ${activeFeature === feature.id ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pt-4 border-t border-primary/30 mt-2">
                  <p className="text-sm text-foreground/70">
                    This quantum-safe P2P mesh runs on dynamic encryption, distributed memory fabrics, 
                    and self-healing protocols, making communication instantaneous, secure, and deeply personal.
                  </p>
                  <button className="mt-4 text-sm text-primary hover:underline">Learn more about {feature.title}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 