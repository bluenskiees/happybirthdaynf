import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";

const closingParagraphs = [
  "Looking back at everything we've been through, I realized how much you've endured for me. Even when I hurt you, disappointed you, made you cry, you still chose to stay. And that's something I'll always be grateful for.",
  "Because of you, I started paying attention to the little things. Because of you, I built an ambition to become someone successful, not for pride, but to make you happy. To build a comfortable home, a comfortable life, and one day, a warm little family filled with love.",
  "I still have fears in every step I take. I overthink the future more than I should. But every time I talk to you, everything feels like it's going to be okay. Like I can get through anything, as long as you're here.",
  "You are my future, and you are my place to come home to. I want to protect your trust, your happiness, and your future, the same way you've helped me grow up without making me feel afraid.",
  "I want to be the place you return to when everything feels heavy. Someone you can be honest with, someone who listens, someone who holds you quietly when words aren't enough.",
  "Don't be afraid to make any decision in your life. In every step you take, I'll be right beside you. I love you in every universe, my love.",
];

const ClosingParagraph = ({
  text,
  index,
}: {
  text: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.15 }}
      className="font-serif-elegant text-lg md:text-xl leading-relaxed text-cream/90 mb-10 last:mb-0"
    >
      {text}
    </motion.p>
  );
};

const Section5Closing = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const finalRef = useRef(null);
  const finalInView = useInView(finalRef, { once: true, margin: "-40px" });

  return (
    <section className="min-h-screen bg-gradient-closing py-24 px-6 relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-petal-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-px bg-petal-secondary/20" />
            <Heart className="w-5 h-5 text-petal-secondary/50 fill-petal-secondary/20" />
            <span className="w-16 h-px bg-petal-secondary/20" />
          </div>
          <h2 className="font-script text-4xl md:text-5xl text-cream/80">
            One Last Thing
          </h2>
        </motion.div>

        {/* Paragraphs */}
        {closingParagraphs.map((text, i) => (
          <ClosingParagraph key={i} text={text} index={i} />
        ))}

        {/* Final "I love you 300" */}
        <motion.div
          ref={finalRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            finalInView
              ? { opacity: 1, scale: 1 }
              : {}
          }
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-center mt-20 pt-12"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-12 h-px bg-petal-secondary/15" />
            <span className="text-petal-secondary/30 text-xs">✦</span>
            <span className="w-12 h-px bg-petal-secondary/15" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={finalInView ? { opacity: 1 } : {}}
            transition={{ duration: 2, delay: 1.0 }}
            className="font-script text-3xl md:text-4xl text-cream/70 mb-6"
          >
            I love you 300.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={finalInView ? { opacity: 1 } : {}}
            transition={{ duration: 2, delay: 1.8 }}
          >
            <Heart className="w-6 h-6 mx-auto text-petal-secondary/40 fill-petal-secondary/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Section5Closing;
