import Header from '@/components/Header';
import Chat from '@/components/Chat';
import Footer from '@/components/Footer';

export default function ChatPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-24">
        <Chat />
      </div>
      <Footer />
    </main>
  );
} 