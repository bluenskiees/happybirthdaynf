import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseDelicate, ChevronOrnate } from "./icons/DecorativeIcons";

interface GalleryLightboxProps {
  photos: string[];
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const GalleryLightbox = ({ photos, selectedIndex, onClose, onNavigate }: GalleryLightboxProps) => {
  const [direction, setDirection] = useState(0);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setDirection(-1);
    onNavigate(selectedIndex <= 0 ? photos.length - 1 : selectedIndex - 1);
  }, [selectedIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setDirection(1);
    onNavigate(selectedIndex >= photos.length - 1 ? 0 : selectedIndex + 1);
  }, [selectedIndex, photos.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, onClose, handlePrev, handleNext]);

  // Preload neighboring images for instant nav
  useEffect(() => {
    if (selectedIndex === null) return;
    const next = (selectedIndex + 1) % photos.length;
    const prev = (selectedIndex - 1 + photos.length) % photos.length;
    [next, prev].forEach((i) => {
      const img = new Image();
      img.src = photos[i];
    });
  }, [selectedIndex, photos]);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 60) {
      if (diff > 0) handlePrev();
      else handleNext();
    }
    setTouchStart(null);
  };

  if (selectedIndex === null) return null;

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.9 }),
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        onClick={onClose}
      >
        {/* Blurred background overlay */}
        <div className="absolute inset-0 bg-walnut-deep/80 backdrop-blur-xl" />

        {/* Photo counter */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-10"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-cream-light/40 font-body">
            {selectedIndex + 1} / {photos.length}
          </span>
        </motion.div>

        {/* Close button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-cream-light/10 backdrop-blur-md flex items-center justify-center text-cream-light/70 hover:text-cream-light hover:bg-cream-light/20 transition-all duration-300"
        >
          <CloseDelicate className="w-5 h-5" />
        </motion.button>

        {/* Navigation arrows */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-2 sm:left-4 md:left-8 z-10 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-cream-light/10 backdrop-blur-md flex items-center justify-center text-cream-light/60 hover:text-cream-light hover:bg-cream-light/20 transition-all duration-300"
        >
          <ChevronOrnate direction="left" className="w-4 h-4 sm:w-6 sm:h-6" />
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-2 sm:right-4 md:right-8 z-10 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-cream-light/10 backdrop-blur-md flex items-center justify-center text-cream-light/60 hover:text-cream-light hover:bg-cream-light/20 transition-all duration-300"
        >
          <ChevronOrnate direction="right" className="w-4 h-4 sm:w-6 sm:h-6" />
        </motion.button>

        {/* Photo container */}
        <div
          className="relative w-full h-full flex items-center justify-center px-12 sm:px-16 md:px-24 py-16 sm:py-20"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={selectedIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-4xl w-full max-h-[70vh] sm:max-h-[75vh] relative"
            >
              <img
                src={photos[selectedIndex]}
                alt={`Memory ${selectedIndex + 1}`}
                className="w-full h-full max-h-[70vh] sm:max-h-[75vh] object-contain rounded-lg"
                style={{
                  filter: "drop-shadow(0 25px 60px rgba(0,0,0,0.4))",
                }}
              />
              {/* Subtle golden frame glow */}
              <div
                className="absolute -inset-1 rounded-lg pointer-events-none opacity-30"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--gold-soft) / 0.2), transparent 30%, transparent 70%, hsl(var(--petal-secondary) / 0.15))",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom thumbnail strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 max-w-[80vw] overflow-x-auto px-4 py-2 rounded-full bg-walnut-deep/40 backdrop-blur-md"
        >
          {photos.slice(
            Math.max(0, selectedIndex - 4),
            Math.min(photos.length, selectedIndex + 5)
          ).map((photo, i) => {
            const realIndex = Math.max(0, selectedIndex - 4) + i;
            return (
              <button
                key={realIndex}
                onClick={(e) => {
                  e.stopPropagation();
                  setDirection(realIndex > selectedIndex ? 1 : -1);
                  onNavigate(realIndex);
                }}
                className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-md overflow-hidden transition-all duration-300 ${
                  realIndex === selectedIndex
                    ? "ring-2 ring-gold-soft/60 scale-110 opacity-100"
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </button>
            );
          })}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryLightbox;
