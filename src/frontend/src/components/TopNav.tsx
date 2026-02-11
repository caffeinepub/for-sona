import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export function TopNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Heart className="w-5 h-5 fill-current" />
            <span className="font-serif text-lg hidden sm:inline">For Sona</span>
          </button>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => scrollToSection('quiz')}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Quiz
            </button>
            <button
              onClick={() => scrollToSection('closing')}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Closing
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
