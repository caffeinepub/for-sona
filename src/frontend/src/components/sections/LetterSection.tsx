import { dedicationContent } from '../../content/dedicationContent';
import { DedicationLayout } from '../DedicationLayout';

export function LetterSection() {
  return (
    <section id="letter" className="py-20 sm:py-32">
      <DedicationLayout>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-center mb-12 text-foreground">
            {dedicationContent.letter.heading}
          </h2>
          
          <div className="space-y-6">
            {dedicationContent.letter.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg sm:text-xl text-foreground/80 leading-relaxed text-center sm:text-left"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </DedicationLayout>
    </section>
  );
}
