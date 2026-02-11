import { dedicationContent } from '../../content/dedicationContent';
import { DedicationLayout } from '../DedicationLayout';
import { Sparkles } from 'lucide-react';

export function MomentsSection() {
  return (
    <section id="moments" className="py-20 sm:py-32 bg-muted/30">
      <DedicationLayout>
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4 text-foreground">
            {dedicationContent.moments.heading}
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70">
            {dedicationContent.moments.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {dedicationContent.moments.entries.map((moment, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border/50"
            >
              <div className="flex items-start gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-1">
                    {moment.title}
                  </h3>
                  <p className="text-sm text-primary/80 font-medium">
                    {moment.date}
                  </p>
                </div>
              </div>
              <p className="text-foreground/70 leading-relaxed">
                {moment.description}
              </p>
            </div>
          ))}
        </div>
      </DedicationLayout>
    </section>
  );
}
