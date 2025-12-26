import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Capsule } from '../types';
import { Plus, Gift, X } from 'lucide-react';

const INITIAL_CAPSULES: Capsule[] = [
  { id: '1', message: "May all your wishes come true! ✨", color: 'from-red-400 to-red-600' },
  { id: '2', message: "Stay awesome and unique! 🦄", color: 'from-blue-400 to-blue-600' },
  { id: '3', message: "Health, wealth, and happiness! 💰", color: 'from-green-400 to-green-600' },
  { id: '4', message: "Another year wiser! 🧠", color: 'from-yellow-400 to-yellow-600' },
  { id: '5', message: "Keep shining bright! 🌟", color: 'from-purple-400 to-purple-600' },
];

const COLORS = [
  'from-red-400 to-red-600', 
  'from-blue-400 to-blue-600', 
  'from-green-400 to-green-600', 
  'from-yellow-400 to-yellow-600', 
  'from-purple-400 to-purple-600', 
  'from-pink-400 to-pink-600', 
  'from-orange-400 to-orange-600', 
  'from-indigo-400 to-indigo-600'
];

// Generate random positions for the "pile" of balls at the bottom
const getRandomPos = (index: number, total: number) => {
    // Spread balls horizontally between 10% and 90%
    const left = 15 + ((index % 5) * 15) + (Math.random() * 10 - 5); 
    // Stack them vertically at the bottom (80% - 60%)
    const top = 70 - (Math.floor(index / 5) * 15) + (Math.random() * 10 - 5);
    return { left: `${left}%`, top: `${top}%` };
};

const SectionGacha: React.FC = () => {
  const [capsules, setCapsules] = useState<Capsule[]>(INITIAL_CAPSULES);
  const [newWish, setNewWish] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [droppingId, setDroppingId] = useState<string | null>(null);
  const [prize, setPrize] = useState<Capsule | null>(null);
  const [droppedCapsule, setDroppedCapsule] = useState<Capsule | null>(null);

  const handleAddWish = () => {
    if (!newWish.trim()) return;
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const newCapsule: Capsule = {
      id: Date.now().toString(),
      message: newWish,
      color: randomColor
    };
    setCapsules(prev => [...prev, newCapsule]);
    setNewWish('');
  };

  const handleSpin = () => {
    if (capsules.length === 0 || isSpinning || prize || droppedCapsule || droppingId) return;
    
    setIsSpinning(true);
    setDroppedCapsule(null);

    // 1. Spin Phase
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * capsules.length);
        const selected = capsules[randomIndex];
        
        setIsSpinning(false);
        setDroppingId(selected.id);

        // 2. Drop Animation Phase
        setTimeout(() => {
            setCapsules(prev => prev.filter(c => c.id !== selected.id));
            setDroppingId(null);
            setDroppedCapsule(selected);
        }, 800);

    }, 2000);
  };

  return (
    // Vertical layout by default, Row on XL screens. Reduced bottom padding.
    <div className="flex flex-col xl:flex-row h-full items-center justify-start xl:justify-center gap-4 xl:gap-12 p-4 pb-24 relative z-10 w-full max-w-7xl mx-auto overflow-y-auto xl:overflow-visible custom-scrollbar">
      
      {/* Center: The Gacha Machine */}
      {/* Added shake animation to container when spinning */}
      <motion.div 
        className="relative flex flex-col items-center order-1 xl:order-2 scale-[0.7] sm:scale-[0.85] md:scale-100 z-20 mt-4 xl:mt-0 transition-transform duration-300 shrink-0"
        animate={isSpinning ? { x: [-1, 1, -1, 1, 0], rotate: [-0.5, 0.5, -0.5, 0.5, 0] } : {}}
        transition={{ duration: 0.2, repeat: isSpinning ? Infinity : 0 }}
      >
        
        {/* Lid (Top Hat) */}
        <div className="w-40 h-16 bg-gradient-to-r from-pink-500 to-pink-700 rounded-t-full relative z-30 -mb-6 shadow-[0_5px_15px_rgba(0,0,0,0.3)] border-b-4 border-pink-900 flex items-center justify-center">
            <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),0_0_10px_rgba(255,255,0,0.5)] animate-pulse border-2 border-yellow-200" />
        </div>

        {/* Machine Top (Dome) */}
        <div className="relative z-20">
            {/* Glass Container */}
            <div className="w-72 h-72 md:w-80 md:h-80 bg-blue-400/10 backdrop-blur-[2px] rounded-full border-[6px] border-white/30 relative overflow-hidden shadow-[inset_10px_10px_40px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)]">
                
                {/* Reflections (Gloss) */}
                <div className="absolute top-10 left-10 w-24 h-12 bg-white/40 rounded-full rotate-[-45deg] blur-md z-30 pointer-events-none" />
                <div className="absolute top-16 left-6 w-8 h-8 bg-white/30 rounded-full blur-sm z-30 pointer-events-none" />
                <div className="absolute bottom-8 right-8 w-16 h-16 bg-blue-300/10 rounded-full blur-xl z-30 pointer-events-none" />

                {/* Balls Inside */}
                <div className="absolute inset-0 z-10">
                    <AnimatePresence>
                        {capsules.slice(0, 15).map((cap, i) => {
                            const isDropping = cap.id === droppingId;
                            const pos = getRandomPos(i, capsules.length);
                            
                            return (
                                <motion.div
                                    key={cap.id}
                                    layoutId={cap.id}
                                    className={`absolute w-14 h-14 rounded-full bg-gradient-to-br ${cap.color} border border-white/40 shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.3),2px_2px_5px_rgba(0,0,0,0.3)] flex items-center justify-center`}
                                    style={{
                                        left: isDropping ? '50%' : pos.left, 
                                        top: isDropping ? '50%' : pos.top,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    animate={
                                        isDropping 
                                        ? { 
                                            left: '50%',
                                            top: ['50%', '80%', '120%'],
                                            opacity: [1, 1, 0],
                                            scale: [1, 0.9, 0.8],
                                            transition: { duration: 0.8, ease: "easeInOut" }
                                          }
                                        : isSpinning 
                                        ? {
                                            // Chaos Animation: Much faster and random for "tumbling" effect
                                            left: [pos.left, `${Math.random() * 60 + 20}%`, `${Math.random() * 60 + 20}%`, pos.left],
                                            top: [pos.top, `${Math.random() * 60 + 20}%`, `${Math.random() * 60 + 20}%`, pos.top],
                                            rotate: [0, 360, -180, 720],
                                            scale: [1, 0.9, 1.1, 1],
                                            transition: { duration: 0.4, repeat: Infinity, repeatType: "reverse", ease: "linear" }
                                          } 
                                        : {
                                            y: [0, -5, 0],
                                            transition: { duration: 3, repeat: Infinity, delay: i * 0.2 }
                                          }
                                    }
                                >
                                    <div className="w-full h-[1px] bg-black/10 absolute top-1/2" />
                                    <div className="w-6 h-6 bg-white/30 rounded-full absolute top-1 left-2 blur-[1px]" />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>

        {/* Connector Ring */}
        <div className="w-[19rem] md:w-[21rem] h-6 bg-pink-800 -mt-3 z-10 rounded-lg shadow-lg" />

        {/* Machine Body */}
        <div className="w-64 h-52 bg-gradient-to-b from-pink-500 via-pink-600 to-pink-700 rounded-b-[3rem] rounded-t-xl -mt-2 relative z-10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col items-center">
            
            {/* Decor Screws */}
            <div className="w-full flex justify-between px-6 py-3 opacity-60">
                 <div className="w-2 h-2 bg-black/30 rounded-full" />
                 <div className="w-2 h-2 bg-black/30 rounded-full" />
            </div>

            {/* Front Panel (Knob Area) */}
            <div className="w-48 h-32 bg-white/95 rounded-[2rem] shadow-[inset_0_2px_5px_rgba(0,0,0,0.1)] border-[6px] border-pink-300 flex flex-col items-center justify-center relative overflow-hidden">
                
                {/* Coin Slot Decor */}
                <div className="absolute top-2 right-4 w-1 h-6 bg-gray-300 rounded-full border border-gray-400" />

                {/* Spin Knob */}
                <motion.button
                    onClick={handleSpin}
                    disabled={isSpinning || droppedCapsule !== null || prize !== null || capsules.length === 0}
                    whileTap={{ scale: 0.95 }}
                    animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
                    transition={isSpinning ? { duration: 0.5, repeat: Infinity, ease: "linear" } : {}}
                    className={`w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 border-4 border-yellow-200 shadow-[0_5px_10px_rgba(0,0,0,0.2)] flex items-center justify-center z-20 ${isSpinning || capsules.length === 0 ? 'cursor-not-allowed grayscale-[0.5]' : 'cursor-pointer hover:brightness-110'}`}
                >
                    <div className="w-full h-3 bg-yellow-700/20 absolute rotate-0" />
                    <div className="h-full w-3 bg-yellow-700/20 absolute rotate-0" />
                    <div className="w-4 h-4 bg-white/50 rounded-full z-10 blur-[1px]" />
                </motion.button>
                <span className="font-cursive text-pink-500 mt-1 text-lg">
                    {capsules.length === 0 ? "Empty!" : "Spin"}
                </span>
            </div>

            {/* Exit Chute */}
            <div className="absolute -bottom-8 bg-gray-800 w-32 h-16 rounded-b-[2rem] border-x-[6px] border-b-[6px] border-gray-700 shadow-xl flex items-center justify-center overflow-visible">
                 <div className="absolute top-0 w-full h-4 bg-black/60 shadow-inner" />
                 
                 <AnimatePresence>
                     {droppedCapsule && (
                         <motion.button
                             initial={{ y: -50, opacity: 0 }}
                             animate={{ y: 0, opacity: 1, rotate: 360 }}
                             exit={{ scale: 0, opacity: 0 }}
                             transition={{ type: "spring", bounce: 0.4 }}
                             onClick={() => {
                                 setPrize(droppedCapsule);
                                 setDroppedCapsule(null);
                             }}
                             className={`w-12 h-12 rounded-full bg-gradient-to-br ${droppedCapsule.color} border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.6)] z-30 cursor-pointer animate-bounce mt-2`}
                         >
                            <span className="text-white text-[9px] font-bold drop-shadow-md">OPEN</span>
                         </motion.button>
                     )}
                 </AnimatePresence>
            </div>
        </div>

        {/* Legs */}
        <div className="w-72 flex justify-between px-6 mt-[-10px] opacity-90 z-0">
            <div className="w-6 h-8 bg-pink-900 rounded-b-xl" />
            <div className="w-6 h-8 bg-pink-900 rounded-b-xl" />
        </div>
      </motion.div>

      {/* Left Panel: Controls - Styled for mobile compaction */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-sm xl:max-w-md xl:w-1/3 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 order-2 xl:order-1 z-30 flex flex-col gap-3 shrink-0 max-h-[30vh] xl:max-h-none overflow-hidden"
      >
        <div className="flex items-center justify-between">
            <h3 className="font-cursive text-2xl text-white">Make a Wish</h3>
            <span className="text-white/50 text-xs">{capsules.length} balls left</span>
        </div>

        {/* INSTRUCTIONS - NEW ADDITION */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
             <p className="font-sans text-[11px] sm:text-xs text-white/70 leading-relaxed">
               <span className="font-bold text-pink-300">How to Play:</span><br/>
               1. Add your own wishes below (optional).<br/>
               2. Click the <span className="text-yellow-400 font-bold">yellow knob</span> to spin.<br/>
               3. Open the fallen capsule for a surprise!
             </p>
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newWish}
            onChange={(e) => setNewWish(e.target.value)}
            placeholder="Type blessing..."
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors font-chinese text-lg"
            onKeyDown={(e) => e.key === 'Enter' && handleAddWish()}
          />
          <button 
            onClick={handleAddWish}
            className="bg-pink-600 hover:bg-pink-500 text-white p-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Capsule List - horizontal on mobile to save space, flex-wrap on desktop */}
        <div className="flex xl:flex-wrap gap-2 overflow-x-auto xl:overflow-y-auto pb-2 xl:pb-0 custom-scrollbar xl:max-h-60">
            {capsules.map((c, i) => (
                <div key={i} className={`w-5 h-5 shrink-0 rounded-full bg-gradient-to-br ${c.color} shadow-sm border border-white/30`} />
            ))}
        </div>
      </motion.div>

      {/* Prize Modal */}
      <AnimatePresence>
        {prize && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                className="bg-white rounded-[2rem] p-8 max-w-md w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(255,105,180,0.5)] border-4 border-pink-200"
            >
                <button 
                    onClick={() => setPrize(null)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X />
                </button>
                
                <div className={`w-28 h-28 mx-auto rounded-full bg-gradient-to-br ${prize.color} mb-6 border-[6px] border-white shadow-xl flex items-center justify-center animate-pulse`}>
                    <Gift size={48} className="text-white drop-shadow-md" />
                </div>

                <h4 className="font-cursive text-4xl text-gray-800 mb-4">A Blessing For You</h4>
                <p className="font-chinese text-3xl text-pink-600 leading-relaxed min-h-[80px] flex items-center justify-center py-4">
                    {prize.message}
                </p>
                
                <button 
                    onClick={() => setPrize(null)}
                    className="mt-6 bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-3 rounded-full font-cursive text-2xl hover:scale-105 transition-transform shadow-lg w-full"
                >
                    Collect ❤
                </button>

                {/* Decorative Confetti in Modal */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionGacha;