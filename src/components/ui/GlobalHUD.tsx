'use client';

import { useState } from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function GlobalHUD() {
  const [audioOn, setAudioOn] = useState(false);
  const { toggleAmbience, playSelect } = useSoundEffects();

  const handleAudioToggle = () => {
    playSelect();
    const nextState = !audioOn;
    setAudioOn(nextState);
    toggleAmbience(nextState);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9995] overflow-hidden select-none">
      {/* Corner Brackets */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#00f0ff]/20 rounded-tl-xl" />
      <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#00f0ff]/20 rounded-tr-xl" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#00f0ff]/20 rounded-bl-xl" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#00f0ff]/20 rounded-br-xl" />

      {/* Target Crosshairs (faint screen edges) */}
      <div className="absolute top-1/2 left-0 w-4 h-px bg-[#00f0ff]/30 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-4 h-px bg-[#00f0ff]/30 -translate-y-1/2" />
      <div className="absolute top-0 left-1/2 w-px h-4 bg-[#00f0ff]/30 -translate-x-1/2" />
      <div className="absolute bottom-0 left-1/2 w-px h-4 bg-[#00f0ff]/30 -translate-x-1/2" />

      {/* Bottom Left: Audio Toggle */}
      <button 
        onClick={handleAudioToggle}
        className="absolute bottom-8 left-8 font-mono text-[10px] tracking-[0.2em] pointer-events-auto transition-colors flex items-center gap-2 cursor-crosshair z-50 hover:scale-105 active:scale-95"
        style={{ color: audioOn ? '#00f0ff' : 'rgba(0, 240, 255, 0.4)' }}
      >
        <div className={`w-1.5 h-1.5 rounded-full ${audioOn ? 'bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] animate-pulse' : 'bg-transparent border border-[#00f0ff]/40'}`} />
        SYS.AUDIO: {audioOn ? 'ON ' : 'OFF'}
      </button>

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.02)_50%)] bg-[length:100%_4px] mix-blend-screen opacity-50 pointer-events-none" />
    </div>
  );
}
