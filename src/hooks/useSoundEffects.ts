'use client';

import { useCallback, useRef, useEffect } from 'react';

// Generates simple sci-fi interface sounds entirely in the browser using the Web Audio API
export function useSoundEffects() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Only initialize AudioContext after first user interaction to bypass browser autoplay policies
    const initAudio = () => {
      if (!audioCtxRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });
    
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const playHover = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;
    
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // High-pitched, extremely short "tick"
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.02);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  }, []);

  const playSelect = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;
    
    const ctx = audioCtxRef.current;
    // Two oscillators for a heavier, electronic "data lock" sound
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(150, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(300, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.16);
    osc2.stop(ctx.currentTime + 0.16);
  }, []);

  const toggleAmbience = useCallback((enabled: boolean) => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;
    const ctx = audioCtxRef.current;
    
    if (enabled) {
      if (!droneOscRef.current) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Deep, rumbling sine wave
        osc.type = 'sine';
        osc.frequency.value = 55;
        
        gain.gain.value = 0;
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        droneOscRef.current = osc;
        droneGainRef.current = gain;
      }
      
      // Smooth 2-second fade in
      droneGainRef.current?.gain.cancelScheduledValues(ctx.currentTime);
      droneGainRef.current?.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2);
    } else {
      // Smooth 1-second fade out
      if (droneGainRef.current) {
        droneGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        droneGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      }
    }
  }, []);

  return { playHover, playSelect, toggleAmbience };
}
