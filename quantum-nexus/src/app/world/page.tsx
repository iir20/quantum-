import Header from '@/components/Header';
import WorldPrompt from '@/components/WorldPrompt';
import Footer from '@/components/Footer';

export default function WorldPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-24">
        <WorldPrompt />
        
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <section className="quantum-border p-8 rounded-lg backdrop-blur-sm bg-background/20">
            <h2 className="text-3xl font-bold mb-6">Designing a P2P Society</h2>
            <p className="text-xl mb-8">
              The world of Quantum Nexus 3.5 invites you to imagine a new form of civilization
              built on peer-to-peer communication, with no central authorities or points of control.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Trust Evolution</h3>
                <p className="text-foreground/80">
                  In a P2P mesh society, trust emerges organically through direct interactions
                  between individuals. Reputation becomes a living, evolving asset backed by
                  cryptographic proof and community consensus.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Identity Sovereignty</h3>
                <p className="text-foreground/80">
                  When your identity exists only within your control, transferred between trusted
                  peers, the concept of digital identity becomes inseparable from the self - 
                  secure, authentic, and under your sole custody.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Spatial Communication</h3>
                <p className="text-foreground/80">
                  Messages as physical objects that evolve in space-time create a new language
                  of interaction, where conversations have presence, permanence, and physicality
                  in a shared holographic space.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
} 