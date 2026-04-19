'use client';

import { useScroll, motion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 h-[40vh] w-1 bg-white/10 rounded-full z-[9990] hidden md:block overflow-hidden">
      <motion.div
        className="w-full bg-[#00f0ff] rounded-full origin-top"
        style={{ 
          scaleY: scrollYProgress,
          boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff'
        }}
      />
    </div>
  );
}
