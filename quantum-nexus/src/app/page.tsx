import MeshVisualization from '../components/MeshVisualization';
import OrbitalCommunication from '../components/OrbitalCommunication';
import QuantumAvatar from '../components/QuantumAvatar';
import EncryptedEmergencySignal from '../components/EncryptedEmergencySignal';
import MimblewimbleLocationSharing from '../components/MimblewimbleLocationSharing';
import MemoryVaults from '../components/MemoryVaults';
import FractalNotificationCenter from '../components/FractalNotificationCenter';
import QuantumThreads from '../components/QuantumThreads';
import CrossChainWalletIntegration from '../components/CrossChainWalletIntegration';
import ARProjectionMode from '../components/ARProjectionMode';
import Chat from '../components/Chat';

export default function Home() {
  const handleOpenPortal = (userId: string) => {
    alert(`Open portal for user: ${userId}`);
  };

  return (
    <main className="min-h-screen flex flex-col space-y-12 bg-black text-white p-6">
      <section>
        <h1 className="text-4xl font-bold mb-4 text-center quantum-text">Quantum Nexus 3.5</h1>
        <MeshVisualization />
      </section>

      <section>
        <OrbitalCommunication />
      </section>

      <section className="flex justify-center space-x-8 flex-wrap">
        <QuantumAvatar userId="AB" mood="happy" trustLevel={0.8} socialInteraction={0.7} onOpenPortal={handleOpenPortal} />
        <QuantumAvatar userId="CD" mood="neutral" trustLevel={0.5} socialInteraction={0.4} onOpenPortal={handleOpenPortal} />
        <QuantumAvatar userId="EF" mood="sad" trustLevel={0.3} socialInteraction={0.2} onOpenPortal={handleOpenPortal} />
      </section>

      <section className="max-w-4xl mx-auto space-y-8">
        <EncryptedEmergencySignal />
        <MimblewimbleLocationSharing />
        <MemoryVaults />
        <FractalNotificationCenter />
        <QuantumThreads />
        <CrossChainWalletIntegration />
        <ARProjectionMode />
      </section>

      <section className="max-w-4xl mx-auto">
        <Chat />
      </section>
    </main>
  );
}
