import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Realistic blooming flower (rose/peony style):
 * - Layered curved petal paths (not ellipses) so it actually looks like a flower
 * - Outer ring petals + mid ring + tight inner cluster
 * - Stamens / pollen dots in the center
 * - Calyx (green base) under the bloom
 */
const Flower = ({
  x,
  delay,
  stemHeight,
  petalColor,
  centerColor,
  size,
  variant,
  leafSide,
}: {
  x: number;
  delay: number;
  stemHeight: number;
  petalColor: string;
  centerColor: string;
  size: number;
  variant: "rose" | "daisy" | "peony";
  leafSide: "left" | "right" | "both" | "none";
}) => {
  const stemCurve = useMemo(() => (Math.random() - 0.5) * 4, []);
  const wobble = useMemo(() => (Math.random() - 0.5) * 8, []);

  // A single curved petal shape, drawn pointing UP from origin
  // Uses cubic bezier to create a teardrop/petal silhouette
  const petalPath = (s: number) =>
    `M 0 0
     C ${-s * 0.55} ${-s * 0.25}, ${-s * 0.45} ${-s * 0.85}, 0 ${-s}
     C ${s * 0.45} ${-s * 0.85}, ${s * 0.55} ${-s * 0.25}, 0 0 Z`;

  const outerCount = variant === "daisy" ? 8 : variant === "rose" ? 6 : 7;
  const midCount = variant === "daisy" ? 0 : 5;
  const innerCount = variant === "rose" ? 4 : variant === "peony" ? 5 : 0;

  return (
    <g transform={`translate(${x}, 0)`}>
      {/* Stem with gentle curve */}
      <motion.path
        d={`M 0 0 Q ${stemCurve} ${-stemHeight * 0.5} 0 ${-stemHeight}`}
        stroke="hsl(135 35% 32% / 0.65)"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.3, delay, ease: "easeOut" }}
      />

      {/* Leaves - real leaf silhouette (almond shape with vein) */}
      {(leafSide === "left" || leafSide === "both") && (
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: delay + 0.7, ease: "easeOut" }}
          style={{ transformOrigin: `0px ${-stemHeight * 0.4}px` }}
        >
          <path
            d={`M 0 ${-stemHeight * 0.4}
                C -4 ${-stemHeight * 0.4 - 4}, -11 ${-stemHeight * 0.4 - 6}, -14 ${-stemHeight * 0.4 - 2}
                C -12 ${-stemHeight * 0.4 + 2}, -5 ${-stemHeight * 0.4 + 3}, 0 ${-stemHeight * 0.4} Z`}
            fill="hsl(135 35% 35% / 0.55)"
          />
          <path
            d={`M 0 ${-stemHeight * 0.4} L -12 ${-stemHeight * 0.4 - 1.5}`}
            stroke="hsl(135 35% 25% / 0.4)"
            strokeWidth="0.4"
            fill="none"
          />
        </motion.g>
      )}
      {(leafSide === "right" || leafSide === "both") && (
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: delay + 0.85, ease: "easeOut" }}
          style={{ transformOrigin: `0px ${-stemHeight * 0.6}px` }}
        >
          <path
            d={`M 0 ${-stemHeight * 0.6}
                C 4 ${-stemHeight * 0.6 - 4}, 11 ${-stemHeight * 0.6 - 6}, 14 ${-stemHeight * 0.6 - 2}
                C 12 ${-stemHeight * 0.6 + 2}, 5 ${-stemHeight * 0.6 + 3}, 0 ${-stemHeight * 0.6} Z`}
            fill="hsl(135 35% 35% / 0.5)"
          />
          <path
            d={`M 0 ${-stemHeight * 0.6} L 12 ${-stemHeight * 0.6 - 1.5}`}
            stroke="hsl(135 35% 25% / 0.4)"
            strokeWidth="0.4"
            fill="none"
          />
        </motion.g>
      )}

      {/* Flower head — anchored at top of stem with gentle natural wobble */}
      <g transform={`translate(${wobble * 0.15}, ${-stemHeight})`}>
        {/* Calyx (green sepal cup behind petals) */}
        <motion.path
          d={`M ${-size * 0.55} ${size * 0.2}
              C ${-size * 0.4} ${-size * 0.1}, ${size * 0.4} ${-size * 0.1}, ${size * 0.55} ${size * 0.2}
              C ${size * 0.3} ${size * 0.4}, ${-size * 0.3} ${size * 0.4}, ${-size * 0.55} ${size * 0.2} Z`}
          fill="hsl(135 35% 32% / 0.55)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 1.0, ease: "easeOut" }}
        />

        {/* OUTER PETALS — bloom outward */}
        {Array.from({ length: outerCount }, (_, i) => {
          const angle = (i / outerCount) * 360 + (Math.random() - 0.5) * 6;
          return (
            <motion.path
              key={`outer-${i}`}
              d={petalPath(size * 1.1)}
              fill={petalColor}
              opacity={0.85}
              initial={{ scale: 0, rotate: angle, opacity: 0 }}
              animate={{ scale: 1, rotate: angle, opacity: 0.85 }}
              transition={{
                duration: 0.7,
                delay: delay + 1.2 + i * 0.07,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{ transformOrigin: "0 0", transformBox: "fill-box" }}
            />
          );
        })}

        {/* MIDDLE LAYER — slightly smaller, offset, darker shade */}
        {Array.from({ length: midCount }, (_, i) => {
          const angle = (i / midCount) * 360 + 360 / outerCount / 2;
          return (
            <motion.path
              key={`mid-${i}`}
              d={petalPath(size * 0.8)}
              fill={petalColor}
              opacity={0.95}
              initial={{ scale: 0, rotate: angle, opacity: 0 }}
              animate={{ scale: 1, rotate: angle, opacity: 0.95 }}
              transition={{
                duration: 0.6,
                delay: delay + 1.7 + i * 0.06,
                ease: "easeOut",
              }}
              style={{
                transformOrigin: "0 0",
                transformBox: "fill-box",
                filter: "brightness(0.92)",
              }}
            />
          );
        })}

        {/* INNER PETALS — tight cluster (rose/peony heart) */}
        {Array.from({ length: innerCount }, (_, i) => {
          const angle = (i / innerCount) * 360 + 30;
          return (
            <motion.path
              key={`inner-${i}`}
              d={petalPath(size * 0.5)}
              fill={petalColor}
              initial={{ scale: 0, rotate: angle, opacity: 0 }}
              animate={{ scale: 1, rotate: angle, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: delay + 2.1 + i * 0.05,
                ease: "easeOut",
              }}
              style={{
                transformOrigin: "0 0",
                transformBox: "fill-box",
                filter: "brightness(0.82)",
              }}
            />
          );
        })}

        {/* Center disc (pistil base) */}
        <motion.circle
          cx="0"
          cy="0"
          r={size * 0.22}
          fill={centerColor}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 2.4, type: "spring", stiffness: 200 }}
        />

        {/* Stamen pollen dots around center */}
        {variant === "daisy" &&
          Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <motion.circle
                key={`dot-${i}`}
                cx={Math.cos(a) * size * 0.14}
                cy={Math.sin(a) * size * 0.14}
                r={size * 0.05}
                fill="hsl(45 70% 55%)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: delay + 2.5 + i * 0.02 }}
              />
            );
          })}

        {/* Tiny highlight on petal for dimensional shine */}
        <motion.circle
          cx={-size * 0.05}
          cy={-size * 0.08}
          r={size * 0.08}
          fill="white"
          opacity={0.25}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 2.6 }}
        />
      </g>
    </g>
  );
};

/* Small unopened bud */
const Bud = ({
  x,
  delay,
  height,
  color,
}: {
  x: number;
  delay: number;
  height: number;
  color: string;
}) => {
  const stemCurve = useMemo(() => (Math.random() - 0.5) * 3, []);

  return (
    <g transform={`translate(${x}, 0)`}>
      <motion.path
        d={`M 0 0 Q ${stemCurve} ${-height * 0.5} 0 ${-height}`}
        stroke="hsl(135 35% 32% / 0.5)"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />
      <g transform={`translate(0, ${-height})`}>
        {/* Closed teardrop bud */}
        <motion.path
          d="M 0 -7 C 3.5 -6, 4 -2, 0 1 C -4 -2, -3.5 -6, 0 -7 Z"
          fill={color}
          opacity={0.85}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.6, ease: "easeOut" }}
        />
        {/* Sepal wrapping the bottom of bud */}
        <motion.path
          d="M -3.5 0 C -3 -3, -1 -4, 0 -2 C 1 -4, 3 -3, 3.5 0 C 2 1, -2 1, -3.5 0 Z"
          fill="hsl(135 35% 30% / 0.65)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.55, ease: "easeOut" }}
        />
      </g>
    </g>
  );
};

/* Grass blades for ground texture */
const GrassBlade = ({ x, delay, height }: { x: number; delay: number; height: number }) => (
  <motion.path
    d={`M ${x} 0 Q ${x + (Math.random() - 0.5) * 2} ${-height * 0.5} ${x + (Math.random() - 0.5) * 3} ${-height}`}
    stroke="hsl(135 35% 30% / 0.4)"
    strokeWidth="0.7"
    strokeLinecap="round"
    fill="none"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 0.55 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  />
);

const FlowerGarden = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const gardenData = useMemo(() => {
    const palettes = [
      { petal: "hsl(350 55% 75%)", center: "hsl(45 70% 55%)" }, // soft pink rose
      { petal: "hsl(15 60% 72%)", center: "hsl(35 65% 50%)" },  // peach
      { petal: "hsl(38 50% 80%)", center: "hsl(35 70% 50%)" },  // cream gold
      { petal: "hsl(340 45% 78%)", center: "hsl(45 65% 55%)" }, // blush
      { petal: "hsl(20 55% 78%)", center: "hsl(40 70% 50%)" },  // warm coral
      { petal: "hsl(355 45% 70%)", center: "hsl(45 65% 50%)" }, // dusty rose
      { petal: "hsl(45 55% 82%)", center: "hsl(35 65% 50%)" },  // butter
    ];
    const variants: Array<"rose" | "daisy" | "peony"> = ["rose", "daisy", "peony", "rose", "peony"];
    const leafSides: Array<"left" | "right" | "both" | "none"> = ["left", "right", "both", "left", "right"];

    const flowers = [];
    for (let i = 0; i < 11; i++) {
      const palette = palettes[i % palettes.length];
      flowers.push({
        x: -45 + (i / 10) * 90 + (Math.random() - 0.5) * 3,
        delay: 0.1 + Math.random() * 0.9,
        stemHeight: 30 + Math.random() * 30,
        petalColor: palette.petal,
        centerColor: palette.center,
        size: 6 + Math.random() * 3,
        variant: variants[i % variants.length],
        leafSide: leafSides[i % leafSides.length],
      });
    }

    const buds = [];
    for (let i = 0; i < 9; i++) {
      const palette = palettes[Math.floor(Math.random() * palettes.length)];
      buds.push({
        x: -43 + (i / 8) * 86 + (Math.random() - 0.5) * 4,
        delay: 0.3 + Math.random() * 1.2,
        height: 14 + Math.random() * 16,
        color: palette.petal,
      });
    }

    const grass = [];
    for (let i = 0; i < 30; i++) {
      grass.push({
        x: -48 + (i / 29) * 96,
        delay: Math.random() * 0.6,
        height: 4 + Math.random() * 6,
      });
    }

    return { flowers, buds, grass };
  }, []);

  return (
    <div ref={ref} className="w-full relative" style={{ height: "150px" }}>
      {isInView && (
        <svg
          viewBox="-50 -85 100 87"
          className="w-full h-full"
          preserveAspectRatio="xMidYMax meet"
        >
          {/* Ground grass first */}
          {gardenData.grass.map((g, i) => (
            <GrassBlade key={`grass-${i}`} x={g.x} delay={g.delay} height={g.height} />
          ))}
          {/* Buds behind */}
          {gardenData.buds.map((b, i) => (
            <Bud key={`bud-${i}`} x={b.x} delay={b.delay} height={b.height} color={b.color} />
          ))}
          {/* Flowers in front */}
          {gardenData.flowers.map((f, i) => (
            <Flower
              key={`flower-${i}`}
              x={f.x}
              delay={f.delay}
              stemHeight={f.stemHeight}
              petalColor={f.petalColor}
              centerColor={f.centerColor}
              size={f.size}
              variant={f.variant}
              leafSide={f.leafSide}
            />
          ))}
        </svg>
      )}
    </div>
  );
};

export default FlowerGarden;
