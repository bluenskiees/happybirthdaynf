import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
      <p className="font-serif-elegant text-lg md:text-xl lg:text-[1.35rem] leading-relaxed text-walnut-deep/90">
        {/* Drop cap for first paragraph */}
        {index === 0 ? (
          <>
            <span className="font-script text-5xl lg:text-6xl float-left mr-3 mt-1 leading-none text-walnut">
              {section.text.charAt(0)}
            </span>
            {section.text.slice(1)}
          </>
        ) : (
          section.text
        )}
      </p>
    </motion.div>
  );
};

/* Wax Seal Component */
const WaxSeal = () => (
  <div className="relative w-16 h-16 md:w-20 md:h-20">
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-petal-secondary via-walnut to-walnut-deep shadow-lg" />
    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-petal-secondary/80 to-walnut shadow-inner" />
    <div className="absolute inset-0 flex items-center justify-center">
      <Heart className="w-6 h-6 md:w-7 md:h-7 text-cream-light/80 fill-cream-light/30" />
    </div>
    {/* Wax drip effects */}
    <div className="absolute -bottom-1 left-3 w-3 h-4 bg-walnut rounded-b-full" />
    <div className="absolute -bottom-0.5 right-4 w-2 h-3 bg-walnut-deep rounded-b-full" />
  </div>
);

/* Envelope Component */
const EnvelopeOpening = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center min-h-screen bg-gradient-letter px-6"
    >
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xs tracking-[0.3em] uppercase text-stone-warm mb-8"
        >
          You have a letter
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative cursor-pointer group"
          onClick={onOpen}
        >
          {/* Envelope body */}
          <div className="relative w-72 md:w-96 lg:w-[28rem] aspect-[4/3] mx-auto">
            {/* Envelope back */}
            <div className="absolute inset-0 bg-gradient-to-b from-greige to-secondary rounded-lg shadow-warm border border-petal-primary/20" />

            {/* Envelope flap (top triangle) */}
            <motion.div
              className="absolute -top-0.5 left-0 right-0 origin-top"
              whileHover={{ rotateX: 30 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{ perspective: "400px" }}
            >
              <div
                className="w-full aspect-[2/1] bg-gradient-to-b from-secondary to-greige border border-petal-primary/20 rounded-t-lg"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              />
            </motion.div>

            {/* Inner letter peek */}
            <div className="absolute inset-x-4 top-6 bottom-4 bg-cream-light/60 rounded border border-petal-primary/10">
              <div className="p-4 space-y-2">
                <div className="h-2 bg-walnut/10 rounded w-3/4" />
                <div className="h-2 bg-walnut/8 rounded w-full" />
                <div className="h-2 bg-walnut/6 rounded w-2/3" />
              </div>
            </div>

            {/* Wax seal */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-10">
              <WaxSeal />
            </div>
          </div>

          {/* Open text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-14 text-xs tracking-[0.3em] uppercase text-stone-warm group-hover:text-walnut transition-colors"
          >
            Tap to open ✦
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Section3Letter = () => {
  const [isOpened, setIsOpened] = useState(false);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="bg-gradient-letter">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <EnvelopeOpening onOpen={() => setIsOpened(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="py-20 px-6"
          >
            {/* Desktop: wider layout with decorative side elements */}
            <div className="max-w-6xl mx-auto flex gap-12 lg:gap-20">
              {/* Left decorative column — desktop only */}
              <div className="hidden lg:flex flex-col items-center justify-start pt-32 w-24 shrink-0">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "8rem" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="w-px bg-gradient-to-b from-transparent via-petal-secondary/30 to-transparent mb-8"
                />
                <WaxSeal />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "12rem" }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="w-px bg-gradient-to-b from-transparent via-petal-secondary/20 to-transparent mt-8"
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="font-script text-xl text-walnut/30 mt-8 [writing-mode:vertical-rl] rotate-180"
                >
                  for you, with love
                </motion.p>
              </div>

              {/* Main letter content */}
              <div className="flex-1 max-w-2xl">
                {/* Envelope header */}
                <motion.div
                  ref={headerRef}
                  initial={{ opacity: 0, y: 40 }}
                  animate={headerInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="text-center lg:text-left mb-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={headerInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="lg:hidden"
                  >
                    <Heart className="w-8 h-8 mx-auto mb-4 text-petal-secondary fill-petal-secondary/30" />
                  </motion.div>
                  <h2 className="font-script text-4xl md:text-5xl lg:text-6xl text-walnut-deep mb-3">
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

                  <div className="relative bg-cream-light/80 rounded-xl p-8 md:p-12 lg:p-16">
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
                      <p className="font-script text-2xl md:text-3xl text-walnut">
                        With all my love
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Right decorative column — desktop only */}
              <div className="hidden lg:flex flex-col items-center justify-end pb-32 w-24 shrink-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                  className="font-script text-lg text-walnut/20 [writing-mode:vertical-rl]"
                >
                  07 · 17 · 2007
                </motion.div>
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "6rem" }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="w-px bg-gradient-to-b from-petal-secondary/20 to-transparent mt-6"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Section3Letter;
