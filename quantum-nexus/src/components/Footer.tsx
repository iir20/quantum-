import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-16 px-6 bg-black/30 backdrop-blur-lg border-t border-primary/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4 quantum-text">Quantum Nexus 3.5</h3>
            <p className="text-foreground/70 mb-6">
              The Sentient Mesh of Peer-to-Peer Communication
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-foreground">
                <svg width="20" height="20" fill="currentColor" className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>
                </svg>
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground">
                <svg width="20" height="20" fill="currentColor" className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.748-1.026 2.748-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.918.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.137 20.164 22 16.42 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground">
                <svg width="20" height="20" fill="currentColor" className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link href="/economy" className="text-foreground/70 hover:text-foreground">Quantum-Safe P2P Economy</Link></li>
              <li><Link href="/shadow" className="text-foreground/70 hover:text-foreground">Neural Shadow Cloning</Link></li>
              <li><Link href="/messaging" className="text-foreground/70 hover:text-foreground">Self-Sovereign Messaging</Link></li>
              <li><Link href="/reputation" className="text-foreground/70 hover:text-foreground">Sentient Reputation System</Link></li>
              <li><Link href="/interface" className="text-foreground/70 hover:text-foreground">Neuroadaptive Interface</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">P2P Framework</h3>
            <ul className="space-y-2">
              <li><Link href="/memory" className="text-foreground/70 hover:text-foreground">Cerebral Memory Fabric</Link></li>
              <li><Link href="/holoui" className="text-foreground/70 hover:text-foreground">Holo-UI Framework</Link></li>
              <li><Link href="/contracts" className="text-foreground/70 hover:text-foreground">Temporal Smart Contracts</Link></li>
              <li><Link href="/emergency" className="text-foreground/70 hover:text-foreground">Emergency Neural Pulse</Link></li>
              <li><Link href="/cross-chain" className="text-foreground/70 hover:text-foreground">Cross-Chain Interactions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">P2P Society</h3>
            <ul className="space-y-2">
              <li><Link href="/society" className="text-foreground/70 hover:text-foreground">World Prompt</Link></li>
              <li><Link href="/trust" className="text-foreground/70 hover:text-foreground">Trust Evolution</Link></li>
              <li><Link href="/autonomy" className="text-foreground/70 hover:text-foreground">Self-Sovereign Identity</Link></li>
              <li><Link href="/spatial" className="text-foreground/70 hover:text-foreground">Spatial Communication</Link></li>
              <li><Link href="/future" className="text-foreground/70 hover:text-foreground">Future of Civilization</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/50 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Quantum Nexus 3.5. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-foreground/50 text-sm hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="text-foreground/50 text-sm hover:text-foreground">Terms</Link>
            <Link href="/contact" className="text-foreground/50 text-sm hover:text-foreground">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 