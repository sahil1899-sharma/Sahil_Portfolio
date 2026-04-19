'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import GallerySection from '@/components/portfolio/GallerySection';
import NavBar from '@/components/ui/NavBar';

// Dynamic import — disable SSR for the R3F Canvas (uses window/WebGL)
const SolarSystemCanvas = dynamic(
  () => import('@/components/portfolio/SolarSystemCanvas'),
  { ssr: false }
);

export default function PortfolioPage() {
  return (
    <>
      {/* Fixed 3D Canvas behind everything */}
      <SolarSystemCanvas />

      {/* Floating navigation */}
      <NavBar />

      {/* Scroll container — 4 full screen sections, each 100vh */}
      <div id="scroll-container" className="relative z-10">

        {/* Section 1 — Hero / Earth */}
        <div className="min-h-screen flex items-center">
          <HeroSection />
        </div>

        {/* Section 2 — About / Mars */}
        <div className="min-h-screen flex items-center">
          <AboutSection />
        </div>

        {/* Section 3 — Projects / Jupiter */}
        <div className="min-h-screen flex items-center">
          <ProjectsSection />
        </div>

        {/* Section 4 — Skills / Saturn */}
        <div className="min-h-screen flex items-center">
          <SkillsSection />
        </div>

        {/* Section 5 — Archives / Neptune */}
        <div className="min-h-screen flex items-start mt-20 pt-10">
          <GallerySection />
        </div>

        {/* Contact / Footer */}
        <footer id="section-contact" className="py-20 px-8 md:px-16 border-t border-white/5 max-w-5xl mx-auto w-full relative z-20 mt-20 mb-12">

          {/* Section badge */}
          <div className="flex items-center gap-3 mb-6 drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
            <div className="h-px w-8 bg-[#00f0ff]" />
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#00f0ff]">
              Transmission Channel — Get In Touch
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-black text-white mb-3"
            style={{ fontFamily: 'var(--font-orbitron), sans-serif', textShadow: '0 4px 30px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.8)' }}
          >
            Contact
          </h2>
          <p className="text-slate-200 text-base mb-10 max-w-md leading-relaxed font-semibold"
            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', textShadow: '0 2px 15px rgba(0,0,0,1)' }}>
            Open to collaborations, research discussions, and opportunities across robotics, embedded systems, and space tech.
          </p>

          {/* Social handle cards */}
          <div className="flex flex-wrap gap-4 mb-16">

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sahil-sharma-8a5481335"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-4 rounded-xl group transition-all duration-300"
              style={{
                background: 'rgba(5, 10, 30, 0.7)',
                border: '1px solid rgba(10, 102, 194, 0.3)',
                backdropFilter: 'blur(20px)',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 24px rgba(10,102,194,0.35)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              {/* LinkedIn SVG logo */}
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <div>
                <div className="text-xs font-mono tracking-widest uppercase text-[#0A66C2] mb-0.5">LinkedIn</div>
                <div className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">
                  Sahil Sharma
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:sharmasahil2365@gmail.com"
              className="flex items-center gap-3 px-5 py-4 rounded-xl group transition-all duration-300"
              style={{
                background: 'rgba(5, 10, 30, 0.7)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                backdropFilter: 'blur(20px)',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 24px rgba(0,240,255,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              {/* Mail SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <div>
                <div className="text-xs font-mono tracking-widest uppercase text-[#00f0ff]/70 mb-0.5">Email</div>
                <div className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">
                  sharmasahil2365@gmail.com
                </div>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/sahil_1899_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-4 rounded-xl group transition-all duration-300"
              style={{
                background: 'rgba(5, 10, 30, 0.7)',
                border: '1px solid rgba(225, 48, 108, 0.25)',
                backdropFilter: 'blur(20px)',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 24px rgba(225,48,108,0.25)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              {/* Instagram gradient SVG logo */}
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433"/>
                    <stop offset="25%" stopColor="#e6683c"/>
                    <stop offset="50%" stopColor="#dc2743"/>
                    <stop offset="75%" stopColor="#cc2366"/>
                    <stop offset="100%" stopColor="#bc1888"/>
                  </linearGradient>
                </defs>
                <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              <div>
                <div className="text-xs font-mono tracking-widest uppercase mb-0.5" style={{ color: '#e1306c99' }}>Instagram</div>
                <div className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">
                  @sahil_1899_
                </div>
              </div>
            </a>

          </div>

          {/* Bottom copyright */}
          <div className="border-t border-white/5 pt-8 flex items-center justify-center">
            <p className="text-xs font-mono tracking-widest text-slate-600 uppercase">
              © 2026 Sahil Sharma
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
