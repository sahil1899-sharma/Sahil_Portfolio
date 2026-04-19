'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ROLES = [
  'B.Tech ECE Student',
  'IoT & Embedded Systems Engineer',
  'Full-Stack Developer',
  'Google Student Ambassador 2026',
];

function useTypewriter(words: string[], typingSpeed = 60, deletingSpeed = 35, pauseMs = 2000) {
  const [display, setDisplay] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing');

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (display.length < word.length) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('pause'), pauseMs);
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('deleting'), 200);
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), deletingSpeed);
      } else {
        setWordIndex(i => i + 1);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [display, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return display;
}

// Scramble decoding component for an ultra-premium cyberpunk entry
function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState(text.split('').map(() => '!'));
  
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*-_=+|;:<>/?';
    let iterations = 0;
    const maxIterations = 20;
    
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplay(prev => prev.map((char, index) => {
          if (text[index] === ' ') return ' ';
          if (iterations >= maxIterations || (iterations / maxIterations) > (index / text.length)) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }));

        iterations += 1;
        if (iterations > maxIterations) clearInterval(interval);
      }, 40);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <>{display.join('')}</>;
}

export default function HeroSection() {
  const typedText = useTypewriter(ROLES);

  return (
    <section
      id="section-hero"
      className="relative flex flex-col items-start justify-center min-h-screen px-8 md:px-16 lg:px-24 max-w-5xl mx-auto"
    >
      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex items-center gap-2 mb-8"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]" />
        </span>
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#00f0ff]/70">
          Navigating the Star System
        </span>
      </motion.div>

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-4 text-white"
          style={{ fontFamily: 'var(--font-orbitron), var(--font-space-grotesk), sans-serif' }}
        >
          <span className="block"><ScrambleText text="SAHIL" delay={500} /></span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(135deg, #00f0ff 0%, #8a2be2 60%, #00f0ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <ScrambleText text="SHARMA" delay={800} />
          </span>
        </h1>
      </motion.div>

      {/* Typewriter */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3">
          <span className="text-[#8a2be2]/60 font-mono text-xl">{'>'}</span>
          <span
            className="text-xl md:text-2xl font-mono"
            style={{ color: '#00f0ff', textShadow: '0 0 20px rgba(0,240,255,0.4)' }}
          >
            {typedText}
            <span className="animate-pulse ml-0.5 text-[#00f0ff]">_</span>
          </span>
        </div>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1 }}
        className="text-slate-400 text-lg max-w-xl mb-12 leading-relaxed"
        style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
      >
        A passionate engineer charting an active trajectory across{' '}
        <span className="text-[#00f0ff]/90">autonomous robotics</span>,{' '}
        <span className="text-[#8a2be2]/90">embedded systems</span>,{' '}
        <span className="text-[#ff8040]/90">aerospace & space applications</span>, and foundational research in{' '}
        <span className="text-[#ff6030]/90">flexible sensors & stretchable electronics</span>.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="flex flex-wrap gap-4"
      >
        <a
          href="#section-projects"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('section-projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-8 py-4 rounded-xl font-bold tracking-wide text-sm uppercase relative overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #00f0ff20, #8a2be220)',
            border: '1px solid rgba(0,240,255,0.4)',
            color: '#00f0ff',
            boxShadow: '0 0 20px rgba(0,240,255,0.15)',
          }}
        >
          <span className="relative z-10">Explore Projects</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff10] to-[#8a2be210] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>

        <a
          href="#section-about"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('section-about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-8 py-4 rounded-xl font-bold tracking-wide text-sm uppercase"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          Learn More ↓
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono tracking-widest text-slate-500 uppercase">Scroll to navigate</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border border-slate-600 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-[#00f0ff] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
