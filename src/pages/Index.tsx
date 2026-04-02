import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section1Quiz from "@/components/Section1Quiz";
import Section2Music from "@/components/Section2Music";
import Section2Birthday from "@/components/Section2Birthday";
import Section3Letter from "@/components/Section3Letter";
import Section4Gallery from "@/components/Section4Gallery";
import Section5Closing from "@/components/Section5Closing";
import FloatingMiniPlayer from "@/components/FloatingMiniPlayer";

type Section = "quiz" | "music" | "birthday" | "content";

const tracks = [
  { src: "/audio/understand.webm", title: "UNDERSTAND", artist: "keshi", albumKey: "keshi" },
  { src: "/audio/star-colde.mp3", title: "Star", artist: "Colde", albumKey: "colde" },
];

const Index = () => {
  const [currentSection, setCurrentSection] = useState<Section>("quiz");
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const showMiniPlayer = currentSection === "birthday" || currentSection === "content";

  const handleTrackEnd = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentTrack < tracks.length - 1) {
      const nextIdx = currentTrack + 1;
      setCurrentTrack(nextIdx);
      audio.src = tracks[nextIdx].src;
      audio.load();
      audio.play().catch(() => {});
    }
  }, [currentTrack]);

  const handleQuizComplete = () => {
    setCurrentSection("music");
  };

  const handleMusicContinue = () => {
    setCurrentSection("birthday");
  };

  const handleContinueToContent = () => {
    setCurrentSection("content");
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = tracks[0].src;
      audioRef.current.load();
    }
    setCurrentTrack(0);
    setCurrentSection("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="overflow-hidden">
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={handleTrackEnd}
      />

      <AnimatePresence mode="wait">
        {currentSection === "quiz" && (
          <motion.div
            key="quiz"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Section1Quiz onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {currentSection === "music" && (
          <motion.div
            key="music"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Section2Music onContinue={handleMusicContinue} audioRef={audioRef} />
          </motion.div>
        )}

        {currentSection === "birthday" && (
          <motion.div
            key="birthday"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Section2Birthday onContinue={handleContinueToContent} />
          </motion.div>
        )}

        {currentSection === "content" && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Section3Letter />
            <Section4Gallery />
            <Section5Closing onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating mini player - appears after leaving music section */}
      <AnimatePresence>
        {showMiniPlayer && <FloatingMiniPlayer audioRef={audioRef} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
