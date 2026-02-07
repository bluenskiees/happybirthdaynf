import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import birthdayPhoto from "@/assets/birthday-photo.jpeg";

interface Section2BirthdayProps {
  onContinue: () => void;
}

const Section2Birthday = ({ onContinue }: Section2BirthdayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-gradient-warm flex items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 flex flex-col items-center">
        {/* Photo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="relative mb-8"
        >
          {/* Decorative frame */}
          <div className="absolute -inset-3 md:-inset-4 border-2 border-petal-secondary/30 rounded-lg" />
          <div className="absolute -inset-1.5 md:-inset-2 border border-petal-primary/40 rounded-lg" />

          <img
            src={birthdayPhoto}
            alt="Birthday person"
            className="w-72 md:w-96 aspect-video object-cover rounded-lg shadow-warm"
          />

          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-foreground/10 to-transparent" />
        </motion.div>

        {/* Birthday text */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="font-script text-5xl md:text-7xl text-walnut-deep mb-2"
          >
            Happy Birthday!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <span className="w-12 h-px bg-petal-secondary/50" />
            <span className="font-serif-elegant text-6xl md:text-8xl font-light text-walnut tracking-wider">
              19th
            </span>
            <span className="w-12 h-px bg-petal-secondary/50" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="text-sm md:text-base tracking-[0.4em] text-stone-warm font-light"
          >
            07 · 17 · 2007
          </motion.p>
        </div>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          onClick={onContinue}
          className="mt-12 flex flex-col items-center gap-2 group cursor-pointer"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-stone-warm group-hover:text-walnut transition-colors">
            Continue
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-stone-warm group-hover:text-walnut transition-colors" />
          </motion.div>
        </motion.button>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-petal-secondary/20 rounded-tl-lg" />
      <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-petal-secondary/20 rounded-tr-lg" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-petal-secondary/20 rounded-bl-lg" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-petal-secondary/20 rounded-br-lg" />
    </motion.div>
  );
};

export default Section2Birthday;
