import Header from '@/components/Header';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function FeaturesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-24">
        <Features />
      </div>
      <Footer />
    </main>
  );
} 