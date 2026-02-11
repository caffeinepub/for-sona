interface CelebrationAnimationProps {
  show: boolean;
}

export function CelebrationAnimation({ show }: CelebrationAnimationProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Confetti particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10%',
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 1}s`,
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: [
                'oklch(0.72 0.14 35)',
                'oklch(0.65 0.15 25)',
                'oklch(0.70 0.12 45)',
                'oklch(0.60 0.10 60)',
                'oklch(0.75 0.14 15)',
              ][Math.floor(Math.random() * 5)],
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        </div>
      ))}

      {/* Center burst effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-celebration-burst">
          <div className="text-8xl">🎉</div>
        </div>
      </div>

      {/* Sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute animate-sparkle"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 0.8}s`,
          }}
        >
          <div className="text-3xl">✨</div>
        </div>
      ))}
    </div>
  );
}
