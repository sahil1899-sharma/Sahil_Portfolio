'use client';

import { motion, type Variants } from 'framer-motion';

const DATA_CARDS = [
  {
    icon: '🎓',
    title: 'Academic Status',
    value: '4th Semester',
    detail: 'B.Tech Electronics & Communication Engineering',
    accent: '#00f0ff',
  },
  {
    icon: '🤖',
    title: 'Expanding Interest',
    value: 'Autonomous Robotics',
    detail: 'Designing self-navigating systems with real-time sensor fusion and edge AI decision-making',
    accent: '#8a2be2',
  },
  {
    icon: '🛰️',
    title: 'Frontier Domain',
    value: 'Aerospace & Space',
    detail: 'Exploring embedded electronics for satellite subsystems, UAVs, and space-grade sensor payloads',
    accent: '#00f0ff',
  },
  {
    icon: '🌐',
    title: 'Current Role',
    value: 'GSA 2026',
    detail: 'Google Student Ambassador — Bridging tech communities on campus',
    accent: '#8a2be2',
  },
];

const RESEARCH_AREAS = [
  {
    icon: '🔬',
    label: 'Flexible Sensors & Stretchable Electronics',
    desc: 'Foundational research into soft, conformable sensor materials for bio-integrated and wearable health monitoring applications.',
    color: '#8a2be2',
  },
  {
    icon: '⚙️',
    label: 'Embedded Systems Architecture',
    desc: 'Low-level hardware-software co-design across microcontrollers, RTOS, and SoC platforms for real-time control loops.',
    color: '#00f0ff',
  },
  {
    icon: '🤖',
    label: 'Autonomous Robotics & Navigation',
    desc: 'Multi-sensor fusion, SLAM, and edge-AI inference for autonomous ground and aerial vehicles operating in unstructured environments.',
    color: '#8a2be2',
  },
  {
    icon: '🚀',
    label: 'Aerospace & Space Applications',
    desc: 'Radiation-hardened electronics, attitude control systems, and miniaturised payloads for CubeSats and UAV platforms.',
    color: '#ff8040',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' }
  },
};

const researchVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
};

export default function AboutSection() {
  return (
    <section
      id="section-about"
      className="relative flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24 max-w-5xl mx-auto py-24"
    >
      {/* Section badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-px w-8 bg-[#ff6030]" />
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#ff8040]/70">
          Mission Control — Sector Mars
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-black text-white mb-4"
        style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
      >
        About <span style={{ color: '#ff8040' }}>Me</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-slate-400 text-lg max-w-2xl mb-12 leading-relaxed"
        style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
      >
        I am an ECE student architecting next-generation technologies. My core focus is bridging hardware and software across{' '}
        <span className="text-[#00f0ff]/80">embedded systems</span>, <span className="text-[#8a2be2]/80">IoT</span>, and <span className="text-white/80">autonomous robotics</span>. As a developer integrating <span className="text-[#00f0ff]/80">AI/ML frameworks</span> and a dedicated <span className="text-[#8a2be2]/80">cybersecurity enthusiast</span>, I engineer scalable, real-world solutions built for the future.
      </motion.p>

      {/* Data cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
        {DATA_CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            transition={{ delay: i * 0.12 }}
            whileHover={{ scale: 1.02, translateY: -4 }}
            className="relative rounded-2xl p-6 group cursor-default"
            style={{
              background: 'rgba(5, 10, 30, 0.65)',
              border: `1px solid ${card.accent}22`,
              backdropFilter: 'blur(24px)',
              boxShadow: `inset 0 1px 0 ${card.accent}11, 0 20px 40px -10px rgba(0,0,0,0.5)`,
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
            }}
          >
            {/* Glow on hover */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: `0 0 30px ${card.accent}20` }}
            />

            {/* HUD corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l pointer-events-none" style={{ borderColor: `${card.accent}60` }} />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r pointer-events-none" style={{ borderColor: `${card.accent}60` }} />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l pointer-events-none" style={{ borderColor: `${card.accent}60` }} />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r pointer-events-none" style={{ borderColor: `${card.accent}60` }} />

            <div className="text-3xl mb-3">{card.icon}</div>
            <div className="text-xs font-mono tracking-widest uppercase mb-1" style={{ color: `${card.accent}99` }}>
              {card.title}
            </div>
            <div className="text-xl font-black text-white mb-2"
              style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}>
              {card.value}
            </div>
            <div className="text-sm text-slate-400 leading-relaxed"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
              {card.detail}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Research Frontiers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-5"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 whitespace-nowrap">
            Research Frontiers
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RESEARCH_AREAS.map((area, i) => (
            <motion.div
              key={area.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={researchVariants}
              transition={{ delay: i * 0.1 }}
              whileHover={{ translateX: 6 }}
              className="flex gap-4 items-start p-4 rounded-xl group"
              style={{
                background: 'rgba(5, 10, 30, 0.5)',
                border: `1px solid ${area.color}18`,
                backdropFilter: 'blur(16px)',
                borderLeft: `3px solid ${area.color}`,
              }}
            >
              <span className="text-2xl shrink-0 mt-0.5">{area.icon}</span>
              <div>
                <div
                  className="text-sm font-bold mb-1 tracking-wide"
                  style={{ color: area.color, fontFamily: 'var(--font-orbitron), sans-serif', fontSize: '11px' }}
                >
                  {area.label}
                </div>
                <p
                  className="text-xs text-slate-500 leading-relaxed"
                  style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                >
                  {area.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
