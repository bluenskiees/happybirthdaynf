import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MusicOrnate as Music2, PlaySoft as Play, PauseSoft as Pause, CloseDelicate as X } from "./icons/DecorativeIcons";
import { haptic } from "@/lib/haptics";
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
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isVisible] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const lastUpdateRef = useRef(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => { setIsPlaying(true); setIsBuffering(false); };
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsBuffering(true);
    const onPlaying = () => setIsBuffering(false);
    const onCanPlay = () => setIsBuffering(false);
    const onLoadStart = () => {
      if (!audio.paused) setIsBuffering(true);
    };
    const onLoadedMeta = () => {
      if (!isNaN(audio.duration)) setDuration(audio.duration);
    };
    const onTimeUpdate = () => {
      // Throttle to ~4x/sec to avoid excess re-renders
      const now = Date.now();
      if (now - lastUpdateRef.current < 250) return;
      lastUpdateRef.current = now;
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };

    setIsPlaying(!audio.paused);
    if (!isNaN(audio.duration)) setDuration(audio.duration);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("loadstart", onLoadStart);
    audio.addEventListener("loadedmetadata", onLoadedMeta);
    audio.addEventListener("durationchange", onLoadedMeta);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("loadstart", onLoadStart);
      audio.removeEventListener("loadedmetadata", onLoadedMeta);
      audio.removeEventListener("durationchange", onLoadedMeta);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [audioRef]);

  // Reset buffering when track index changes
  useEffect(() => {
    setIsBuffering(true);
    setProgress(0);
    setCurrentTime(0);
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused && audio.readyState >= 3) setIsBuffering(false);
  }, [currentTrackIndex, audioRef]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    haptic(audio.paused ? "medium" : "light");
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [audioRef]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressBarRef.current;
    if (!audio || !bar || !audio.duration || isNaN(audio.duration)) return;
    const rect = bar.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0]?.clientX ?? e.changedTouches[0]?.clientX : e.clientX;
    if (clientX == null) return;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio * 100);
    setCurrentTime(audio.currentTime);
    haptic("light");
  }, [audioRef]);

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

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
              animate={isPlaying && !isBuffering ? { rotate: 360 } : {}}
              transition={isPlaying && !isBuffering ? { repeat: Infinity, duration: 6, ease: "linear" } : { duration: 0.3 }}
              className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-[#e8d5b7]/15"
            >
              <img src={cover} alt="Album" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#1a0a0a] border border-[#e8d5b7]/10" />
              </div>
              {/* Buffering spinner overlay */}
              <AnimatePresence>
                {isBuffering && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-[#1a0a0a]/55 backdrop-blur-[1px]"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                      className="w-4 h-4 rounded-full border-2 border-[#e8d5b7]/20 border-t-[#e8d5b7]/90"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Song info + seekable progress */}
            <div className="flex flex-col min-w-[110px]">
              <span className="text-[#e8d5b7] text-xs font-medium tracking-wide leading-tight truncate">
                {track.title}
              </span>
              <span className="text-[#e8d5b7]/40 text-[10px] tracking-[0.15em] truncate">
                {isBuffering ? "Loading…" : track.artist}
              </span>
              {/* Seekable progress bar */}
              <div
                ref={progressBarRef}
                onClick={handleSeek}
                onTouchEnd={handleSeek}
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                className="group/bar w-full h-3 flex items-center mt-1 cursor-pointer"
              >
                <div className="w-full h-[2px] bg-[#e8d5b7]/10 rounded-full overflow-hidden group-hover/bar:h-[3px] transition-[height] relative">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, hsl(38 45% 70%), hsl(30 30% 86%))",
                      transition: "width 0.25s linear",
                    }}
                  />
                </div>
              </div>
              {/* Time display */}
              <div className="flex justify-between mt-0.5">
                <span className="text-[#e8d5b7]/35 text-[9px] tabular-nums">{formatTime(currentTime)}</span>
                <span className="text-[#e8d5b7]/35 text-[9px] tabular-nums">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Play/Pause button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(232, 213, 183, 0.15), rgba(232, 213, 183, 0.05))",
                border: "1px solid rgba(232, 213, 183, 0.15)",
              }}
            >
              {isBuffering ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                  className="w-3.5 h-3.5 rounded-full border-2 border-[#e8d5b7]/20 border-t-[#e8d5b7]/90"
                />
              ) : isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-[#e8d5b7]/80" />
              ) : (
                <Play className="w-3.5 h-3.5 text-[#e8d5b7]/80 ml-0.5" />
              )}
            </motion.button>

            {/* Collapse button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(false)}
              aria-label="Collapse player"
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
            aria-label="Expand music player"
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
