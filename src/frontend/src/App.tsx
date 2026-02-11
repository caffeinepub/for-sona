import { HeroSection } from './components/sections/HeroSection';
import { ClosingSection } from './components/sections/ClosingSection';
import { QuizSection } from './components/sections/QuizSection';
import { TopNav } from './components/TopNav';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main>
        <HeroSection />
        <QuizSection />
        <ClosingSection />
      </main>
    </div>
  );
}

export default App;
