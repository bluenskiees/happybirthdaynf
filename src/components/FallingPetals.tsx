import { useMemo } from "react";

interface FallingPetalsProps {
  count?: number;
}

const FallingPetals = ({ count = 18 }: FallingPetalsProps) => {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const isPrimary = i % 3 !== 0;
      const size = 8 + Math.random() * 8;
      const left = Math.random() * 100;
      const delay = Math.random() * 12;
      const duration = 10 + Math.random() * 8;
      const rotation = Math.random() * 360;

      return {
        id: i,
        isPrimary,
        size,
        left,
        delay,
        duration,
        rotation,
      };
    });
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            backgroundColor: petal.isPrimary
              ? "hsl(var(--petal-primary))"
              : "hsl(var(--petal-secondary))",
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            transform: `rotate(${petal.rotation}deg)`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

export default FallingPetals;
