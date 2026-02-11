import { dedicationContent } from '../../content/dedicationContent';
import { Heart } from 'lucide-react';
import { useState } from 'react';

export function HeroSection() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
              {/* Decorative element */}
              <div className="flex justify-center lg:justify-start mb-6">
                <Heart className="w-16 h-16 text-primary fill-current animate-pulse" />
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                {dedicationContent.hero.title}
              </h1>
              
              <p className="text-xl sm:text-2xl text-foreground/80 font-light leading-relaxed">
                {dedicationContent.hero.subtitle}
              </p>

              {/* Hands illustration */}
              <div className="mt-8 flex justify-center lg:justify-start">
                <img
                  src="/assets/generated/hands-lineart.dim_1200x800.png"
                  alt="Hands holding"
                  className="w-full max-w-sm opacity-90"
                />
              </div>
            </div>

            {/* Large Photo */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/20">
                  {!imageError ? (
                    <img
                      src="/assets/generated/cute-hero-photo-cartoony.dim_1600x2000.jpg"
                      alt="Sona"
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <div className="text-center space-y-4 p-8">
                        <Heart className="w-24 h-24 text-primary/40 fill-current mx-auto" />
                        <p className="text-foreground/60 font-serif text-lg">
                          Photo coming soon
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full" />
        </div>
      </div>
    </section>
  );
}
