import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/sections/HeroSection';
import { QuizSection } from './components/sections/QuizSection';
import { ClosingSection } from './components/sections/ClosingSection';
import { PublicLatestMessageSection } from './components/sections/PublicLatestMessageSection';
import { FallingHeart } from './components/FallingHeart';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <TopNav />
        <main>
          <HeroSection />
          <QuizSection />
          <ClosingSection />
          <PublicLatestMessageSection />
        </main>
        <Toaster />
        <FallingHeart />
      </div>
    </QueryClientProvider>
  );
}

export default App;
