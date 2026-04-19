'use client';

import { motion } from 'framer-motion';

const SKILLS_GROUPS = [
  {
    category: 'Embedded & Hardware',
    color: '#00f0ff',
    skills: ['C', 'Embedded C', 'Embedded Systems', 'Assembly', 'MATLAB', 'Verilog', 'PCB Design'],
  },
  {
    category: 'Full-Stack & Cloud',
    color: '#8a2be2',
    skills: ['TypeScript', 'Next.js', 'React', 'Node.js', 'Firebase', 'REST APIs'],
  },
  {
    category: 'IoT & Systems',
    color: '#f0b000',
    skills: ['ESP32', 'Arduino', 'Raspberry Pi', 'MQTT', 'BLE', 'Python'],
  },
];

const EXPERIENCE = [
  {
    org: 'CDAC Noida',
    role: 'Cybersecurity Trainee — Virtual Internship',
    period: '2025',
    color: '#00f0ff',
    icon: '🔐',
    tags: ['Ethical Hacking', 'Network Security', 'Penetration Testing'],
    description: 'Focused on ethical hacking methodologies, vulnerability assessment, and network security protocols under CDAC\'s cyber defense curriculum.',
  },
  {
    org: 'e-Yantra — IIT Bombay',
    role: 'Embedded Systems Certification',
    period: '2026',
    color: '#8a2be2',
    icon: '🤖',
    tags: ['Robotics', 'Embedded C', 'Control Systems'],
    description: 'Completed rigorous embedded systems training through IIT Bombay\'s national robotics initiative, covering real-time control and sensor integration.',
  },
  {
    org: 'Internshala',
    role: 'Embedded Systems Certification',
    period: '2024',
    color: '#f0b000',
    icon: '⚡',
    tags: ['Microcontrollers', 'RTOS', 'IoT Protocols'],
    description: 'Advanced certification covering microcontroller architecture, RTOS fundamentals, and industrial IoT communication protocols.',
  },
];

export default function SkillsSection() {
  return (
    <section
      id="section-skills"
      className="relative flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24 max-w-5xl mx-auto py-24"
    >
      {/* Section badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-px w-8 bg-[#e8c890]" />
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#e8c890]/70">
          Tech Radar — Sector Saturn
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-black text-white mb-4"
        style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
      >
        Skills & <span style={{ color: '#e8c890' }}>Experience</span>
      </motion.h2>

      {/* Skill groups - Constellation Circuit Layout */}
      <div className="relative mb-16 p-8 md:p-12 rounded-3xl border border-[#00f0ff]/10 overflow-hidden group/network">
        <div className="absolute inset-0 bg-[#030014]/70 backdrop-blur-sm" />
        
        {/* Background Data Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        {/* Animated HUD scanning line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent opacity-0 group-hover/network:opacity-100 group-hover/network:animate-[scan_3s_linear_infinite]" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {SKILLS_GROUPS.map((group, gi) => (
            <div key={group.category} className="flex flex-col relative">
              {/* Category Node Head */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.15 }}
                className="flex items-center gap-4 mb-6 relative group/head cursor-default"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border"
                  style={{ borderColor: `${group.color}40`, background: `${group.color}10`, boxShadow: `0 0 20px ${group.color}20` }}>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: group.color, boxShadow: `0 0 10px ${group.color}` }} />
                </div>
                <h3 className="font-mono text-sm tracking-widest uppercase" style={{ color: group.color }}>
                  {group.category}
                </h3>
              </motion.div>

              {/* Skill Nodes List */}
              <div className="flex flex-col gap-4 pl-5 relative">
                {/* SVG Connecting Trunk Line */}
                <div className="absolute left-5 top-0 bottom-4 w-px" style={{ background: `linear-gradient(to bottom, ${group.color}80, transparent)` }} />
                
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.2 + si * 0.08 }}
                    className="flex items-center gap-4 group/node cursor-crosshair"
                  >
                     {/* Branch Line */}
                    <div className="w-6 h-px shrink-0 transition-colors duration-300" 
                      style={{ background: `${group.color}40` }} 
                    />
                     {/* Skill Node Text */}
                    <div className="font-mono text-xs uppercase tracking-widest text-slate-400 group-hover/node:text-white transition-all duration-300"
                      style={{ textShadow: `0 0 0px ${group.color}00` }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = group.color;
                        e.currentTarget.style.textShadow = `0 0 10px ${group.color}80`;
                        (e.currentTarget.previousSibling as HTMLDivElement).style.background = group.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#94a3b8';
                        e.currentTarget.style.textShadow = 'none';
                        (e.currentTarget.previousSibling as HTMLDivElement).style.background = `${group.color}40`;
                      }}
                    >
                      [{skill}]
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Log — Experience */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500">Mission Log — Certifications & Experience</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>

        <div className="space-y-5">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.org}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              whileHover={{ translateX: 6 }}
              className="relative rounded-xl p-5 group transition-colors duration-300 hover:bg-[#050a1e]/80"
              style={{
                background: 'rgba(5, 10, 30, 0.5)',
                border: `1px solid ${exp.color}20`,
                backdropFilter: 'blur(6px)',
                borderLeft: `3px solid ${exp.color}`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5">{exp.icon}</span>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}>
                        {exp.org}
                      </span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded font-mono"
                        style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}35` }}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 mb-2">{exp.role}</div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3"
                      style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded font-mono text-slate-400"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
