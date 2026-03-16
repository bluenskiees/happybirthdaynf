import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
  duration: number;
  swayAmount: number;
  shape: "square" | "rect" | "circle";
}

const COLORS = [
  "hsl(38 45% 70%)",    // gold-soft
  "hsl(30 30% 86%)",    // petal-primary
  "hsl(40 30% 97%)",    // cream-light
  "hsl(30 35% 64%)",    // petal-secondary
  "hsl(35 25% 94%)",    // cream
  "hsl(0 0% 100%)",     // white
  "hsl(38 60% 75%)",    // bright gold
  "hsl(30 22% 50%)",    // walnut-ish
];

const ConfettiEffect = ({ trigger }: { trigger: boolean }) => {
  const [show, setShow] = useState(false);

  const pieces: ConfettiPiece[] = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 720 - 360,
      delay: Math.random() * 0.8,
      duration: Math.random() * 2 + 2.5,
      swayAmount: Math.random() * 200 - 100,
      shape: (["square", "rect", "circle"] as const)[Math.floor(Math.random() * 3)],
    }));
  }, []);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{
                x: `${piece.x}vw`,
                y: "-5vh",
                rotate: 0,
                opacity: 1,
                scale: 0,
              }}
              animate={{
                y: "110vh",
                x: `calc(${piece.x}vw + ${piece.swayAmount}px)`,
                rotate: piece.rotation,
                opacity: [0, 1, 1, 1, 0],
                scale: [0, 1.2, 1, 1, 0.5],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                position: "absolute",
                width: piece.shape === "rect" ? piece.size * 0.5 : piece.size,
                height: piece.shape === "rect" ? piece.size * 1.5 : piece.size,
                backgroundColor: piece.color,
                borderRadius: piece.shape === "circle" ? "50%" : piece.shape === "rect" ? "1px" : "2px",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfettiEffect;
