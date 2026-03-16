import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GoldenDustParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  driftX: number;
  driftY: number;
}

const GoldenDustEffect = ({ trigger }: { trigger: boolean }) => {
  const [show, setShow] = useState(false);

  const particles: GoldenDustParticle[] = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1.5,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.5 + 0.2,
      driftX: Math.random() * 60 - 30,
      driftY: Math.random() * -80 - 20,
    }));
  }, []);

  useEffect(() => {
    if (trigger) {
      setShow(true);
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {show && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, p.opacity, p.opacity * 0.6, 0],
                scale: [0, 1, 0.8, 0],
                x: p.driftX,
                y: p.driftY,
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 3 + 1,
                ease: "easeInOut",
              }}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: `radial-gradient(circle, hsl(38 50% 75%), hsl(38 45% 70% / 0.3))`,
                boxShadow: `0 0 ${p.size * 3}px hsl(38 45% 70% / 0.4)`,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default GoldenDustEffect;
