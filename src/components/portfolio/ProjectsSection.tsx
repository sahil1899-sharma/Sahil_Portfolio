'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const PROJECTS = [
  {
    id: 'aegis',
    name: 'Project Aegis',
    tagline: 'Autonomous Wearable Escort System',
    accentColor: '#00f0ff',
    badge: '🏆 3rd Place — SMVDU EKATVA 26',
    badgeColor: '#f0b000',
    status: 'DEPLOYED',
    description: 'A next-generation personal safety ecosystem combining a wearable ESP32 IoT device with an autonomous surveillance drone for automatic escort and threat response.',
    stack: ['ESP32', 'Raspberry Pi', 'Arduino Uno', 'Next.js', 'Firebase RTDB', 'Web Bluetooth'],
    highlights: [
      { icon: '📡', text: 'BLE acoustic trigger detection' },
      { icon: '🚁', text: 'Autonomous drone escort deployment' },
      { icon: '☁️', text: 'Firebase cloud command relay' },
      { icon: '📲', text: 'Twilio SMS emergency dispatch' },
    ],
  },
  {
    id: 'digi',
    name: 'DIGI Farm',
    tagline: 'AI-Driven Smart Farming Assistant',
    accentColor: '#8a2be2',
    badge: '🌱 Google Genkit Integration',
    badgeColor: '#4ade80',
    status: 'ACTIVE',
    description: 'An intelligent agricultural management platform leveraging Google Genkit (Gemini AI) for predictive insights and edge IoT sensors for real-time soil and crop monitoring.',
    stack: ['Google Genkit', 'Gemini AI', 'Next.js', 'Edge IoT', 'TypeScript'],
    highlights: [
      { icon: '🤖', text: 'Gemini AI data insights engine' },
      { icon: '💧', text: 'Continuous soil moisture monitoring' },
      { icon: '📊', text: 'Real-time edge sensor dashboard' },
      { icon: '🌾', text: 'Predictive crop health analysis' },
    ],
  },
];

export default function ProjectsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { playHover, playSelect } = useSoundEffects();

  return (
    <section
      id="section-projects"
      className="relative flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24 max-w-7xl mx-auto w-full py-24"
    >
      {/* Section badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-px w-8 bg-[#c8854a]" />
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#c8854a]/70">
          Project Constellations — Sector Jupiter
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-black text-white mb-8"
        style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
      >
        Projects
      </motion.h2>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
        {/* Left Column: Project Accordions */}
        <motion.div layout className={`space-y-8 transition-all duration-700 ease-in-out ${expanded ? 'lg:w-[50%]' : 'w-full'}`}>
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            layoutId={`project-card-${project.id}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.7 }}
            onClick={() => {
              playSelect();
              setExpanded(expanded === project.id ? null : project.id);
            }}
            onMouseEnter={playHover}
            className="relative rounded-2xl p-8 cursor-pointer group"
            style={{
              background: 'rgba(5, 10, 30, 0.7)',
              border: `1px solid ${project.accentColor}25`,
              backdropFilter: 'blur(24px)',
              boxShadow: `inset 0 1px 0 ${project.accentColor}15`,
            }}
            whileHover={{ scale: 1.01 }}
          >
            {/* HUD corners */}
            {['tl','tr','bl','br'].map(pos => (
              <div key={pos} className={`absolute ${pos === 'tl' ? 'top-0 left-0 border-t border-l' : pos === 'tr' ? 'top-0 right-0 border-t border-r' : pos === 'bl' ? 'bottom-0 left-0 border-b border-l' : 'bottom-0 right-0 border-b border-r'} w-3 h-3 pointer-events-none`}
                style={{ borderColor: `${project.accentColor}50` }} />
            ))}

            {/* Header row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest"
                    style={{ background: `${project.badgeColor}20`, color: project.badgeColor, border: `1px solid ${project.badgeColor}40` }}
                  >
                    {project.badge}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest"
                    style={{ background: `${project.accentColor}15`, color: project.accentColor, border: `1px solid ${project.accentColor}35` }}
                  >
                    {project.status}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mt-2"
                  style={{ fontFamily: 'var(--font-orbitron), sans-serif', color: project.accentColor }}>
                  {project.name}
                </h3>
                <p className="text-sm text-slate-400 mt-0.5">{project.tagline}</p>
              </div>
              <motion.div
                animate={{ rotate: expanded === project.id ? 45 : 0 }}
                className="text-slate-500 text-2xl mt-1 shrink-0"
              >+</motion.div>
            </div>

            {/* Expanded content */}
            <AnimatePresence>
              {expanded === project.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pt-5 mt-5 border-t" style={{ borderColor: `${project.accentColor}20` }}>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6"
                      style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {project.highlights.map(h => (
                        <div key={h.text} className="flex items-center gap-2 text-sm text-slate-400">
                          <span>{h.icon}</span>
                          <span>{h.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack chips */}
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map(tech => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 rounded-full font-mono"
                          style={{
                            background: `${project.accentColor}12`,
                            border: `1px solid ${project.accentColor}30`,
                            color: `${project.accentColor}cc`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        </motion.div>

        {/* Right Column: Hologram Window */}
        <AnimatePresence>
          {expanded && (
            <motion.div 
              layout
              initial={{ opacity: 0, width: 0, scale: 0.95 }}
              animate={{ opacity: 1, width: '50%', scale: 1 }}
              exit={{ opacity: 0, width: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="hidden lg:block relative sticky top-32 h-[560px] rounded-3xl border border-white/5 overflow-hidden group origin-right"
              style={{ background: 'rgba(3, 0, 15, 0.5)', backdropFilter: 'blur(30px)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 via-transparent to-[#8a2be2]/5 opacity-50 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {expanded === 'aegis' ? (
              <motion.div
                key="aegis"
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                className="w-full h-full p-8 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 bg-[#00f0ff] shadow-[0_0_10px_#00f0ff] rounded-full animate-pulse" />
                  <span className="font-mono text-[#00f0ff] text-xs tracking-widest">UPLINK ACTIVE</span>
                </div>
                
                {/* Drone Hologram Wireframe representation */}
                <div className="relative flex-grow border border-[#00f0ff]/20 rounded-xl bg-[#00f0ff]/[0.02] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                  
                  {/* Rotating wireframe rings */}
                  <div className="absolute w-64 h-64 border border-[#00f0ff]/30 rounded-full animate-radar mix-blend-screen" />
                  <div className="absolute w-48 h-48 border border-dashed border-[#00f0ff]/20 rounded-full animate-reticle-reverse" />
                  <div className="absolute w-32 h-32 border-2 border-[#00f0ff]/10 rounded-full animate-pulse" />
                  
                  {/* Central Core Drone Wireframe */}
                  <div className="z-10 text-center flex flex-col items-center">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">
                      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeDasharray="1 2" className="animate-pulse" />
                      <circle cx="12" cy="12" r="3" fill="#00f0ff" fillOpacity="0.2" className="animate-ping" />
                      <circle cx="12" cy="12" r="6" />
                      <path d="M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8" />
                      <circle cx="4.9" cy="4.9" r="2" />
                      <circle cx="19.1" cy="4.9" r="2" />
                      <circle cx="4.9" cy="19.1" r="2" />
                      <circle cx="19.1" cy="19.1" r="2" />
                    </svg>
                    <div className="font-mono text-[#00f0ff] text-[10px] tracking-widest mt-6 bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-4 py-1.5 rounded-full backdrop-blur-md">
                      ESP32_DRV_LOCKED
                    </div>
                  </div>
                </div>

                {/* Telemetry data */}
                <div className="mt-6 flex justify-between font-mono text-[10px] text-slate-400">
                  <span>LAT: 32.7301° N</span>
                  <span className="text-[#00f0ff]">STATUS: ESCORTING</span>
                  <span>LNG: 74.8723° E</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="digi"
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                className="w-full h-full p-8 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 bg-[#8a2be2] shadow-[0_0_10px_#8a2be2] rounded-full animate-pulse" />
                  <span className="font-mono text-[#8a2be2] text-xs tracking-widest">LLM INFERENCE</span>
                </div>
                
                {/* AI Farm representation */}
                <div className="relative flex-grow grid grid-cols-2 grid-rows-2 gap-4">
                  {/* Genkit Prompt block */}
                  <div className="col-span-2 border border-[#8a2be2]/30 rounded-xl bg-[#8a2be2]/[0.03] p-4 flex flex-col justify-between">
                    <div className="font-mono text-[10px] text-[#8a2be2]/70 uppercase">Genkit Output Stream</div>
                    <div className="font-mono text-xs text-slate-300">
                      <span className="text-green-400">OK</span> N:42 P:18 K:29<br/>
                      <span className="text-yellow-400">WARN</span> Moist: 22%<br/>
                      <span className="text-[#8a2be2]">ACT:</span> Initialize pump 3.
                    </div>
                  </div>
                  {/* Sensor blocks */}
                  <div className="border border-[#8a2be2]/20 rounded-xl bg-[#8a2be2]/[0.02] flex items-center justify-center flex-col gap-3 relative group">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8a2be2]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8a2be2" strokeWidth="1.2" className="drop-shadow-[0_0_10px_rgba(138,43,226,0.6)]">
                      <path d="M12 3v18M8 7v14M16 7v14" strokeDasharray="2 4"/>
                      <rect x="3" y="16" width="18" height="5" rx="1" fill="#8a2be2" fillOpacity="0.1"/>
                    </svg>
                    <span className="font-mono text-[#8a2be2]/80 text-[10px] tracking-widest">SOIL_NODE_1</span>
                  </div>
                  <div className="border border-[#8a2be2]/20 rounded-xl bg-[#8a2be2]/[0.02] flex items-center justify-center flex-col gap-3 relative overflow-hidden">
                    <motion.div 
                      className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#8a2be2]/30 to-[#8a2be2]/5"
                      initial={{ height: '10%' }}
                      animate={{ height: ['10%', '60%', '10%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8a2be2" strokeWidth="1.2" className="drop-shadow-[0_0_10px_rgba(138,43,226,0.6)] relative z-10">
                      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                    </svg>
                    <span className="font-mono text-[#8a2be2]/80 text-[10px] tracking-widest relative z-10">IRRIGATION_SYS</span>
                  </div>
                </div>
              </motion.div>
            )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
