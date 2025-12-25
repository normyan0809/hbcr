import React from 'react';
import { motion } from 'framer-motion';

const SectionIntro: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        <h1 className="font-cursive text-6xl sm:text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-4 md:mb-8 leading-tight py-2">
          Happy Birthday
        </h1>
        <h2 className="font-cursive text-3xl sm:text-4xl md:text-6xl text-white opacity-90 mb-8 md:mb-12">
          To Dearest Cheryl
        </h2>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-white/60 font-sans text-sm md:text-base animate-pulse"
      >
        (Swipe or use arrows to navigate)
      </motion.div>
    </div>
  );
};

export default SectionIntro;