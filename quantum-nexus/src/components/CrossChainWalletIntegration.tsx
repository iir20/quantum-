'use client';

import { useState } from 'react';

export default function CrossChainWalletIntegration() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [selectedChain, setSelectedChain] = useState('Ethereum');

  const chains = ['Ethereum', 'Polygon', 'Binance Smart Chain', 'Solana', 'Avalanche'];

  const connectWallet = () => {
    // Placeholder for wallet connection logic
    setConnected(true);
    setWalletAddress('0x1234...abcd');
  };

  const disconnectWallet = () => {
    setConnected(false);
    setWalletAddress(null);
  };

  return (
    <div className="p-6 bg-background/20 quantum-border rounded-lg max-w-md mx-auto text-center">
      <h3 className="text-xl font-bold mb-4 text-white">Cross-Chain Wallet Integration</h3>
      {connected ? (
        <>
          <p className="mb-4 text-foreground/80">Connected Wallet: {walletAddress}</p>
          <div className="mb-4">
            <label htmlFor="chain-select" className="block mb-2 text-white font-semibold">
              Select Chain
            </label>
            <select
              id="chain-select"
              value={selectedChain}
              onChange={(e) => setSelectedChain(e.target.value)}
              className="w-full p-2 rounded-lg bg-background/30 text-white"
            >
              {chains.map((chain) => (
                <option key={chain} value={chain}>
                  {chain}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={disconnectWallet}
            className="px-6 py-3 bg-red-600 rounded-lg text-white font-bold hover:bg-red-700 transition"
          >
            Disconnect Wallet
          </button>
        </>
      ) : (
        <button
          onClick={connectWallet}
          className="px-6 py-3 bg-primary rounded-lg text-white font-bold hover:opacity-90 transition"
        >
          Connect Wallet
        </button>
      )}

      <div className="mt-6 text-foreground/80 text-sm">
        <p>Send token gifts, NFTs, smart contract interactions, and proof-of-chat badges.</p>
        <p>Multi-chain asset support coming soon.</p>
      </div>
    </div>
  );
}
