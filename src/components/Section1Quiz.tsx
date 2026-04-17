import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OrnateHeart, Sparkle4 } from "./icons/DecorativeIcons";
import FallingPetals from "./FallingPetals";

interface Section1QuizProps {
  onComplete: () => void;
}

const Section1Quiz = ({ onComplete }: Section1QuizProps) => {
  const [stage, setStage] = useState<"intro" | "q1" | "q2" | "done">("intro");
  const [wrongPos1, setWrongPos1] = useState({ x: 0, y: 0 });
  const [wrongPos2, setWrongPos2] = useState({ x: 0, y: 0 });
  const [showCorrectEffect, setShowCorrectEffect] = useState(false);

  const getRandomPosition = useCallback(() => {
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 150;
    return { x, y };
  }, []);

  const handleWrongHover1 = () => {
    setWrongPos1(getRandomPosition());
  };

  const handleWrongHover2 = () => {
    setWrongPos2(getRandomPosition());
  };

  const handleCorrect = (nextStage: "q2" | "done") => {
    setShowCorrectEffect(true);
    setTimeout(() => {
      setShowCorrectEffect(false);
      if (nextStage === "done") {
        onComplete();
      } else {
        setStage(nextStage);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-gradient-warm flex items-center justify-center overflow-hidden">
      <FallingPetals count={14} />

      {/* Correct answer sparkle effect */}
      <AnimatePresence>
        {showCorrectEffect && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 3, opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <Sparkles className="w-20 h-20 text-gold-soft" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 w-full max-w-lg mx-auto px-6">
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {stage === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <Heart className="w-10 h-10 mx-auto mb-6 text-petal-secondary fill-petal-secondary" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm tracking-[0.3em] uppercase text-stone-warm mb-4"
              >
                Before you enter...
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="font-script text-4xl md:text-5xl text-walnut-deep mb-4"
              >
                I have something for you
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="font-serif-elegant text-lg text-muted-foreground mb-8 italic"
              >
                But first, answer a few questions honestly, okay?
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-xs tracking-wider text-stone-warm mb-8"
              >
                ✦ don't try to lie ✦
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                onClick={() => setStage("q1")}
                className="px-8 py-3 rounded-full bg-walnut text-primary-foreground font-medium text-sm tracking-wider hover:opacity-90 transition-opacity shadow-warm"
              >
                I'm Ready
              </motion.button>
            </motion.div>
          )}

          {/* QUESTION 1 */}
          {stage === "q1" && (
            <motion.div
              key="q1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <span className="text-xs tracking-[0.25em] uppercase text-stone-warm">
                  Question 1 of 2
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif-elegant text-2xl md:text-3xl text-walnut-deep mb-3 font-medium"
              >
                "Kamu sayang aku nggak?"
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-script text-lg text-petal-secondary mb-10"
              >
                Choose wisely... your heart already knows the answer 💕
              </motion.p>

              <div className="flex items-center justify-center gap-6 relative min-h-[80px]">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => handleCorrect("q2")}
                  className="px-10 py-3 rounded-full bg-walnut text-primary-foreground font-medium tracking-wider shadow-warm hover:shadow-petal transition-all"
                >
                  Ya ❤️
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: 1,
                    x: wrongPos1.x,
                    y: wrongPos1.y,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  onMouseEnter={handleWrongHover1}
                  onTouchStart={handleWrongHover1}
                  className="px-10 py-3 rounded-full border-2 border-stone-warm text-stone-warm font-medium tracking-wider hover:cursor-not-allowed transition-colors"
                >
                  Tidak
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* QUESTION 2 */}
          {stage === "q2" && (
            <motion.div
              key="q2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <span className="text-xs tracking-[0.25em] uppercase text-stone-warm">
                  Question 2 of 2
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif-elegant text-2xl md:text-3xl text-walnut-deep mb-3 font-medium"
              >
                "Tempat paling aku suka dimana?"
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-script text-lg text-petal-secondary mb-10"
              >
                Think about where my smile shines the brightest ☕
              </motion.p>

              <div className="flex items-center justify-center gap-6 relative min-h-[80px]">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => handleCorrect("done")}
                  className="px-10 py-3 rounded-full bg-walnut text-primary-foreground font-medium tracking-wider shadow-warm hover:shadow-petal transition-all"
                >
                  Kopken ☕
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: 1,
                    x: wrongPos2.x,
                    y: wrongPos2.y,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  onMouseEnter={handleWrongHover2}
                  onTouchStart={handleWrongHover2}
                  className="px-10 py-3 rounded-full border-2 border-stone-warm text-stone-warm font-medium tracking-wider hover:cursor-not-allowed transition-colors"
                >
                  Sama aku
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-petal-secondary/30 rounded-tl-lg" />
      <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-petal-secondary/30 rounded-tr-lg" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-petal-secondary/30 rounded-bl-lg" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-petal-secondary/30 rounded-br-lg" />
    </div>
  );
};

export default Section1Quiz;
