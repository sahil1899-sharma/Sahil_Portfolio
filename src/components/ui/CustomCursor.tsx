'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Custom cursor is generally hidden on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if it's a touch device; if so, disable the custom cursor
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Center Diamond */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen flex items-center justify-center"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          rotate: 45
        }}
        transition={{ type: 'spring', stiffness: 1200, damping: 25, mass: 0.1 }}
      >
        <div className="w-1.5 h-1.5 bg-[#00f0ff]" style={{ boxShadow: '0 0 10px #00f0ff' }} />
      </motion.div>

      {/* Holographic Tracking Brackets */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9998] mix-blend-screen flex items-center justify-center"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          rotate: mousePosition.x % 90 // subtle reactive rotation
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.6 }}
      >
        <div className="relative w-full h-full border border-[#00f0ff]/10 rounded-full">
          {/* Angular crosshairs */}
          <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-px h-1.5 bg-[#00f0ff]/80" />
          <div className="absolute bottom-[0%] left-1/2 -translate-x-1/2 w-px h-1.5 bg-[#00f0ff]/80" />
          <div className="absolute left-[0%] top-1/2 -translate-y-1/2 h-px w-1.5 bg-[#00f0ff]/80" />
          <div className="absolute right-[0%] top-1/2 -translate-y-1/2 h-px w-1.5 bg-[#00f0ff]/80" />
          
          {/* Target corners */}
          <div className="absolute top-[10%] left-[10%] w-2 h-2 border-t border-l border-[#00f0ff]/40" />
          <div className="absolute top-[10%] right-[10%] w-2 h-2 border-t border-r border-[#00f0ff]/40" />
          <div className="absolute bottom-[10%] left-[10%] w-2 h-2 border-b border-l border-[#00f0ff]/40" />
          <div className="absolute bottom-[10%] right-[10%] w-2 h-2 border-b border-r border-[#00f0ff]/40" />
        </div>
      </motion.div>
    </>
  );
}
