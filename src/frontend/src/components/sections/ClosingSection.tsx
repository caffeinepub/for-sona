import { dedicationContent } from '../../content/dedicationContent';
import { DedicationLayout } from '../DedicationLayout';
import { Heart } from 'lucide-react';

export function ClosingSection() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'unknown-app';

  return (
    <section id="closing" className="py-20 sm:py-32">
      <DedicationLayout>
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Decorative ornament */}
          <div className="flex justify-center mb-8">
            <img
              src="/assets/generated/ornament-set.dim_512x512.png"
              alt=""
              className="w-24 h-24 opacity-80"
            />
          </div>

          <p className="font-serif text-2xl sm:text-3xl text-foreground/90 leading-relaxed">
            {dedicationContent.closing.message}
          </p>

          <p className="text-xl text-foreground/70 italic">
            {dedicationContent.closing.signature}
          </p>

          <div className="pt-12 mt-12 border-t border-border/50">
            <Heart className="w-8 h-8 text-primary fill-current mx-auto mb-4" />
          </div>
        </div>
      </DedicationLayout>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} · Built with <Heart className="inline w-4 h-4 text-primary fill-current" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </section>
  );
}
