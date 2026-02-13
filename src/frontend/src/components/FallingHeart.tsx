import { useState, useEffect, useCallback, useRef } from 'react';
import { Star, Heart, Gift, Coffee, Flower2 } from 'lucide-react';
import { PhotoModal } from './PhotoModal';

export function FallingHeart() {
  const [isStarVisible, setIsStarVisible] = useState(false);
  const [starPosition, setStarPosition] = useState({ left: 50 });
  const [isHeartVisible, setIsHeartVisible] = useState(false);
  const [heartPosition, setHeartPosition] = useState({ left: 50 });
  const [isGiftVisible, setIsGiftVisible] = useState(false);
  const [giftPosition, setGiftPosition] = useState({ left: 50 });
  const [isCoffeeVisible, setIsCoffeeVisible] = useState(false);
  const [coffeePosition, setCoffeePosition] = useState({ left: 50 });
  const [isFlowerVisible, setIsFlowerVisible] = useState(false);
  const [flowerPosition, setFlowerPosition] = useState({ left: 50 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const starTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const heartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const giftTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const coffeeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const flowerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const spawnStar = useCallback(() => {
    // Only spawn if no star is currently visible and modal is closed
    if (isStarVisible || isModalOpen) return;

    // Random horizontal position (10% to 90% of viewport width)
    const randomLeft = Math.random() * 80 + 10;
    setStarPosition({ left: randomLeft });
    setIsStarVisible(true);

    // Auto-remove star after animation completes (8 seconds)
    setTimeout(() => {
      setIsStarVisible(false);
    }, 8000);
  }, [isStarVisible, isModalOpen]);

  const spawnHeart = useCallback(() => {
    // Only spawn if no heart is currently visible and modal is closed
    if (isHeartVisible || isModalOpen) return;

    // Random horizontal position (10% to 90% of viewport width)
    const randomLeft = Math.random() * 80 + 10;
    setHeartPosition({ left: randomLeft });
    setIsHeartVisible(true);

    // Auto-remove heart after animation completes (8 seconds)
    setTimeout(() => {
      setIsHeartVisible(false);
    }, 8000);
  }, [isHeartVisible, isModalOpen]);

  const spawnGift = useCallback(() => {
    // Only spawn if no gift is currently visible and modal is closed
    if (isGiftVisible || isModalOpen) return;

    // Random horizontal position (10% to 90% of viewport width)
    const randomLeft = Math.random() * 80 + 10;
    setGiftPosition({ left: randomLeft });
    setIsGiftVisible(true);

    // Auto-remove gift after animation completes (8 seconds)
    setTimeout(() => {
      setIsGiftVisible(false);
    }, 8000);
  }, [isGiftVisible, isModalOpen]);

  const spawnCoffee = useCallback(() => {
    // Only spawn if no coffee is currently visible and modal is closed
    if (isCoffeeVisible || isModalOpen) return;

    // Random horizontal position (10% to 90% of viewport width)
    const randomLeft = Math.random() * 80 + 10;
    setCoffeePosition({ left: randomLeft });
    setIsCoffeeVisible(true);

    // Auto-remove coffee after animation completes (8 seconds)
    setTimeout(() => {
      setIsCoffeeVisible(false);
    }, 8000);
  }, [isCoffeeVisible, isModalOpen]);

  const spawnFlower = useCallback(() => {
    // Only spawn if no flower is currently visible and modal is closed
    if (isFlowerVisible || isModalOpen) return;

    // Random horizontal position (10% to 90% of viewport width)
    const randomLeft = Math.random() * 80 + 10;
    setFlowerPosition({ left: randomLeft });
    setIsFlowerVisible(true);

    // Auto-remove flower after animation completes (8 seconds)
    setTimeout(() => {
      setIsFlowerVisible(false);
    }, 8000);
  }, [isFlowerVisible, isModalOpen]);

  useEffect(() => {
    // Schedule random star spawns
    const scheduleNextStar = () => {
      // Random delay between 5-15 seconds
      const delay = Math.random() * 10000 + 5000;
      starTimeoutRef.current = setTimeout(() => {
        if (!isModalOpen) {
          spawnStar();
        }
        scheduleNextStar();
      }, delay);
    };

    scheduleNextStar();

    return () => {
      if (starTimeoutRef.current) {
        clearTimeout(starTimeoutRef.current);
      }
    };
  }, [isModalOpen, spawnStar]);

  useEffect(() => {
    // Schedule random heart spawns
    const scheduleNextHeart = () => {
      // Random delay between 5-15 seconds
      const delay = Math.random() * 10000 + 5000;
      heartTimeoutRef.current = setTimeout(() => {
        if (!isModalOpen) {
          spawnHeart();
        }
        scheduleNextHeart();
      }, delay);
    };

    scheduleNextHeart();

    return () => {
      if (heartTimeoutRef.current) {
        clearTimeout(heartTimeoutRef.current);
      }
    };
  }, [isModalOpen, spawnHeart]);

  useEffect(() => {
    // Schedule random gift spawns with longer intermittent delays
    const scheduleNextGift = () => {
      // Random delay between 15-30 seconds (more intermittent than star/heart)
      const delay = Math.random() * 15000 + 15000;
      giftTimeoutRef.current = setTimeout(() => {
        if (!isModalOpen) {
          spawnGift();
        }
        scheduleNextGift();
      }, delay);
    };

    scheduleNextGift();

    return () => {
      if (giftTimeoutRef.current) {
        clearTimeout(giftTimeoutRef.current);
      }
    };
  }, [isModalOpen, spawnGift]);

  useEffect(() => {
    // Schedule random coffee spawns with longer intermittent delays
    const scheduleNextCoffee = () => {
      // Random delay between 15-30 seconds (more intermittent, similar to gift)
      const delay = Math.random() * 15000 + 15000;
      coffeeTimeoutRef.current = setTimeout(() => {
        if (!isModalOpen) {
          spawnCoffee();
        }
        scheduleNextCoffee();
      }, delay);
    };

    scheduleNextCoffee();

    return () => {
      if (coffeeTimeoutRef.current) {
        clearTimeout(coffeeTimeoutRef.current);
      }
    };
  }, [isModalOpen, spawnCoffee]);

  useEffect(() => {
    // Schedule random flower spawns with longer intermittent delays
    const scheduleNextFlower = () => {
      // Random delay between 15-30 seconds (more intermittent, similar to gift/coffee)
      const delay = Math.random() * 15000 + 15000;
      flowerTimeoutRef.current = setTimeout(() => {
        if (!isModalOpen) {
          spawnFlower();
        }
        scheduleNextFlower();
      }, delay);
    };

    scheduleNextFlower();

    return () => {
      if (flowerTimeoutRef.current) {
        clearTimeout(flowerTimeoutRef.current);
      }
    };
  }, [isModalOpen, spawnFlower]);

  const handleStarClick = () => {
    setIsStarVisible(false);
    setModalImageSrc('/assets/WhatsApp Image 2026-02-12 at 10.19.36 AM (2)-2.png');
    setIsModalOpen(true);
  };

  const handleHeartClick = () => {
    setIsHeartVisible(false);
    setModalImageSrc('/assets/WhatsApp Image 2026-02-12 at 10.19.35 AM (1)-3.png');
    setIsModalOpen(true);
  };

  const handleGiftClick = () => {
    setIsGiftVisible(false);
    setModalImageSrc('/assets/WhatsApp Image 2026-02-12 at 10.08.52 AM-2.png');
    setIsModalOpen(true);
  };

  const handleCoffeeClick = () => {
    setIsCoffeeVisible(false);
    setModalImageSrc('/assets/WhatsApp Image 2026-02-12 at 10.19.36 AM (1)-2.png');
    setIsModalOpen(true);
  };

  const handleFlowerClick = () => {
    setIsFlowerVisible(false);
    setModalImageSrc('/assets/WhatsApp Image 2026-02-12 at 10.19.35 AM-2.png');
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Overlay container with pointer-events: none to avoid blocking page interaction */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {isStarVisible && (
          <button
            onClick={handleStarClick}
            className="absolute pointer-events-auto animate-heart-fall cursor-pointer hover:scale-110 transition-transform"
            style={{ left: `${starPosition.left}%`, top: '-60px' }}
            aria-label="Click the falling star to see a special photo"
          >
            <Star className="w-12 h-12 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
          </button>
        )}
        {isHeartVisible && (
          <button
            onClick={handleHeartClick}
            className="absolute pointer-events-auto animate-heart-fall cursor-pointer hover:scale-110 transition-transform"
            style={{ left: `${heartPosition.left}%`, top: '-60px' }}
            aria-label="Click the falling heart to see a special photo"
          >
            <Heart className="w-12 h-12 fill-rose-500 text-rose-500 drop-shadow-lg" />
          </button>
        )}
        {isGiftVisible && (
          <button
            onClick={handleGiftClick}
            className="absolute pointer-events-auto animate-heart-fall cursor-pointer hover:scale-110 transition-transform"
            style={{ left: `${giftPosition.left}%`, top: '-60px' }}
            aria-label="Click the falling gift box to see a special photo"
          >
            <Gift className="w-12 h-12 fill-purple-500 text-purple-500 drop-shadow-lg" />
          </button>
        )}
        {isCoffeeVisible && (
          <button
            onClick={handleCoffeeClick}
            className="absolute pointer-events-auto animate-heart-fall cursor-pointer hover:scale-110 transition-transform"
            style={{ left: `${coffeePosition.left}%`, top: '-60px' }}
            aria-label="Click the falling coffee cup to see a special photo"
          >
            <Coffee className="w-12 h-12 fill-amber-600 text-amber-600 drop-shadow-lg" />
          </button>
        )}
        {isFlowerVisible && (
          <button
            onClick={handleFlowerClick}
            className="absolute pointer-events-auto animate-heart-fall cursor-pointer hover:scale-110 transition-transform"
            style={{ left: `${flowerPosition.left}%`, top: '-60px' }}
            aria-label="Click the falling flower to see a special photo"
          >
            <Flower2 className="w-12 h-12 fill-pink-400 text-pink-400 drop-shadow-lg" />
          </button>
        )}
      </div>

      <PhotoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={modalImageSrc}
      />
    </>
  );
}
