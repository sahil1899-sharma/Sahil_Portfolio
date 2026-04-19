'use client';

import { motion } from 'framer-motion';

const IMAGES = [
  {
    id: 1,
    title: 'Professional Profile',
    category: 'Personal',
    src: '/gallery/photo1.jpg',
  },
  {
    id: 2,
    title: 'Smart Solutions Exhibition 2024',
    category: 'Exhibition',
    src: '/gallery/photo2.jpg',
  },
  {
    id: 3,
    title: 'GCET Tech Interview - UAV Demo',
    category: 'Presentation',
    src: '/gallery/photo3.jpg',
  },
  {
    id: 4,
    title: 'Autonomous Drone Field Test',
    category: 'Research',
    src: '/gallery/photo4.jpg',
  },
  {
    id: 5,
    title: 'Campus Safety Ecosystem Showcase',
    category: 'Exhibition',
    src: '/gallery/photo5.jpg',
  },
  {
    id: 6,
    title: 'Engineering Operations / Field Deployment',
    category: 'Logistics',
    src: '/gallery/photo6.jpg',
  }
];

export default function GallerySection() {
  return (
    <section
      id="section-gallery"
      className="relative flex flex-col items-center justify-center min-h-screen px-8 md:px-16 py-20 w-full max-w-6xl mx-auto z-10"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full text-left mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-[#00f0ff]" />
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#00f0ff]">
            File System / Data Archives
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white"
          style={{ fontFamily: 'var(--font-orbitron), sans-serif', textShadow: '0 0 20px rgba(0,240,255,0.3)' }}>
          Mission Logs
        </h2>
        <p className="text-slate-400 mt-4 max-w-2xl text-lg relative z-20" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
          Real-world deployments, laboratory configurations, and exhibition records.
        </p>
      </motion.div>

      {/* Holographic Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {IMAGES.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="group relative rounded-2xl overflow-hidden cursor-crosshair h-80"
            style={{
              backgroundColor: 'rgba(5, 15, 35, 0.6)',
              border: '1px solid rgba(0, 240, 255, 0.15)',
              backdropFilter: 'blur(12px)'
            }}
          >
            {/* Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
              style={{ backgroundImage: `url(${img.src})` }}
            />

            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] mix-blend-overlay pointer-events-none opacity-50" />

            {/* Tech Borders */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Caption removed per user request */}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
