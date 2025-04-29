import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SecurityPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-24 px-6 max-w-7xl mx-auto w-full">
        <section className="py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 quantum-text">Quantum-Safe Security</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="quantum-border p-6 rounded-lg backdrop-blur-sm bg-background/20">
              <h2 className="text-2xl font-bold mb-4">Self-Sovereign Encryption</h2>
              <p className="text-foreground/80 mb-6">
                Quantum Nexus uses threshold cryptography, ensuring only trusted P2P nodes can decrypt your data.
                Your encryption keys never leave your control, making traditional attacks impossible.
              </p>
              <div className="h-40 bg-primary/10 rounded quantum-border flex items-center justify-center">
                <p className="text-sm opacity-70">Encryption Visualization</p>
              </div>
            </div>
            
            <div className="quantum-border p-6 rounded-lg backdrop-blur-sm bg-background/20">
              <h2 className="text-2xl font-bold mb-4">Quantum-Resistant Lattice</h2>
              <p className="text-foreground/80 mb-6">
                Our lattice-based algorithms are resistant to quantum computing attacks, future-proofing your 
                communications against tomorrow's threats. All P2P communications use quantum-resistant protocols.
              </p>
              <div className="h-40 bg-primary/10 rounded quantum-border flex items-center justify-center">
                <p className="text-sm opacity-70">Lattice Visualization</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 quantum-border p-6 rounded-lg backdrop-blur-sm bg-background/20">
            <h2 className="text-2xl font-bold mb-4">Zero-Knowledge Proofs</h2>
            <p className="text-foreground/80 mb-6">
              Continuous zero-knowledge proof rotations ensure that only relevant data is ever shared.
              Verify identity and transactions without revealing any sensitive information.
            </p>
            <div className="h-40 bg-primary/10 rounded quantum-border flex items-center justify-center">
              <p className="text-sm opacity-70">zkSNARK Visualization</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
} 