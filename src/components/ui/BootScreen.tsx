'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';

const BOOT_LOGS = [
  'INITIALIZING SYSTEM KERNEL...',
  'LOADING CORE PROTOCOLS...',
  'ESTABLISHING SATELLITE UPLINK...',
  'CALIBRATING SENSOR FUSION...',
  'DOWNLOADING MARS TOPOGRAPHY...',
  'SYNTHESIZING UI MODULES...',
  'SECURING COMMS CHANNEL...',
  'ALL SYSTEMS NOMINAL.'
];

export default function BootScreen() {
  const { active, progress } = useProgress();
  const [logs, setLogs] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);

  // Simulate terminal logs appearing rapidly
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[currentIndex]]);
        currentIndex++;
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Wait for R3F assets + a minimum 2.5s for the boot sequence vibe
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    if (progress === 100 && !active && logs.length === BOOT_LOGS.length) {
      // Small pause after 100% before opening the iris
      timeout = setTimeout(() => {
        setIsBooting(false);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [progress, active, logs.length]);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          key="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030014] text-[#00f0ff] font-mono select-none"
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
          
          <div className="w-full max-w-2xl px-8 flex flex-col gap-6 relative z-10">
            <div className="flex items-center gap-4 border-b border-[#00f0ff]/30 pb-4">
              <div className="w-12 h-12 border-2 border-[#00f0ff] rounded flex items-center justify-center animate-pulse">
                <span className="text-2xl font-black">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-widest uppercase">System Initialization</h1>
                <p className="text-xs text-[#00f0ff]/70">v.1.00.4 // SECURE CONNECTION</p>
              </div>
            </div>

            <div className="flex flex-col gap-1 min-h-[160px] text-xs sm:text-sm tracking-wider">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-[#00f0ff]/80"
                >
                  <span>{'>'}</span>
                  <span>{log}</span>
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="mt-1"
              >
                _
              </motion.div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-xs tracking-widest text-[#00f0ff]/80">
                <span>SYSTEM RENDER</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00f0ff] to-[#8a2be2]"
                  style={{ width: `${progress}%`, transition: 'width 0.3s ease-out' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
