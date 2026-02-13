import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}

export function PhotoModal({ isOpen, onClose, imageSrc }: PhotoModalProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [previousOverflow, setPreviousOverflow] = useState('');

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Store previous overflow value and prevent body scroll when modal is open
      setPreviousOverflow(document.body.style.overflow);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restore previous overflow value
      document.body.style.overflow = previousOverflow || 'unset';
    };
  }, [isOpen, onClose, previousOverflow]);

  // Reset error and loaded state when modal opens or image changes
  useEffect(() => {
    if (isOpen) {
      setImageError(false);
      setImageLoaded(false);
    }
  }, [isOpen, imageSrc]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal content */}
      <div className="relative z-10 max-w-4xl max-h-[90vh] w-full mx-4 bg-card rounded-lg shadow-2xl overflow-hidden">
        {/* Close button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-20 bg-background/80 hover:bg-background rounded-full"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Image container */}
        <div className="flex items-center justify-center p-4 min-h-[300px]">
          {imageError ? (
            <div className="text-center text-muted-foreground p-8">
              <p className="text-lg">Unable to load the photo</p>
              <p className="text-sm mt-2">Please try again later</p>
            </div>
          ) : (
            <img
              src={imageSrc}
              alt="Special photo"
              className={`max-w-full max-h-[80vh] w-auto h-auto object-contain transition-opacity duration-700 ease-in-out ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onError={() => setImageError(true)}
              onLoad={() => setImageLoaded(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
