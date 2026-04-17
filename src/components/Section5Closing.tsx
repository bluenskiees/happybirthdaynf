import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { OrnateHeart, ReplayOrnate, Sparkle4 } from "./icons/DecorativeIcons";
import FlowerGarden from "./FlowerGarden";

const closingParagraphs = [
  "Looking back at everything we've been through, I realized how much you've endured for me. Even when I hurt you, disappointed you, made you cry, you still chose to stay. And that's something I'll always be grateful for.",
  "Because of you, I started paying attention to the little things. Because of you, I built an ambition to become someone successful, not for pride, but to make you happy. To build a comfortable home, a comfortable life, and one day, a warm little family filled with love.",
  "I still have fears in every step I take. I overthink the future more than I should. But every time I talk to you, everything feels like it's going to be okay. Like I can get through anything, as long as you're here.",
  "You are my future, and you are my place to come home to. I want to protect your trust, your happiness, and your future, the same way you've helped me grow up without making me feel afraid.",
  "I want to be the place you return to when everything feels heavy. Someone you can be honest with, someone who listens, someone who holds you quietly when words aren't enough.",
  "Don't be afraid to make any decision in your life. In every step you take, I'll be right beside you. I love you in every universe, my love.",
];

/* Floating particles background */
const FloatingParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 5,
        opacity: 0.1 + Math.random() * 0.3,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-petal-secondary"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* Emotional words for emphasis */
const closingEmotionalWords = new Set([
  "love", "you", "yours", "always", "forever", "stay", "chose",
  "home", "happy", "family", "afraid", "protect", "honest",
  "grateful", "hurt", "cry", "okay", "heart", "trust", "safe",
]);

/* Staggered word reveal for closing paragraphs */
const StaggeredClosingWords = ({ text, inView, delay = 0 }: { text: string; inView: boolean; delay?: number }) => {
  const words = text.split(" ");

  return (
    <span>
      {words.map((word, i) => {
        const cleanWord = word.replace(/[.,!?;:'"]/g, "").toLowerCase();
        const isEmotional = closingEmotionalWords.has(cleanWord);

        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10, filter: "blur(5px)", scale: 0.96 }}
            animate={inView ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              scale: 1,
            } : {}}
            transition={{
              duration: isEmotional ? 0.55 : 0.38,
              delay: delay + i * 0.04,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={`inline-block mr-[0.3em] ${isEmotional ? "text-cream-light font-medium" : ""}`}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
};

/* Typewriter effect for "I love you 3000." */
const TypewriterText = ({ text, inView, onComplete }: { text: string; inView: boolean; onComplete?: () => void }) => {
  const [displayedChars, setDisplayedChars] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedChars((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            onComplete?.();
            return prev;
          }
          return prev + 1;
        });
      }, 80);
      return () => clearInterval(interval);
    }, 800);

    return () => clearTimeout(timer);
  }, [inView, text.length, onComplete]);

  return (
    <span className="font-script text-4xl md:text-5xl lg:text-6xl text-cream-light/80">
      {text.slice(0, displayedChars)}
      {displayedChars < text.length && inView && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-8 md:h-10 bg-cream-light/60 ml-1 align-middle"
        />
      )}
    </span>
  );
};

/* Heart explosion - many small hearts burst from center */
const HeartExplosion = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const distance = 80 + Math.random() * 150;
        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 40,
          rotate: Math.random() * 360,
          scale: 0.3 + Math.random() * 0.8,
          delay: Math.random() * 0.3,
          duration: 1.5 + Math.random() * 1,
        };
      }),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      {hearts.map((h, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{
            x: h.x,
            y: h.y,
            scale: h.scale,
            opacity: 0,
            rotate: h.rotate,
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            ease: "easeOut",
          }}
          className="absolute"
        >
          <OrnateHeart
            className="text-petal-secondary/70"
          />
          <span style={{ position: "absolute", inset: 0, display: "block", width: 12 + h.scale * 12, height: 12 + h.scale * 12 }} aria-hidden />
        </motion.div>
      ))}
    </div>
  );
};

const ClosingParagraph = ({
  text,
  index,
  isLeft,
}: {
  text: string;
  index: number;
  isLeft: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`mb-14 last:mb-0 lg:max-w-xl relative ${isLeft ? "lg:mr-auto lg:text-left" : "lg:ml-auto lg:text-right"}`}
    >
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: "3rem", opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        className={`h-px bg-gradient-to-r from-petal-secondary/30 to-transparent mb-5 ${isLeft ? "" : "ml-auto bg-gradient-to-l"}`}
      />

      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 0.12, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.05 }}
        className={`hidden lg:block font-serif-elegant text-7xl text-cream-light/10 leading-none mb-2 ${isLeft ? "" : "text-right"}`}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>
      <p className="font-serif-elegant text-lg md:text-xl lg:text-[1.35rem] leading-[1.9] text-cream-light/85">
        <StaggeredClosingWords text={text} inView={isInView} delay={0.2} />
      </p>
    </motion.div>
  );
};

interface Section5ClosingProps {
  onReplay?: () => void;
}

const Section5Closing = ({ onReplay }: Section5ClosingProps) => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const finalRef = useRef(null);
  const finalInView = useInView(finalRef, { once: true, margin: "-40px" });

  const [typewriterDone, setTypewriterDone] = useState(false);
  const [showHeartExplosion, setShowHeartExplosion] = useState(false);
  const [showFinalFrame, setShowFinalFrame] = useState(false);

  const handleTypewriterComplete = useCallback(() => {
    setTypewriterDone(true);
    setTimeout(() => setShowHeartExplosion(true), 500);
    setTimeout(() => setShowFinalFrame(true), 2000);
  }, []);

  // Parallax
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const particleY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-closing py-24 px-6 relative overflow-hidden"
    >
      <motion.div style={{ y: particleY }} className="absolute inset-0">
        <FloatingParticles />
      </motion.div>

      <motion.div
        style={{ y: glowY1 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-petal-secondary/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: glowY2 }}
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gold-soft/5 rounded-full blur-3xl"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-24 lg:mb-32"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.span
              initial={{ width: 0 }}
              animate={headerInView ? { width: "4rem" } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-px bg-petal-secondary/20 block"
            />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={headerInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
            >
              <OrnateHeart className="w-5 h-5 text-petal-secondary/50 fill-petal-secondary/20" />
            </motion.div>
            <motion.span
              initial={{ width: 0 }}
              animate={headerInView ? { width: "4rem" } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-px bg-petal-secondary/20 block"
            />
          </div>
          <h2 className="font-script text-4xl md:text-5xl lg:text-6xl text-cream-light/80">
            One Last Thing
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-4 text-xs tracking-[0.3em] uppercase text-cream-light/30"
          >
            the words I carry for you
          </motion.p>
        </motion.div>

        {/* Paragraphs */}
        {closingParagraphs.map((text, i) => (
          <ClosingParagraph key={i} text={text} index={i} isLeft={i % 2 === 0} />
        ))}

        {/* Final section with typewriter + heart explosion */}
        <motion.div
          ref={finalRef}
          initial={{ opacity: 0 }}
          animate={finalInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center mt-24 lg:mt-32 pt-12 relative"
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <motion.span
              initial={{ width: 0 }}
              animate={finalInView ? { width: "3rem" } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-px bg-petal-secondary/15 block"
            />
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={finalInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-petal-secondary/30 text-xs"
            >
              ✦
            </motion.span>
            <motion.span
              initial={{ width: 0 }}
              animate={finalInView ? { width: "3rem" } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-px bg-petal-secondary/15 block"
            />
          </div>

          {/* Typewriter */}
          <div className="relative">
            <TypewriterText text="I love you 3000." inView={finalInView} onComplete={handleTypewriterComplete} />

            {/* Heart explosion after typewriter finishes */}
            <AnimatePresence>
              {showHeartExplosion && <HeartExplosion />}
            </AnimatePresence>
          </div>

          {/* Big heart that pulses after typewriter */}
          <AnimatePresence>
            {typewriterDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1] }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="mt-10"
              >
                <OrnateHeart className="w-8 h-8 mx-auto text-petal-secondary/50 fill-petal-secondary/25" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* "forever yours" text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={finalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 2, delay: 4.5 }}
            className="mt-16 text-xs tracking-[0.4em] uppercase text-cream-light/20"
          >
            — forever yours —
          </motion.p>

          {/* Flower garden growing from bottom */}
          <AnimatePresence>
            {showFinalFrame && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="mt-12"
              >
                <FlowerGarden />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Replay button + Screenshot frame */}
          <AnimatePresence>
            {showFinalFrame && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.5 }}
                className="mt-16 space-y-8"
              >
                {/* Screenshot-friendly frame */}
                <div className="relative mx-auto max-w-sm py-8 px-6 rounded-2xl border border-petal-secondary/10 bg-gradient-to-b from-walnut-deep/20 to-transparent backdrop-blur-sm">
                  <p className="font-script text-2xl md:text-3xl text-cream-light/60 mb-2">
                    Happy Birthday
                  </p>
                  <p className="text-xs tracking-[0.3em] uppercase text-cream-light/25 mb-4">
                    July 18, 2007
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-8 h-px bg-petal-secondary/15" />
                    <OrnateHeart className="w-3 h-3 text-petal-secondary/30 fill-petal-secondary/15" />
                    <span className="w-8 h-px bg-petal-secondary/15" />
                  </div>
                </div>

                {/* Replay button */}
                {onReplay && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onReplay}
                    className="mx-auto flex items-center gap-2 px-6 py-3 rounded-full border border-cream-light/10 bg-cream-light/5 backdrop-blur-sm text-cream-light/40 hover:text-cream-light/70 hover:border-cream-light/20 transition-all duration-300 text-sm tracking-wider"
                  >
                    <ReplayOrnate className="w-4 h-4" />
                    From the beginning
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Section5Closing;
