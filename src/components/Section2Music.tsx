import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PlaySoft, PauseSoft } from "./icons/DecorativeIcons";
import { haptic } from "@/lib/haptics";
import albumCover from "@/assets/album-cover.jpg";

interface Section2MusicProps {
  onContinue: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const Section2Music = ({ onContinue, audioRef }: Section2MusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [hasStarted, setHasStarted] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(formatTime(audio.currentTime));
      }
    };

    const onLoaded = () => {
      setDuration(formatTime(audio.duration));
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime("0:00");
    };

    // Set duration if already loaded
    if (audio.duration) {
      setDuration(formatTime(audio.duration));
    }

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioRef]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    haptic(isPlaying ? "light" : "medium");

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
      if (!hasStarted) setHasStarted(true);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, hasStarted, audioRef]);

  // SVG circular progress (slightly smaller — vinyl scales via CSS for mobile)
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Tonearm rotation: resting at -30deg, playing at 0deg
  const tonearmRotation = isPlaying ? 0 + (progress / 100) * 18 : -30;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 overflow-hidden flex items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #1a0a0a 0%, #2d0f0f 30%, #4a1a1a 60%, #1a0a0a 100%)",
      }}
    >
      {/* Ambient glow effects */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #8b2020 0%, transparent 70%)" }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] translate-x-40 -translate-y-20"
        style={{ background: "radial-gradient(circle, #c4a265 0%, transparent 70%)" }}
      />

      {/* Subtle film grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-8 px-5 w-full">
        {/* Intro text */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-[#e8d5b7]/60 text-[10px] sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] uppercase font-light text-center px-4"
        >
          Before we begin, press play first ♪
        </motion.p>

        {/* Vinyl + Tonearm Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Tonearm */}
          <div className="absolute -top-6 -right-8 z-40 hidden md:block" style={{ width: 120, height: 200 }}>
            <motion.div
              animate={{ rotate: tonearmRotation }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              style={{ transformOrigin: "16px 16px" }}
              className="relative"
            >
              {/* Pivot point */}
              <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-[#2a1a1a] border-2 border-[#e8d5b7]/20 z-10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#e8d5b7]/30" />
              </div>
              {/* Arm */}
              <div className="absolute top-3 left-3 w-[3px] h-[160px] bg-gradient-to-b from-[#e8d5b7]/40 via-[#e8d5b7]/25 to-[#e8d5b7]/15 rounded-full origin-top rotate-[20deg]" />
              {/* Headshell */}
              <div className="absolute top-[148px] left-[52px] w-[10px] h-[18px] bg-[#e8d5b7]/30 rounded-b-sm" style={{ transform: "rotate(20deg)" }} />
              {/* Stylus/needle */}
              <div className="absolute top-[164px] left-[54px] w-[6px] h-[6px] bg-[#e8d5b7]/50 rounded-full" style={{ transform: "rotate(20deg)" }} />
            </motion.div>
          </div>

          {/* Circular progress ring */}
          <svg
            className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)]"
            viewBox={`0 0 ${(radius + 12) * 2} ${(radius + 12) * 2}`}
          >
            <circle
              cx={radius + 12}
              cy={radius + 12}
              r={radius}
              fill="none"
              stroke="rgba(232, 213, 183, 0.08)"
              strokeWidth="2"
            />
            <circle
              cx={radius + 12}
              cy={radius + 12}
              r={radius}
              fill="none"
              stroke="rgba(232, 213, 183, 0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform={`rotate(-90 ${radius + 12} ${radius + 12})`}
              style={{ transition: "stroke-dashoffset 0.3s ease" }}
            />
          </svg>

          {/* Album cover with vinyl effect */}
          <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full overflow-hidden shadow-2xl">
            <motion.div
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={
                isPlaying
                  ? { repeat: Infinity, duration: 8, ease: "linear" }
                  : { duration: 0.3 }
              }
              className="w-full h-full"
            >
              {/* Vinyl grooves overlay */}
              <div className="absolute inset-0 rounded-full z-10">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `repeating-radial-gradient(circle at center, transparent 0px, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)`,
                  }}
                />
              </div>

              {/* Album art */}
              <img
                src={albumCover}
                alt="keshi - UNDERSTAND"
                className="w-full h-full object-cover"
              />

              {/* Center hole */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-16 h-16 rounded-full bg-[#1a0a0a] border-2 border-[#e8d5b7]/10 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#e8d5b7]/20" />
                </div>
              </div>
            </motion.div>

            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          </div>

          {/* Play/Pause button overlay */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center z-30 cursor-pointer group"
          >
            <AnimatePresence mode="wait">
              {!isPlaying && (
                <motion.div
                  key="play"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="w-16 h-16 rounded-full bg-[#1a0a0a]/60 backdrop-blur-sm border border-[#e8d5b7]/20 flex items-center justify-center group-hover:bg-[#1a0a0a]/80 transition-colors"
                >
                  <PlaySoft className="w-6 h-6 text-[#e8d5b7]/80 ml-1" />
                </motion.div>
              )}
              {isPlaying && (
                <motion.div
                  key="pause"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.35, scale: 1 }}
                  whileHover={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 rounded-full bg-[#1a0a0a]/60 backdrop-blur-sm border border-[#e8d5b7]/20 flex items-center justify-center"
                >
                  <PauseSoft className="w-6 h-6 text-[#e8d5b7]/80" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Song info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-[#e8d5b7] text-xl font-light tracking-wider mb-1">
            UNDERSTAND
          </h2>
          <p className="text-[#e8d5b7]/40 text-sm tracking-[0.2em] uppercase">
            keshi
          </p>
        </motion.div>

        {/* Time display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hasStarted ? 1 : 0 }}
          className="flex items-center gap-4 text-[#e8d5b7]/30 text-xs tracking-wider font-light"
        >
          <span>{currentTime}</span>
          <div className="w-32 sm:w-40 h-px bg-[#e8d5b7]/10 relative">
            <div
              className="absolute top-0 left-0 h-full bg-[#e8d5b7]/30"
              style={{ width: `${progress}%`, transition: "width 0.3s ease" }}
            />
          </div>
          <span>{duration}</span>
        </motion.div>

        {/* Continue button */}
        <AnimatePresence>
          {hasStarted && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => { haptic("light"); onContinue(); }}
              className="flex flex-col items-center gap-2 group cursor-pointer mt-4"
            >
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#e8d5b7]/40 group-hover:text-[#e8d5b7]/70 transition-colors">
                Continue
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ChevronDown className="w-4 h-4 text-[#e8d5b7]/40 group-hover:text-[#e8d5b7]/70 transition-colors" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#e8d5b7]/8 rounded-tl-lg hidden md:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#e8d5b7]/8 rounded-br-lg hidden md:block" />
    </motion.div>
  );
};

export default Section2Music;
