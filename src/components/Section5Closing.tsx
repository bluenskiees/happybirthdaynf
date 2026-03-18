import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";

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

/* Staggered word reveal for closing paragraphs */
const StaggeredClosingWords = ({ text, inView, delay = 0 }: { text: string; inView: boolean; delay?: number }) => {
  const words = text.split(" ");

  return (
    <span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.35,
            delay: delay + i * 0.035,
            ease: "easeOut",
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

/* Typewriter effect for "I love you 300." */
const TypewriterText = ({ text, inView }: { text: string; inView: boolean }) => {
  const [displayedChars, setDisplayedChars] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedChars((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 80);
      return () => clearInterval(interval);
    }, 800);

    return () => clearTimeout(timer);
  }, [inView, text.length]);

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

  // Varied animations per paragraph
  const animVariants = [
    { x: -30, y: 20, scale: 0.98 },   // slide left + scale
    { x: 30, y: 20, scale: 0.98 },    // slide right + scale
    { x: 0, y: 40, scale: 0.95 },     // fade up deep + scale
    { x: -20, y: 15, scale: 1 },      // slight left
    { x: 20, y: 15, scale: 1 },       // slight right
    { x: 0, y: 30, scale: 0.97 },     // gentle rise
  ];

  const initial = animVariants[index % animVariants.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initial }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
      className={`mb-12 last:mb-0 lg:max-w-xl ${isLeft ? "lg:mr-auto lg:text-left" : "lg:ml-auto lg:text-right"}`}
    >
      {/* Paragraph number - desktop only */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 0.15, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className={`hidden lg:block font-serif-elegant text-7xl text-cream-light/10 leading-none mb-2 ${isLeft ? "" : "text-right"}`}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>
      <p className="font-serif-elegant text-lg md:text-xl lg:text-[1.35rem] leading-relaxed text-cream-light/85">
        <StaggeredClosingWords text={text} inView={isInView} delay={0.2} />
      </p>
    </motion.div>
  );
};

const Section5Closing = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const finalRef = useRef(null);
  const finalInView = useInView(finalRef, { once: true, margin: "-40px" });

  // Parallax for ambient glow spots
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

      {/* Ambient glow spots with parallax */}
      <motion.div
        style={{ y: glowY1 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-petal-secondary/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: glowY2 }}
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gold-soft/5 rounded-full blur-3xl"
      />

      {/* Cinematic wide container for desktop */}
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
              <Heart className="w-5 h-5 text-petal-secondary/50 fill-petal-secondary/20" />
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

        {/* Paragraphs - alternating sides on desktop */}
        {closingParagraphs.map((text, i) => (
          <ClosingParagraph key={i} text={text} index={i} isLeft={i % 2 === 0} />
        ))}

        {/* Final "I love you 300" with typewriter */}
        <motion.div
          ref={finalRef}
          initial={{ opacity: 0 }}
          animate={finalInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center mt-24 lg:mt-32 pt-12"
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

          <TypewriterText text="I love you 300." inView={finalInView} />

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={finalInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.5, delay: 3.5, type: "spring" }}
            className="mt-10"
          >
            <Heart className="w-7 h-7 mx-auto text-petal-secondary/40 fill-petal-secondary/20" />
          </motion.div>

          {/* Final ambient text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={finalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 2, delay: 4.5 }}
            className="mt-16 text-xs tracking-[0.4em] uppercase text-cream-light/20"
          >
            — forever yours —
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Section5Closing;
