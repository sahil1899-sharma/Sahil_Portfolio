'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const NAV_LINKS = [
  { label: 'Home',     href: '#section-hero',     section: 0 },
  { label: 'About',    href: '#section-about',    section: 1 },
  { label: 'Projects', href: '#section-projects', section: 2 },
  { label: 'Skills',   href: '#section-skills',   section: 3 },
  { label: 'Archives', href: '#section-gallery',  section: 4 },
];

const CONTACTS = [
  {
    label: 'LinkedIn',
    handle: 'Sahil Sharma',
    href: 'https://www.linkedin.com/in/sahil-sharma-8a5481335',
    external: true,
    color: '#0A66C2',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    handle: 'sharmasahil2365@gmail.com',
    href: 'mailto:sharmasahil2365@gmail.com',
    external: false,
    color: '#00f0ff',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    handle: '@sahil_1899_',
    href: 'https://www.instagram.com/sahil_1899_',
    external: true,
    color: '#e1306c',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="ig-nav" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433"/>
            <stop offset="50%" stopColor="#dc2743"/>
            <stop offset="100%" stopColor="#bc1888"/>
          </linearGradient>
        </defs>
        <path fill="url(#ig-nav)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
];

function scrollToSection(id: string) {
  document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
}

export default function NavBar() {
  const [scrolled, setScrolled]         = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [dropdownOpen, setDropdownOpen]  = useState(false);
  const dropdownRef                      = useRef<HTMLDivElement>(null);
  const { playHover, playSelect } = useSoundEffects();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sectionIds = ['section-hero', 'section-about', 'section-projects', 'section-skills', 'section-gallery'];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && window.scrollY >= el.offsetTop - window.innerHeight / 2) {
          setActiveSection(i);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        background:    scrolled ? 'rgba(3, 0, 20, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom:  scrolled ? '1px solid rgba(0,240,255,0.08)' : '1px solid transparent',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-3 group">
        <div className="relative">
          <div className="w-8 h-8 rounded-full border border-[#00f0ff]/40 flex items-center justify-center"
            style={{ boxShadow: '0 0 12px rgba(0,240,255,0.2)' }}>
            <div className="w-3 h-3 rounded-full bg-[#00f0ff]"
              style={{ boxShadow: '0 0 8px #00f0ff' }} />
          </div>
          <div className="absolute inset-0 border border-[#00f0ff]/20 rounded-full animate-ping" />
        </div>
        <span className="text-white font-black tracking-[0.15em] text-sm uppercase"
          style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}>
          S<span style={{ color: '#00f0ff' }}>.</span>Sharma
        </span>
      </a>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-1">
        {NAV_LINKS.map((link) => (
          <button
            key={link.label}
            onClick={() => {
              playSelect();
              scrollToSection(link.href);
            }}
            onMouseEnter={playHover}
            className="relative px-4 py-2 text-xs font-mono tracking-widest uppercase transition-colors"
            style={{
              color: activeSection === link.section ? '#00f0ff' : 'rgba(148,163,184,0.7)',
              textShadow: activeSection === link.section ? '0 0 10px rgba(0,240,255,0.5)' : 'none',
            }}
          >
            {link.label}
            {activeSection === link.section && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute bottom-0 left-4 right-4 h-px"
                style={{ background: '#00f0ff', boxShadow: '0 0 6px #00f0ff' }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* Contact dropdown */}
      <div className="hidden md:block relative" ref={dropdownRef}>
        <button
          onClick={() => {
            playSelect();
            setDropdownOpen(prev => !prev);
          }}
          onMouseEnter={playHover}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-widest uppercase transition-all select-none"
          style={{
            background: dropdownOpen ? 'rgba(0,240,255,0.12)' : 'rgba(0,240,255,0.06)',
            border: '1px solid rgba(0,240,255,0.2)',
            color: '#00f0ff',
          }}
        >
          Contact
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="12" height="12"
            viewBox="0 0 24 24"
            fill="none" stroke="#00f0ff"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{    opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute right-0 mt-2 w-64 rounded-xl overflow-hidden"
              style={{
                background: 'rgba(5, 8, 25, 0.92)',
                border: '1px solid rgba(0,240,255,0.12)',
                backdropFilter: 'blur(32px)',
                boxShadow: '0 20px 40px -8px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,240,255,0.05)',
              }}
            >
              {/* Top label */}
              <div className="px-4 py-2.5 border-b border-white/5">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-slate-600">
                  Reach Out
                </span>
              </div>

              {/* Handle rows */}
              {CONTACTS.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                  onClick={() => {
                    playSelect();
                    setDropdownOpen(false);
                  }}
                  onMouseEnter={(e) => {
                    playHover();
                    e.currentTarget.style.background = `${c.color}10`;
                  }}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 px-4 py-3 group transition-colors duration-150"
                  style={{ borderBottom: i < CONTACTS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.background = `${c.color}10`)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span className="shrink-0">{c.icon}</span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono tracking-widest uppercase mb-0.5"
                      style={{ color: `${c.color}99` }}>
                      {c.label}
                    </div>
                    <div className="text-xs text-slate-300 group-hover:text-white transition-colors truncate">
                      {c.handle}
                    </div>
                  </div>
                  {/* Arrow */}
                  <svg className="ml-auto shrink-0 opacity-0 group-hover:opacity-60 transition-opacity"
                    xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M7 7h10v10"/>
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
