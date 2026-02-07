import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

const LetterParagraph = ({
  section,
  index,
}: {
  section: (typeof letterSections)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="mb-10 last:mb-0"
    >
      <p className="text-xs tracking-[0.25em] uppercase text-stone-warm mb-3 font-body">
        {section.label}
      </p>
      <p className="font-serif-elegant text-lg md:text-xl leading-relaxed text-walnut-deep/90">
        {section.text}
      </p>
    </motion.div>
  );
};

const Section3Letter = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="min-h-screen bg-gradient-letter py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Envelope header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={headerInView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Heart className="w-8 h-8 mx-auto mb-4 text-petal-secondary fill-petal-secondary/30" />
          </motion.div>
          <h2 className="font-script text-4xl md:text-5xl text-walnut-deep mb-3">
            A Letter for You
          </h2>
          <p className="text-xs tracking-[0.3em] uppercase text-stone-warm">
            Read it slowly ✦ feel every word
          </p>
        </motion.div>

        {/* Letter paper */}
        <div className="relative">
          {/* Paper texture/frame */}
          <div className="absolute -inset-4 md:-inset-8 bg-cream-light/50 rounded-2xl border border-petal-primary/20 shadow-warm" />

          <div className="relative bg-cream-light/80 rounded-xl p-8 md:p-12">
            {/* Top decorative line */}
            <div className="flex items-center gap-3 mb-10">
              <span className="flex-1 h-px bg-petal-secondary/20" />
              <span className="text-petal-secondary/40 text-xs">✦</span>
              <span className="flex-1 h-px bg-petal-secondary/20" />
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-right mt-8"
            >
              <p className="font-script text-2xl text-walnut">
                With all my love
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3Letter;
