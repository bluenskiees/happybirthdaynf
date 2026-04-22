import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { OrnateHeart, Sparkle4 } from "./icons/DecorativeIcons";

interface LoadingScreenProps {
  onComplete: () => void;
}

const TRACKS_TO_PRELOAD = ["/audio/understand.webm", "/audio/star-colde.mp3"];
const MAX_WAIT_MS = 4000; // safety: never stuck >4s
const MIN_DISPLAY_MS = 1800; // ensure cinematic feel

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  // Preload audio + fonts, then auto-transition
  useEffect(() => {
    const startedAt = Date.now();
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(() => onComplete(), wait);
    };

    // Preload audio tracks
    const audios: HTMLAudioElement[] = [];
    let loadedCount = 0;
    const totalAssets = TRACKS_TO_PRELOAD.length;

    const onAssetReady = () => {
      loadedCount += 1;
      setProgress(Math.min(100, Math.round((loadedCount / totalAssets) * 100)));
      if (loadedCount >= totalAssets) finish();
    };

    TRACKS_TO_PRELOAD.forEach((src) => {
      const a = new Audio();
      a.preload = "auto";
      a.src = src;
      const handler = () => {
        a.removeEventListener("canplaythrough", handler);
        a.removeEventListener("error", handler);
        onAssetReady();
      };
      a.addEventListener("canplaythrough", handler);
      a.addEventListener("error", handler); // count errors as ready (don't block)
      try { a.load(); } catch { onAssetReady(); }
      audios.push(a);
    });

    // Smooth progress filler so bar always moves
    const filler = setInterval(() => {
      setProgress((p) => (p < 92 ? p + 1.5 : p));
    }, 80);

    // Hard safety timeout
    const safety = setTimeout(finish, MAX_WAIT_MS);

    return () => {
      clearInterval(filler);
      clearTimeout(safety);
      audios.forEach((a) => { a.src = ""; });
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
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

          <motion.div
            animate={{ scale: [1, 1.15, 1, 1.15, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
            style={{ filter: "drop-shadow(0 0 20px rgba(232, 213, 183, 0.5))" }}
          >
            <OrnateHeart className="w-16 h-16 text-[#c9a876]" />
          </motion.div>
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col items-center gap-3"
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

          {/* Slim progress bar */}
          <div className="mt-3 w-48 h-[2px] bg-[#e8d5b7]/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, hsl(38 45% 70%), hsl(30 30% 86%))",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
