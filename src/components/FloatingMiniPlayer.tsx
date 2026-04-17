import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MusicOrnate, PlaySoft, PauseSoft, CloseDelicate } from "./icons/DecorativeIcons";
import albumCover1 from "@/assets/album-cover.jpg";
import albumCover2 from "@/assets/album-cover-2.jpg";

const albumCovers: Record<string, string> = {
  keshi: albumCover1,
  colde: albumCover2,
};

const tracks = [
  { title: "UNDERSTAND", artist: "keshi", albumKey: "keshi" },
  { title: "Star", artist: "Colde", albumKey: "colde" },
];

interface FloatingMiniPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  currentTrackIndex: number;
}

const FloatingMiniPlayer = ({ audioRef, currentTrackIndex }: FloatingMiniPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isVisible] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    setIsPlaying(!audio.paused);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [audioRef]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [audioRef]);

  if (!isVisible) return null;

  const track = tracks[currentTrackIndex];
  const cover = albumCovers[track.albumKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ width: 48, borderRadius: 24 }}
            animate={{ width: "auto", borderRadius: 16 }}
            exit={{ width: 48, borderRadius: 24 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-2xl backdrop-blur-xl shadow-2xl border"
            style={{
              background: "linear-gradient(135deg, rgba(26, 10, 10, 0.92), rgba(45, 15, 15, 0.92))",
              borderColor: "rgba(232, 213, 183, 0.12)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(139, 32, 32, 0.15)",
            }}
          >
            {/* Album cover thumbnail */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={isPlaying ? { repeat: Infinity, duration: 6, ease: "linear" } : { duration: 0.3 }}
              className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-[#e8d5b7]/15"
            >
              <img src={cover} alt="Album" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#1a0a0a] border border-[#e8d5b7]/10" />
              </div>
            </motion.div>

            {/* Song info */}
            <div className="flex flex-col min-w-[90px]">
              <span className="text-[#e8d5b7] text-xs font-medium tracking-wide leading-tight">
                {track.title}
              </span>
              <span className="text-[#e8d5b7]/40 text-[10px] tracking-[0.15em]">
                {track.artist}
              </span>
              {/* Mini progress bar */}
              <div className="w-full h-[2px] bg-[#e8d5b7]/10 rounded-full mt-1.5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, hsl(38 45% 70%), hsl(30 30% 86%))",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Play/Pause button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(232, 213, 183, 0.15), rgba(232, 213, 183, 0.05))",
                border: "1px solid rgba(232, 213, 183, 0.15)",
              }}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-[#e8d5b7]/80" fill="currentColor" />
              ) : (
                <Play className="w-3.5 h-3.5 text-[#e8d5b7]/80 ml-0.5" fill="currentColor" />
              )}
            </motion.button>

            {/* Collapse button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(false)}
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-[#e8d5b7]/5 transition-colors"
            >
              <X className="w-3 h-3 text-[#e8d5b7]/30" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(26, 10, 10, 0.95), rgba(45, 15, 15, 0.95))",
              border: "1px solid rgba(232, 213, 183, 0.12)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(139, 32, 32, 0.15)",
            }}
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(232, 213, 183, 0.08)" strokeWidth="2" />
              <circle
                cx="24" cy="24" r="22" fill="none"
                stroke="hsl(38 45% 70%)"
                strokeWidth="2" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 22}
                strokeDashoffset={2 * Math.PI * 22 * (1 - progress / 100)}
                style={{ transition: "stroke-dashoffset 0.3s ease" }}
              />
            </svg>
            {isPlaying ? (
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <Music2 className="w-5 h-5 text-[#e8d5b7]/70" />
              </motion.div>
            ) : (
              <Music2 className="w-5 h-5 text-[#e8d5b7]/50" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FloatingMiniPlayer;
