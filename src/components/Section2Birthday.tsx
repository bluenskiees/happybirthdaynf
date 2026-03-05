import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
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
      className="fixed inset-0 overflow-hidden"
    >
      {/* Full-screen photo background */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={birthdayPhoto}
          alt="Birthday person"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Cinematic overlay gradient - different for desktop & mobile */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-foreground/10 md:bg-gradient-to-r md:from-foreground/80 md:via-foreground/40 md:to-transparent" />

      {/* Vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.4)]" />

      {/* Golden sparkle accents */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.3, 0.7, 0.4] }}
        transition={{ delay: 1.5, duration: 4, repeat: Infinity }}
        className="absolute top-20 right-20 hidden md:block"
      >
        <Sparkles className="w-6 h-6 text-gold-soft/40" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.7, 0.3, 0.5] }}
        transition={{ delay: 2.5, duration: 5, repeat: Infinity }}
        className="absolute top-40 right-40 hidden md:block"
      >
        <Sparkles className="w-4 h-4 text-gold-soft/30" />
      </motion.div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-end md:items-center">
        {/* Desktop: left-aligned cinematic layout / Mobile: bottom-centered */}
        <div className="w-full px-8 pb-20 md:pb-0 md:pl-16 lg:pl-24 md:max-w-2xl">
          {/* Small decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-px bg-gold-soft/60 mb-6 hidden md:block"
          />

          {/* Birthday text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-script text-5xl md:text-7xl lg:text-8xl text-cream-light mb-2 drop-shadow-lg"
          >
            Happy Birthday!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="flex items-center gap-4 mb-3"
          >
            <span className="font-serif-elegant text-7xl md:text-9xl lg:text-[10rem] font-light text-cream-light/90 tracking-wider leading-none">
              19th
            </span>
            {/* Golden glow behind the number on desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="hidden md:block"
            >
              <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold-soft/40 to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="hidden md:block"
            >
              <p className="text-xs tracking-[0.4em] text-cream-light/60 font-light">
                JULY
              </p>
              <p className="text-xs tracking-[0.4em] text-cream-light/60 font-light">
                EIGHTEENTH
              </p>
              <p className="text-xs tracking-[0.4em] text-cream-light/60 font-light">
                2007
              </p>
            </motion.div>
          </motion.div>

          {/* Date - mobile only (desktop shows beside 19th) */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="text-sm tracking-[0.4em] text-cream-light/60 font-light mb-12 md:hidden"
          >
            07 · 18 · 2007
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-gold-soft/50 to-transparent mb-8 hidden md:block"
          />

          {/* Continue button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            onClick={onContinue}
            className="flex flex-col items-center md:items-start gap-2 group cursor-pointer"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-cream-light/50 group-hover:text-cream-light/80 transition-colors">
              Continue
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 text-cream-light/50 group-hover:text-cream-light/80 transition-colors" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Corner accents - desktop only */}
      <div className="absolute top-8 left-8 w-20 h-20 border-t border-l border-cream-light/10 rounded-tl-lg hidden md:block" />
      <div className="absolute top-8 right-8 w-20 h-20 border-t border-r border-cream-light/10 rounded-tr-lg hidden md:block" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-b border-r border-cream-light/10 rounded-br-lg hidden md:block" />
    </motion.div>
  );
};

export default Section2Birthday;
