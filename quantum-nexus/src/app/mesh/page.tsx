import Header from '@/components/Header';
import MeshVisualization from '@/components/MeshVisualization';
import Footer from '@/components/Footer';

export default function MeshPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-24">
        <MeshVisualization />
      </div>
      <Footer />
    </main>
  );
} 