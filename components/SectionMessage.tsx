import React from 'react';
import { motion } from 'framer-motion';

const SectionMessage: React.FC = () => {
  // ==========================================
  // --- 请在这里修改文本 (信件格式) ---
  // ==========================================
  
  // 1. 称呼 (显示在左上角)
  const title = "Dear Cheryl,";

  // 2. 正文 (数组中的每一项代表一个段落)
  const body = [
    "给闺蜜/姐姐的生日小惊喜~",
    "谢谢你包容我那么那么多，每次陪着我陪着我腻歪也不会烦我",
    "新的一岁，希望你继续帅帅的攻攻的，找到喜欢的心选姐心选妹再谈个恋爱（（（",
    "好吧说点有意义的，祝姐姐做什么都顺顺利利的咯",
    "生日快乐~~~"
  ];

  // 3. 落款/签名 (显示在右下角)
  const closing = "Best Wishes,";
  const signature = "Your Friend";

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-10 relative z-10 overflow-hidden">
      
      {/* 信纸/卡片容器 */}
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-xl shadow-2xl"
      >
        {/* 装饰：顶部的小光点或线条 */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent opacity-50" />

        {/* 1. 称呼区域 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-left mb-8"
        >
          <h2 className="font-cursive text-4xl md:text-5xl text-pink-300 drop-shadow-md">
            {title}
          </h2>
        </motion.div>

        {/* 2. 正文区域 */}
        <div className="space-y-6 text-left">
          {body.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (index * 0.3), duration: 1 }}
              className="font-chinese text-xl md:text-2xl text-white/90 leading-loose tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* 3. 落款区域 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-12 text-right"
        >
          <p className="font-cursive text-2xl md:text-3xl text-white/80 mb-2">
            {closing}
          </p>
          <p className="font-cursive text-3xl md:text-5xl text-pink-300 drop-shadow-md">
            {signature}
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default SectionMessage;