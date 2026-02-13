import { Heart } from 'lucide-react';

export function TopNav() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 text-lg font-serif font-semibold text-foreground hover:text-primary transition-colors"
          >
            <Heart className="w-5 h-5 text-primary fill-primary" />
            For Sona
          </button>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('quiz')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Quiz
            </button>
            <button
              onClick={() => scrollToSection('closing')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Message
            </button>
            <button
              onClick={() => scrollToSection('public-message')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
