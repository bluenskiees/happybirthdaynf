import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section1Quiz from "@/components/Section1Quiz";
import Section2Birthday from "@/components/Section2Birthday";
import Section3Letter from "@/components/Section3Letter";
import Section4Gallery from "@/components/Section4Gallery";
import Section5Closing from "@/components/Section5Closing";

type Section = "quiz" | "birthday" | "content";

const Index = () => {
  const [currentSection, setCurrentSection] = useState<Section>("quiz");

  const handleQuizComplete = () => {
    setCurrentSection("birthday");
  };

  const handleContinueToContent = () => {
    setCurrentSection("content");
  };

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        {currentSection === "quiz" && (
          <motion.div
            key="quiz"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <Section1Quiz onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {currentSection === "birthday" && (
          <motion.div
            key="birthday"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            <Section2Birthday onContinue={handleContinueToContent} />
          </motion.div>
        )}

        {currentSection === "content" && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Section3Letter />
            <Section4Gallery />
            <Section5Closing />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
