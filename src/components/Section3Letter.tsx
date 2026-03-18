import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const letterSections = [
  {
    label: "Opening",
    text: "I feel like birthdays aren't just about growing older. They're about everything you've been through to get here. And today, I just want you to know that I see you.",
  },
  {
    label: "About You",
    text: "I see how caring you are, how aware you are of the smallest things about me. I realized how patient you've been, even when I'm not easy to deal with. You carry yourself with so much maturity, yet somehow, you still let yourself be soft with me.",
  },
  {
    label: "Your Childlike Side",
    text: "And I love that part of you that only I get to see. When you act like a little kid around me, when your voice sounds lighter, it's the part of you that makes me feel calm, especially when I'm tired. Without you even trying, you make things feel lighter.",
  },
  {
    label: "When You're Tired",
    text: "I know when you're tired, you can get quiet, or a little grumpy, sometimes even scary like a small angry weasel. But I also know that sometimes, you become soft and clingy just to feel okay again. And I understand that side of you. I really do.",
  },
  {
    label: "About Us",
    text: "When we found our way back to each other on October 20th, 2025, I realized something had changed in me. Starting college made me think differently, and this time, I didn't want to repeat the past. I wanted to be serious about you. We've had so many struggles, but I chose to stay. And I still do.",
  },
  {
    label: "Birthday Wish",
    text: "This birthday is special to me. I hope in this new year, you grow even more, reach all the goals you've been working so hard for, and no matter how much you grow, I hope you'll always feel safe being a child with me.",
  },
];

/* Staggered word-by-word reveal */
const StaggeredWords = ({ text, inView, delay = 0 }: { text: string; inView: boolean; delay?: number }) => {
  const words = text.split(" ");

  return (
    <span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.04,
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

const LetterParagraph = ({
  section,
  index,
}: {
  section: (typeof letterSections)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Alternate slide direction for variety
  const slideVariants = [
    { x: 0, y: 30 },      // fade up
    { x: -20, y: 20 },    // slide from left
    { x: 20, y: 20 },     // slide from right
    { x: 0, y: 30 },      // fade up
    { x: -20, y: 20 },    // slide from left
    { x: 0, y: 40 },      // deeper fade up
  ];

  const initialPos = slideVariants[index % slideVariants.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initialPos }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="mb-10 last:mb-0"
    >
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xs tracking-[0.25em] uppercase text-stone-warm mb-3 font-body"
      >
        {section.label}
      </motion.p>
      <p className="font-serif-elegant text-lg md:text-xl lg:text-[1.35rem] leading-relaxed text-walnut-deep/90">
        {index === 0 ? (
          <>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
              className="font-script text-5xl lg:text-6xl float-left mr-3 mt-1 leading-none text-walnut inline-block"
            >
              {section.text.charAt(0)}
            </motion.span>
            <StaggeredWords text={section.text.slice(1)} inView={isInView} delay={0.4} />
          </>
        ) : (
          <StaggeredWords text={section.text} inView={isInView} delay={0.3} />
        )}
      </p>
    </motion.div>
  );
};

/* Wax Seal Component */
const WaxSeal = () => (
  <div className="relative w-16 h-16 md:w-20 md:h-20">
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-petal-secondary via-walnut to-walnut-deep shadow-lg" />
    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-petal-secondary/80 to-walnut shadow-inner" />
    <div className="absolute inset-0 flex items-center justify-center">
      <Heart className="w-6 h-6 md:w-7 md:h-7 text-cream-light/80 fill-cream-light/30" />
    </div>
    <div className="absolute -bottom-1 left-3 w-3 h-4 bg-walnut rounded-b-full" />
    <div className="absolute -bottom-0.5 right-4 w-2 h-3 bg-walnut-deep rounded-b-full" />
  </div>
);

/* Enhanced Envelope with 3D flap opening */
const EnvelopeOpening = ({ onOpen }: { onOpen: () => void }) => {
  const [phase, setPhase] = useState<"idle" | "opening" | "letter-out" | "done">("idle");

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    // Flap opens
    setTimeout(() => setPhase("letter-out"), 700);
    // Letter slides out then transition
    setTimeout(() => onOpen(), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: -60 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center min-h-screen bg-gradient-letter px-6"
    >
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xs tracking-[0.3em] uppercase text-stone-warm mb-8"
        >
          You have a letter
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative cursor-pointer group"
          onClick={handleClick}
          style={{ perspective: "800px" }}
        >
          {/* Envelope body */}
          <div className="relative w-72 md:w-96 lg:w-[28rem] aspect-[4/3] mx-auto">
            {/* Envelope back */}
            <div className="absolute inset-0 bg-gradient-to-b from-greige to-secondary rounded-lg shadow-warm border border-petal-primary/20" />

            {/* Envelope flap (top triangle) - 3D rotateX animation */}
            <motion.div
              className="absolute -top-0.5 left-0 right-0 z-20"
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
              }}
              animate={
                phase === "opening" || phase === "letter-out" || phase === "done"
                  ? { rotateX: 180 }
                  : {}
              }
              whileHover={phase === "idle" ? { rotateX: 20 } : {}}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
              <div
                className="w-full aspect-[2/1] bg-gradient-to-b from-secondary to-greige border border-petal-primary/20 rounded-t-lg"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  backfaceVisibility: "hidden",
                }}
              />
              {/* Back side of flap */}
              <div
                className="absolute inset-0 w-full aspect-[2/1] bg-gradient-to-b from-greige/80 to-petal-primary/40"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  backfaceVisibility: "hidden",
                  transform: "rotateX(180deg)",
                }}
              />
            </motion.div>

            {/* Inner letter that slides out */}
            <motion.div
              className="absolute inset-x-4 top-6 bottom-4 bg-cream-light rounded border border-petal-primary/15 z-10 shadow-md"
              animate={
                phase === "letter-out" || phase === "done"
                  ? { y: -80, scale: 1.02 }
                  : {}
              }
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 18,
                delay: 0.1,
              }}
            >
              <div className="p-4 space-y-2.5">
                <div className="h-2 bg-walnut/12 rounded w-3/4" />
                <div className="h-2 bg-walnut/8 rounded w-full" />
                <div className="h-2 bg-walnut/6 rounded w-2/3" />
                <div className="h-2 bg-walnut/5 rounded w-4/5 mt-3" />
                <div className="h-2 bg-walnut/4 rounded w-1/2" />
              </div>
              {/* Subtle golden glow when emerging */}
              {(phase === "letter-out" || phase === "done") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded bg-gradient-to-t from-gold-soft/10 to-transparent pointer-events-none"
                />
              )}
            </motion.div>

            {/* Wax seal - breaks apart on open */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30"
              animate={
                phase === "opening" || phase === "letter-out" || phase === "done"
                  ? { scale: 0, opacity: 0, rotate: 45 }
                  : {}
              }
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <WaxSeal />
            </motion.div>
          </div>

          {/* Tap text */}
          <AnimatePresence>
            {phase === "idle" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 2, repeat: Infinity },
                }}
                className="mt-14 text-xs tracking-[0.3em] uppercase text-stone-warm group-hover:text-walnut transition-colors"
              >
                Tap to open ✦
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Section3Letter = () => {
  const [isOpened, setIsOpened] = useState(false);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  // Parallax for decorative elements
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const decorY1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const decorY3 = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section className="bg-gradient-letter" ref={sectionRef}>
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 0.85, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            <EnvelopeOpening onOpen={() => setIsOpened(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="py-20 px-6"
          >
            <div className="max-w-6xl mx-auto flex gap-12 lg:gap-20">
              {/* Left decorative column — desktop only + parallax */}
              <div className="hidden lg:flex flex-col items-center justify-start pt-32 w-24 shrink-0">
                <motion.div style={{ y: decorY1 }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "8rem" }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="w-px bg-gradient-to-b from-transparent via-petal-secondary/30 to-transparent mb-8"
                  />
                  <WaxSeal />
                </motion.div>
                <motion.div style={{ y: decorY2 }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "12rem" }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="w-px bg-gradient-to-b from-transparent via-petal-secondary/20 to-transparent mt-8"
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="font-script text-xl text-walnut/30 mt-8 [writing-mode:vertical-rl] rotate-180"
                  >
                    for you, with love
                  </motion.p>
                </motion.div>
              </div>

              {/* Main letter content */}
              <div className="flex-1 max-w-2xl">
                {/* Header */}
                <motion.div
                  ref={headerRef}
                  initial={{ opacity: 0, y: 40 }}
                  animate={headerInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="text-center lg:text-left mb-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={headerInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="lg:hidden"
                  >
                    <Heart className="w-8 h-8 mx-auto mb-4 text-petal-secondary fill-petal-secondary/30" />
                  </motion.div>
                  <h2 className="font-script text-4xl md:text-5xl lg:text-6xl text-walnut-deep mb-3">
                    A Letter for You
                  </h2>
                  <p className="text-xs tracking-[0.3em] uppercase text-stone-warm">
                    Read it slowly ✦ feel every word
                  </p>
                </motion.div>

                {/* Letter paper */}
                <div className="relative">
                  <div className="absolute -inset-4 md:-inset-8 bg-cream-light/50 rounded-2xl border border-petal-primary/20 shadow-warm" />

                  <div className="relative bg-cream-light/80 rounded-xl p-8 md:p-12 lg:p-16">
                    {/* Top decorative line */}
                    <div className="flex items-center gap-3 mb-10">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="flex-1 h-px bg-petal-secondary/20 block"
                      />
                      <motion.span
                        initial={{ opacity: 0, rotate: 0 }}
                        whileInView={{ opacity: 1, rotate: 360 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-petal-secondary/40 text-xs"
                      >
                        ✦
                      </motion.span>
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="flex-1 h-px bg-petal-secondary/20 block"
                      />
                    </div>

                    {letterSections.map((section, i) => (
                      <LetterParagraph key={i} section={section} index={i} />
                    ))}

                    {/* Bottom decorative line */}
                    <div className="flex items-center gap-3 mt-12">
                      <span className="flex-1 h-px bg-petal-secondary/20" />
                      <span className="text-petal-secondary/40 text-xs">✦</span>
                      <span className="flex-1 h-px bg-petal-secondary/20" />
                    </div>

                    {/* Signature */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="text-right mt-8"
                    >
                      <p className="font-script text-2xl md:text-3xl text-walnut">
                        With all my love
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Right decorative column — desktop only + parallax */}
              <div className="hidden lg:flex flex-col items-center justify-end pb-32 w-24 shrink-0">
                <motion.div style={{ y: decorY3 }}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="font-script text-lg text-walnut/20 [writing-mode:vertical-rl]"
                  >
                    07 · 17 · 2007
                  </motion.div>
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "6rem" }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="w-px bg-gradient-to-b from-petal-secondary/20 to-transparent mt-6"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Section3Letter;
