import { useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* SVG Flower component - each flower grows from bottom */
const Flower = ({
  x,
  delay,
  stemHeight,
  petalColor,
  petalSize,
  leafSide,
}: {
  x: number;
  delay: number;
  stemHeight: number;
  petalColor: string;
  petalSize: number;
  leafSide: "left" | "right" | "both" | "none";
}) => {
  return (
    <g transform={`translate(${x}, 0)`}>
      {/* Stem growing up */}
      <motion.line
        x1="0" y1="0" x2="0" y2={-stemHeight}
        stroke="hsl(var(--petal-secondary))"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
      />

      {/* Leaves */}
      {(leafSide === "left" || leafSide === "both") && (
        <motion.ellipse
          cx={-6} cy={-stemHeight * 0.4}
          rx="5" ry="2.5"
          fill="hsl(var(--petal-secondary) / 0.3)"
          transform={`rotate(-35, ${-6}, ${-stemHeight * 0.4})`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.6, ease: "easeOut" }}
        />
      )}
      {(leafSide === "right" || leafSide === "both") && (
        <motion.ellipse
          cx={6} cy={-stemHeight * 0.6}
          rx="5" ry="2.5"
          fill="hsl(var(--petal-secondary) / 0.25)"
          transform={`rotate(35, ${6}, ${-stemHeight * 0.6})`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.8, ease: "easeOut" }}
        />
      )}

      {/* Flower head - petals bloom */}
      <g transform={`translate(0, ${-stemHeight})`}>
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.ellipse
            key={i}
            cx={0} cy={-petalSize * 0.6}
            rx={petalSize * 0.4}
            ry={petalSize * 0.7}
            fill={petalColor}
            transform={`rotate(${angle})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{
              duration: 0.5,
              delay: delay + 1.0 + i * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
        {/* Center */}
        <motion.circle
          cx="0" cy="0" r={petalSize * 0.25}
          fill="hsl(var(--gold-soft) / 0.6)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 1.5, type: "spring" }}
        />
      </g>
    </g>
  );
};

/* Small bud / unopened flower */
const Bud = ({ x, delay, height }: { x: number; delay: number; height: number }) => (
  <g transform={`translate(${x}, 0)`}>
    <motion.line
      x1="0" y1="0" x2="0" y2={-height}
      stroke="hsl(var(--petal-secondary) / 0.4)"
      strokeWidth="1"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.5 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    />
    <motion.ellipse
      cx="0" cy={-height}
      rx="3" ry="5"
      fill="hsl(var(--petal-secondary) / 0.35)"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: delay + 0.6, ease: "easeOut" }}
    />
  </g>
);

const FlowerGarden = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const flowers = useMemo(() => {
    const petalColors = [
      "hsl(var(--petal-secondary) / 0.5)",
      "hsl(var(--petal-primary) / 0.6)",
      "hsl(var(--gold-soft) / 0.4)",
      "hsl(var(--cream-light) / 0.4)",
      "hsl(var(--petal-secondary) / 0.6)",
    ];
    const leafSides: Array<"left" | "right" | "both" | "none"> = ["left", "right", "both", "none"];

    // Generate flowers spread across the width
    const items: Array<{
      type: "flower" | "bud";
      x: number;
      delay: number;
      stemHeight: number;
      petalColor: string;
      petalSize: number;
      leafSide: "left" | "right" | "both" | "none";
    }> = [];

    // Main flowers - spread from -48% to +48%
    for (let i = 0; i < 15; i++) {
      const x = -48 + (i / 14) * 96;
      items.push({
        type: "flower",
        x: x + (Math.random() - 0.5) * 4,
        delay: 0.1 + Math.random() * 1.2,
        stemHeight: 35 + Math.random() * 40,
        petalColor: petalColors[i % petalColors.length],
        petalSize: 6 + Math.random() * 5,
        leafSide: leafSides[i % leafSides.length],
      });
    }

    // Buds filling gaps
    for (let i = 0; i < 12; i++) {
      items.push({
        type: "bud",
        x: -46 + (i / 11) * 92 + (Math.random() - 0.5) * 6,
        delay: 0.3 + Math.random() * 1.5,
        stemHeight: 20 + Math.random() * 25,
        petalColor: "",
        petalSize: 0,
        leafSide: "none",
      });
    }

    return items;
  }, []);

  return (
    <div ref={ref} className="w-full relative" style={{ height: "120px" }}>
      {isInView && (
        <svg
          viewBox="-50 -80 100 82"
          className="w-full h-full"
          preserveAspectRatio="xMidYMax meet"
        >
          {flowers.map((f, i) =>
            f.type === "flower" ? (
              <Flower
                key={`flower-${i}`}
                x={f.x}
                delay={f.delay}
                stemHeight={f.stemHeight}
                petalColor={f.petalColor}
                petalSize={f.petalSize}
                leafSide={f.leafSide}
              />
            ) : (
              <Bud key={`bud-${i}`} x={f.x} delay={f.delay} height={f.stemHeight} />
            )
          )}
        </svg>
      )}
    </div>
  );
};

export default FlowerGarden;
