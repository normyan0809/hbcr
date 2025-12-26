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
    <div className="flex flex-col items-center justify-center h-full px-4 py-10 relative z-10 overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-8 md:space-y-12 w-full max-w-4xl text-center">
        {messageLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: index * 0.5, duration: 1 }}
          >
              <p className="font-chinese text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/95 leading-relaxed tracking-widest drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] [text-shadow:_0_0_20px_rgb(255_255_255_/_40%)]">
              {line}
              </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionMessage;