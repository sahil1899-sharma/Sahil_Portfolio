'use client';

import { useState, useEffect, useCallback } from 'react';

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) {
      setProgress(0);
      return;
    }
    const currentScroll = window.scrollY;
    setProgress(Math.min(1, Math.max(0, currentScroll / scrollHeight)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return progress;
}

export function useSectionProgress(sectionCount: number): number {
  const global = useScrollProgress();
  // Returns index in [0, sectionCount-1] as a float
  return global * (sectionCount - 1);
}
