import React from 'react';
import { motion } from 'framer-motion';

const SectionMessage: React.FC = () => {
  // ==========================================
  // 修改下方的 messageLines 数组来更改显示的文字
  // ==========================================
  const messageLines = [
    "这是属于你的特别时刻，",
    "愿你眼里的光芒永远闪耀，",
    "愿所有的美好都如期而至，",
    "愿你在这个纷繁的世界里，",
    "永远做一个快乐的小孩。",
    "Cheryl，生日快乐！"
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-20 relative z-10 overflow-hidden">
      <div className="w-full max-w-2xl max-h-full overflow-y-auto custom-scrollbar bg-black/40 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center">
        <div className="space-y-6 md:space-y-8 w-full text-center">
          {messageLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.6, duration: 0.8 }}
            >
                {/* Updated font size to be slightly smaller (text-xl to text-3xl) */}
                <p className="font-chinese text-xl sm:text-2xl md:text-4xl text-gray-100 leading-loose tracking-wider drop-shadow-md">
                {line}
                </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
            className="mt-8 text-white/50 text-sm font-sans"
        >
            Scroll for more &#8595;
        </motion.div>
      </div>
    </div>
  );
};

export default SectionMessage;