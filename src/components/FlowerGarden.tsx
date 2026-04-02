import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* A realistic open flower with round petals spread outward */
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
  const stemCurve = useMemo(() => (Math.random() - 0.5) * 5, []);

  return (
    <g transform={`translate(${x}, 0)`}>
      {/* Stem */}
      <motion.path
        d={`M 0 0 Q ${stemCurve} ${-stemHeight * 0.5} 0 ${-stemHeight}`}
        stroke="hsl(120 30% 30% / 0.55)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay, ease: "easeOut" }}
      />

      {/* Leaves - proper leaf shape */}
      {(leafSide === "left" || leafSide === "both") && (
        <motion.path
          d={`M 0 ${-stemHeight * 0.38} C -5 ${-stemHeight * 0.38 - 3}, -12 ${-stemHeight * 0.38 - 6}, -13 ${-stemHeight * 0.38 - 1} C -12 ${-stemHeight * 0.38 + 3}, -5 ${-stemHeight * 0.38 + 2}, 0 ${-stemHeight * 0.38}`}
          fill="hsl(120 30% 30% / 0.35)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.8, ease: "easeOut" }}
        />
      )}
      {(leafSide === "right" || leafSide === "both") && (
        <motion.path
          d={`M 0 ${-stemHeight * 0.58} C 5 ${-stemHeight * 0.58 - 3}, 12 ${-stemHeight * 0.58 - 6}, 13 ${-stemHeight * 0.58 - 1} C 12 ${-stemHeight * 0.58 + 3}, 5 ${-stemHeight * 0.58 + 2}, 0 ${-stemHeight * 0.58}`}
          fill="hsl(120 30% 30% / 0.28)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 1.0, ease: "easeOut" }}
        />
      )}

      {/* Flower head */}
      <g transform={`translate(0, ${-stemHeight})`}>
        {/* Outer petals - wide rounded shape like real open flowers */}
        {Array.from({ length: petalCount }, (_, i) => {
          const angle = (i / petalCount) * 360;
          const ps = petalSize;
          return (
            <motion.ellipse
              key={`outer-${i}`}
              cx={0}
              cy={-ps * 0.7}
              rx={ps * 0.55}
              ry={ps * 0.75}
              fill={petalColor}
              transform={`rotate(${angle})`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.75 }}
              transition={{
                duration: 0.7,
                delay: delay + 1.2 + i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          );
        })}

        {/* Inner petals layer - offset rotation for fullness */}
        {petalCount >= 5 &&
          Array.from({ length: Math.ceil(petalCount * 0.6) }, (_, i) => {
            const angle = (i / Math.ceil(petalCount * 0.6)) * 360 + 360 / petalCount / 2;
            const ps = petalSize * 0.65;
            return (
              <motion.ellipse
                key={`inner-${i}`}
                cx={0}
                cy={-ps * 0.55}
                rx={ps * 0.45}
                ry={ps * 0.6}
                fill={petalColor}
                opacity={0.55}
                transform={`rotate(${angle})`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.55 }}
                transition={{
                  duration: 0.5,
                  delay: delay + 1.6 + i * 0.08,
                  ease: "easeOut",
                }}
              />
            );
          })}

        {/* Center pistil */}
        <motion.circle
          cx="0"
          cy="0"
          r={petalSize * 0.22}
          fill="hsl(38 50% 55% / 0.75)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 2.0, type: "spring" }}
        />
        <motion.circle
          cx="0"
          cy="0"
          r={petalSize * 0.12}
          fill="hsl(38 45% 45% / 0.6)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: delay + 2.1, type: "spring" }}
        />
      </g>
    </g>
  );
};

/* Small bud */
const Bud = ({ x, delay, height, color }: { x: number; delay: number; height: number; color: string }) => {
  const stemCurve = useMemo(() => (Math.random() - 0.5) * 3, []);

  return (
    <g transform={`translate(${x}, 0)`}>
      <motion.path
        d={`M 0 0 Q ${stemCurve} ${-height * 0.5} 0 ${-height}`}
        stroke="hsl(120 30% 30% / 0.4)"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />
      <g transform={`translate(0, ${-height})`}>
        {/* Closed bud petals */}
        <motion.ellipse
          cx={-1.5} cy={-4} rx={2.5} ry={5}
          fill={color}
          transform="rotate(-8)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.7, ease: "easeOut" }}
        />
        <motion.ellipse
          cx={1.5} cy={-4} rx={2.5} ry={5}
          fill={color}
          opacity={0.8}
          transform="rotate(8)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.75, ease: "easeOut" }}
        />
        {/* Sepal */}
        <motion.path
          d="M -3 0 C -4 -2, -2 -4, 0 -3 C 2 -4, 4 -2, 3 0"
          fill="hsl(120 30% 30% / 0.35)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.6, ease: "easeOut" }}
        />
      </g>
    </g>
  );
};

const FlowerGarden = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const gardenData = useMemo(() => {
    const petalColors = [
      "hsl(var(--petal-secondary) / 0.6)",
      "hsl(var(--petal-primary) / 0.55)",
      "hsl(var(--cream-light) / 0.45)",
      "hsl(30 40% 78% / 0.55)",
      "hsl(340 25% 78% / 0.5)",
      "hsl(var(--gold-soft) / 0.45)",
    ];
    const leafSides: Array<"left" | "right" | "both" | "none"> = ["left", "right", "both", "none"];

    const flowers = [];
    for (let i = 0; i < 14; i++) {
      const x = -46 + (i / 13) * 92;
      flowers.push({
        x: x + (Math.random() - 0.5) * 3,
        delay: 0.1 + Math.random() * 1.0,
        stemHeight: 28 + Math.random() * 32,
        petalColor: petalColors[i % petalColors.length],
        petalSize: 5 + Math.random() * 3.5,
        petalCount: [5, 6, 7, 8][Math.floor(Math.random() * 4)],
        leafSide: leafSides[i % leafSides.length],
      });
    }

    const buds = [];
    for (let i = 0; i < 10; i++) {
      buds.push({
        x: -44 + (i / 9) * 88 + (Math.random() - 0.5) * 5,
        delay: 0.3 + Math.random() * 1.3,
        height: 16 + Math.random() * 18,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    return { flowers, buds };
  }, []);

  return (
    <div ref={ref} className="w-full relative" style={{ height: "140px" }}>
      {isInView && (
        <svg
          viewBox="-50 -80 100 82"
          className="w-full h-full"
          preserveAspectRatio="xMidYMax meet"
        >
          {gardenData.buds.map((b, i) => (
            <Bud key={`bud-${i}`} x={b.x} delay={b.delay} height={b.height} color={b.color} />
          ))}
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
