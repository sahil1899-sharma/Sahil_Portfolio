'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import EarthPlanet from './planets/EarthPlanet';
import MarsPlanet from './planets/MarsPlanet';
import JupiterPlanet from './planets/JupiterPlanet';
import SaturnPlanet from './planets/SaturnPlanet';
import NeptunePlanet from './planets/NeptunePlanet';
import Stardust from './Stardust';

gsap.registerPlugin(ScrollTrigger);

const CAM_KEYFRAMES = [
  { pos: [0, 0, 7],      lookAt: [0, 0, 0]    },
  { pos: [3, 1, -73],    lookAt: [0, 0, -80]  },
  { pos: [-4, 2, -153],  lookAt: [0, 0, -160] },
  { pos: [4, -1, -233],  lookAt: [0, 0, -240] },
  { pos: [-3, 0, -313],  lookAt: [0, 0, -320] },
];

/* ─── Camera Controller ─────────────────────────────────────────── */
function CameraController() {
  const { camera } = useThree();
  const proxyRef = useRef({
    px: CAM_KEYFRAMES[0].pos[0], py: CAM_KEYFRAMES[0].pos[1], pz: CAM_KEYFRAMES[0].pos[2],
    lx: CAM_KEYFRAMES[0].lookAt[0], ly: CAM_KEYFRAMES[0].lookAt[1], lz: CAM_KEYFRAMES[0].lookAt[2],
  });

  useEffect(() => {
    const proxy = proxyRef.current;
    const tl = gsap.timeline({ paused: true });
    for (let i = 0; i < CAM_KEYFRAMES.length - 1; i++) {
      const to = CAM_KEYFRAMES[i + 1];
      tl.to(proxy, { px: to.pos[0], py: to.pos[1], pz: to.pos[2],
        lx: to.lookAt[0], ly: to.lookAt[1], lz: to.lookAt[2],
        duration: 1.2, ease: 'power2.inOut' });
    }
    ScrollTrigger.create({
      trigger: '#scroll-container', start: 'top top', end: 'bottom bottom',
      onUpdate: (self) => { tl.progress(self.progress); },
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  useFrame(() => {
    const p = proxyRef.current;
    camera.position.set(p.px, p.py, p.pz);
    camera.lookAt(p.lx, p.ly, p.lz);
  });
  return null;
}

/* ─── Main Canvas ────────────────────────────────────────────────── */
export default function SolarSystemCanvas() {
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60, near: 0.1, far: 2000 }}
        gl={{ 
          antialias: true, 
          alpha: false, 
          toneMapping: THREE.ACESFilmicToneMapping, // Crucial for realistic lighting contrast
          toneMappingExposure: 1.2 
        }}
        style={{ background: '#010103' }} // Pure deep space
      >
        {/* Realistic Space Lighting: 
            Zero ambient light (pitch black shadows) 
            Single intense directional light (The Sun) from top left 
        */}
        <directionalLight position={[-100, 50, 100]} intensity={3.5} color="#ffffff" />
        <ambientLight intensity={0.02} color="#ffffff" />

        {/* Global Particle Effects */}
        <Stardust count={12000} />

        {/* Scroll-driven camera */}
        <CameraController />

        {/* ── High Quality Starfield ── */}
        {/* Ultra-dense crisp distance stars */}
        <Stars radius={300} depth={50} count={8000} factor={3} saturation={0} fade speed={0.2} />
        {/* Larger, sparse, glowing stars */}
        <Stars radius={400} depth={100} count={1500} factor={6} saturation={0.8} fade speed={0.5} />

        {/* ── Planets ── */}
        <EarthPlanet   position={[0,  0,    0]}  />
        <MarsPlanet    position={[0,  0,  -80]}  />
        <JupiterPlanet position={[0,  0, -160]}  />
        <SaturnPlanet  position={[0,  0, -240]}  />
        <NeptunePlanet position={[0,  0, -320]}  />
      </Canvas>
    </div>
  );
}
