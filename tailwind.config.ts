import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan':   '#00f0ff',
        'deep-violet': '#8a2be2',
        'void':        '#030014',
      },
      fontFamily: {
        orbitron:      ['var(--font-orbitron)', 'sans-serif'],
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
        mono:          ['var(--font-jetbrains-mono)', 'monospace'],
      },
      keyframes: {
        shimmer: {
          '0%':   { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(200%)'  },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
