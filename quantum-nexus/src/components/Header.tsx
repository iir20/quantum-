'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 backdrop-blur-lg bg-black/30">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-bold quantum-text">Quantum Nexus 3.5</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/features" className="hover:quantum-text transition-all">Features</Link>
          <Link href="/mesh" className="hover:quantum-text transition-all">P2P Mesh</Link>
          <Link href="/security" className="hover:quantum-text transition-all">Security</Link>
          <Link href="/world" className="hover:quantum-text transition-all">World</Link>
          <Link href="/chat" className="hover:quantum-text transition-all">Chat</Link>
        </nav>

        {/* Connect Button */}
        <button className="hidden md:block px-6 py-2 rounded-full quantum-border bg-background/20 backdrop-blur-md hover:bg-background/40 transition-all">
          Connect
        </button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black/90 backdrop-blur-lg p-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/features" className="hover:quantum-text transition-all p-2">Features</Link>
            <Link href="/mesh" className="hover:quantum-text transition-all p-2">P2P Mesh</Link>
            <Link href="/security" className="hover:quantum-text transition-all p-2">Security</Link>
            <Link href="/world" className="hover:quantum-text transition-all p-2">World</Link>
            <Link href="/chat" className="hover:quantum-text transition-all p-2">Chat</Link>
            <button className="px-6 py-2 rounded-full quantum-border bg-background/20 backdrop-blur-md hover:bg-background/40 transition-all">
              Connect
            </button>
          </nav>
        </div>
      )}
    </header>
  );
} 