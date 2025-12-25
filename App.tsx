import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppStep } from './types';
import ParticleBackground from './components/ParticleBackground';
import SectionIntro from './components/SectionIntro';
import SectionMessage from './components/SectionMessage';
import SectionGacha from './components/SectionGacha';
import SectionOutro from './components/SectionOutro';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.INTRO);

  const nextStep = () => {
    if (currentStep < AppStep.OUTRO) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > AppStep.INTRO) {
        setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case AppStep.INTRO:
        return <SectionIntro />;
      case AppStep.MESSAGE:
        return <SectionMessage />;
      case AppStep.GACHA:
        return <SectionGacha />;
      case AppStep.OUTRO:
        return <SectionOutro />;
      default:
        return <SectionIntro />;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans">
      {/* Background stays persistent */}
      <ParticleBackground />

      {/* Content Container */}
      <div className="absolute inset-0 pb-20"> {/* Padding bottom for nav bar */}
        <AnimatePresence mode="wait">
            <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full h-full"
            >
            {renderStep()}
            </motion.div>
        </AnimatePresence>
      </div>

      {/* Global Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/80 to-transparent z-50 flex items-center justify-between px-8 md:px-20 pb-4">
        
        {/* Prev Button */}
        <button 
            onClick={prevStep}
            disabled={currentStep === AppStep.INTRO}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${currentStep === AppStep.INTRO ? 'opacity-0 pointer-events-none' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
        >
            <ChevronLeft size={28} />
            <span className="font-cursive text-xl hidden md:inline">Back</span>
        </button>

        {/* Page Indicator */}
        <div className="flex gap-2">
            {[0, 1, 2, 3].map((step) => (
                <div 
                    key={step} 
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentStep === step ? 'bg-pink-500 w-6' : 'bg-white/30'}`}
                />
            ))}
        </div>

        {/* Next Button */}
        <button 
            onClick={nextStep}
            disabled={currentStep === AppStep.OUTRO}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${currentStep === AppStep.OUTRO ? 'opacity-0 pointer-events-none' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
        >
            <span className="font-cursive text-xl hidden md:inline">Next</span>
            <ChevronRight size={28} />
        </button>
      </div>

    </div>
  );
};

export default App;