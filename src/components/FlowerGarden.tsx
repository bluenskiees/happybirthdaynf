import { useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* Realistic SVG Flower with proper petals */
const Flower = ({
  x,
  delay,
  stemHeight,
  petalColor,
  petalSize,
  petalCount,
  leafSide,
}: {
  x: number;
  delay: number;
  stemHeight: number;
  petalColor: string;
  petalSize: number;
  petalCount: number;
  leafSide: "left" | "right" | "both" | "none";
}) => {
  const petals = Array.from({ length: petalCount }, (_, i) => {
    const angle = (i / petalCount) * 360;
    return angle;
  });

  return (
    <g transform={`translate(${x}, 0)`}>
      {/* Stem - curved slightly for natural look */}
      <motion.path
        d={`M 0 0 Q ${(Math.random() - 0.5) * 6} ${-stemHeight * 0.5} 0 ${-stemHeight}`}
        stroke="hsl(120 25% 35% / 0.5)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay, ease: "easeOut" }}
      />

      {/* Leaves */}
      {(leafSide === "left" || leafSide === "both") && (
        <motion.path
          d={`M 0 ${-stemHeight * 0.35} Q -10 ${-stemHeight * 0.35 - 8} -14 ${-stemHeight * 0.35 - 2} Q -10 ${-stemHeight * 0.35 + 4} 0 ${-stemHeight * 0.35}`}
          fill="hsl(120 25% 35% / 0.3)"
          stroke="hsl(120 25% 30% / 0.2)"
          strokeWidth="0.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.7, ease: "easeOut" }}
        />
      )}
      {(leafSide === "right" || leafSide === "both") && (
        <motion.path
          d={`M 0 ${-stemHeight * 0.55} Q 10 ${-stemHeight * 0.55 - 8} 14 ${-stemHeight * 0.55 - 2} Q 10 ${-stemHeight * 0.55 + 4} 0 ${-stemHeight * 0.55}`}
          fill="hsl(120 25% 35% / 0.25)"
          stroke="hsl(120 25% 30% / 0.15)"
          strokeWidth="0.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.9, ease: "easeOut" }}
        />
      )}

      {/* Flower head - realistic petal shapes */}
      <g transform={`translate(0, ${-stemHeight})`}>
        {petals.map((angle, i) => (
          <motion.path
            key={i}
            d={`M 0 0 
               C ${petalSize * 0.3} ${-petalSize * 0.2}, 
                 ${petalSize * 0.5} ${-petalSize * 0.8}, 
                 0 ${-petalSize * 1.1}
               C ${-petalSize * 0.5} ${-petalSize * 0.8}, 
                 ${-petalSize * 0.3} ${-petalSize * 0.2}, 
                 0 0`}
            fill={petalColor}
            stroke={petalColor.replace(/[\d.]+\)$/, "0.3)")}
            strokeWidth="0.3"
            transform={`rotate(${angle})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{
              duration: 0.6,
              delay: delay + 1.1 + i * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}

        {/* Inner petals - smaller, slightly different color */}
        {petalCount >= 5 && petals.slice(0, Math.ceil(petalCount / 2)).map((angle, i) => (
          <motion.path
            key={`inner-${i}`}
            d={`M 0 0 
               C ${petalSize * 0.15} ${-petalSize * 0.1}, 
                 ${petalSize * 0.25} ${-petalSize * 0.4}, 
                 0 ${-petalSize * 0.55}
               C ${-petalSize * 0.25} ${-petalSize * 0.4}, 
                 ${-petalSize * 0.15} ${-petalSize * 0.1}, 
                 0 0`}
            fill={petalColor.replace(/[\d.]+\)$/, "0.5)")}
            transform={`rotate(${angle + 360 / petalCount / 2})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{
              duration: 0.5,
              delay: delay + 1.4 + i * 0.08,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Center - pistil */}
        <motion.circle
          cx="0" cy="0" r={petalSize * 0.2}
          fill="hsl(38 45% 60% / 0.7)"
          stroke="hsl(38 45% 50% / 0.3)"
          strokeWidth="0.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 1.8, type: "spring" }}
        />
        {/* Tiny dots on center for texture */}
        {[0, 72, 144, 216, 288].map((a, i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={Math.cos((a * Math.PI) / 180) * petalSize * 0.1}
            cy={Math.sin((a * Math.PI) / 180) * petalSize * 0.1}
            r={0.6}
            fill="hsl(38 45% 45% / 0.5)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: delay + 1.9 + i * 0.05 }}
          />
        ))}
      </g>
    </g>
  );
};

/* Small bud - teardrop shape */
const Bud = ({ x, delay, height }: { x: number; delay: number; height: number }) => (
  <g transform={`translate(${x}, 0)`}>
    <motion.path
      d={`M 0 0 Q ${(Math.random() - 0.5) * 3} ${-height * 0.5} 0 ${-height}`}
      stroke="hsl(120 25% 35% / 0.35)"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.6 }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    />
    {/* Bud - closed petals */}
    <g transform={`translate(0, ${-height})`}>
      <motion.path
        d="M 0 0 C -3 -2, -3.5 -7, 0 -10 C 3.5 -7, 3 -2, 0 0"
        fill="hsl(var(--petal-secondary) / 0.35)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.7, ease: "easeOut" }}
      />
      {/* Sepal */}
      <motion.path
        d="M -2 -1 C -4 1, -3 3, 0 2 C 3 3, 4 1, 2 -1"
        fill="hsl(120 25% 35% / 0.3)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.6, ease: "easeOut" }}
      />
    </g>
  </g>
);

/* Small grass blades for fill */
const GrassBlade = ({ x, delay, height }: { x: number; delay: number; height: number }) => (
  <motion.path
    d={`M ${x} 0 Q ${x + (Math.random() - 0.5) * 5} ${-height * 0.6} ${x + (Math.random() - 0.5) * 3} ${-height}`}
    stroke="hsl(120 25% 35% / 0.2)"
    strokeWidth="0.8"
    strokeLinecap="round"
    fill="none"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 0.4 }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
  />
);

const FlowerGarden = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const gardenData = useMemo(() => {
    const petalColors = [
      "hsl(var(--petal-secondary) / 0.55)",
      "hsl(var(--petal-primary) / 0.5)",
      "hsl(var(--gold-soft) / 0.45)",
      "hsl(var(--cream-light) / 0.4)",
      "hsl(30 40% 75% / 0.5)",
      "hsl(350 30% 75% / 0.45)",
    ];
    const leafSides: Array<"left" | "right" | "both" | "none"> = ["left", "right", "both", "none"];

    const flowers = [];
    for (let i = 0; i < 14; i++) {
      const x = -46 + (i / 13) * 92;
      flowers.push({
        x: x + (Math.random() - 0.5) * 4,
        delay: 0.1 + Math.random() * 1.0,
        stemHeight: 30 + Math.random() * 35,
        petalColor: petalColors[i % petalColors.length],
        petalSize: 5 + Math.random() * 4,
        petalCount: [5, 6, 7, 8][Math.floor(Math.random() * 4)],
        leafSide: leafSides[i % leafSides.length],
      });
    }

    const buds = [];
    for (let i = 0; i < 10; i++) {
      buds.push({
        x: -44 + (i / 9) * 88 + (Math.random() - 0.5) * 6,
        delay: 0.3 + Math.random() * 1.3,
        height: 18 + Math.random() * 20,
      });
    }

    const grasses = [];
    for (let i = 0; i < 20; i++) {
      grasses.push({
        x: -48 + (i / 19) * 96 + (Math.random() - 0.5) * 3,
        delay: 0.05 + Math.random() * 0.8,
        height: 10 + Math.random() * 18,
      });
    }

    return { flowers, buds, grasses };
  }, []);

  return (
    <div ref={ref} className="w-full relative" style={{ height: "140px" }}>
      {isInView && (
        <svg
          viewBox="-50 -80 100 82"
          className="w-full h-full"
          preserveAspectRatio="xMidYMax meet"
        >
          {/* Grass first (background layer) */}
          {gardenData.grasses.map((g, i) => (
            <GrassBlade key={`grass-${i}`} x={g.x} delay={g.delay} height={g.height} />
          ))}

          {/* Buds */}
          {gardenData.buds.map((b, i) => (
            <Bud key={`bud-${i}`} x={b.x} delay={b.delay} height={b.height} />
          ))}

          {/* Flowers on top */}
          {gardenData.flowers.map((f, i) => (
            <Flower
              key={`flower-${i}`}
              x={f.x}
              delay={f.delay}
              stemHeight={f.stemHeight}
              petalColor={f.petalColor}
              petalSize={f.petalSize}
              petalCount={f.petalCount}
              leafSide={f.leafSide}
            />
          ))}
        </svg>
      )}
    </div>
  );
};

export default FlowerGarden;
