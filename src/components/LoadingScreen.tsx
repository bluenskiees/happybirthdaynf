import { useEffect } from "react";
import { motion } from "framer-motion";
import { OrnateHeart, Sparkle4 } from "./icons/DecorativeIcons";

interface LoadingScreenProps {
  onComplete: () => void;
}

const TRACKS_TO_PRELOAD = ["/audio/understand.webm", "/audio/star-colde.mp3"];

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  // Preload both audio tracks so track-2 transition is instant
  useEffect(() => {
    const audios: HTMLAudioElement[] = [];
    TRACKS_TO_PRELOAD.forEach((src) => {
      const a = new Audio();
      a.preload = "auto";
      a.src = src;
      // Trigger load
      try { a.load(); } catch {}
      audios.push(a);
    });
    return () => {
      audios.forEach((a) => {
        a.src = "";
      });
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={(def) => {
        // no-op; parent controls timing
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, hsl(15 25% 14%) 0%, hsl(10 30% 8%) 70%, hsl(0 0% 4%) 100%)",
      }}
    >
      {/* Soft golden vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(232, 213, 183, 0.08), transparent 60%)",
        }}
      />

      {/* Floating sparkles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#e8d5b7]/30"
          style={{
            left: `${15 + (i * 10)}%`,
            top: `${20 + ((i * 13) % 60)}%`,
          }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0.6, 1, 0.6],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          <Sparkle4 className="w-3 h-3" />
        </motion.div>
      ))}

      <div className="relative flex flex-col items-center gap-8">
        {/* Pulsing heart with ring */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer pulsing rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-[#e8d5b7]/30"
              animate={{
                scale: [1, 1.6, 1.6],
                opacity: [0.6, 0, 0],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Heart */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1, 1.15, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10"
            style={{
              filter: "drop-shadow(0 0 20px rgba(232, 213, 183, 0.5))",
            }}
          >
            <OrnateHeart className="w-16 h-16 text-[#c9a876]" />
          </motion.div>
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col items-center gap-2"
        >
          <p
            className="text-[#e8d5b7]/80 tracking-[0.4em] text-xs uppercase"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            A moment of love
          </p>
          <motion.p
            className="text-[#e8d5b7]/50 text-sm italic"
            style={{ fontFamily: "'Beautifully Delicious', cursive" }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            preparing something special...
          </motion.p>
        </motion.div>

        {/* Enter button after a delay */}
        <motion.button
          initial={{ opacity: 0, y: 20, pointerEvents: "none" }}
          animate={{ opacity: 1, y: 0, pointerEvents: "auto" }}
          transition={{ duration: 0.8, delay: 2.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="mt-4 px-8 py-2.5 rounded-full text-[#e8d5b7] text-xs tracking-[0.3em] uppercase border border-[#e8d5b7]/30 hover:border-[#e8d5b7]/60 transition-colors backdrop-blur-sm"
          style={{
            fontFamily: "Montserrat, sans-serif",
            background: "linear-gradient(135deg, rgba(232, 213, 183, 0.05), rgba(232, 213, 183, 0.02))",
          }}
        >
          Enter
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
