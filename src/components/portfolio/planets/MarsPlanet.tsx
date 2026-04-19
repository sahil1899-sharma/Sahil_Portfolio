'use client';

import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

import SatelliteProbe from './SatelliteProbe';

function MarsGeometry() {
  const marsRef = useRef<THREE.Mesh>(null);
  
  // High-fidelity local textures for Mars
  const [colorMap, bumpMap] = useTexture([
    '/textures/mars_color.jpg',
    '/textures/mars_bump.jpg'
  ]);

  useFrame(({ clock }) => {
    if (marsRef.current) marsRef.current.rotation.y = clock.getElapsedTime() * 0.04;
  });

  return (
    <>
      <mesh ref={marsRef} castShadow receiveShadow>
        <sphereGeometry args={[1.9, 128, 128]} />
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.015}
          roughness={1}
          metalness={0.0}
        />
      </mesh>

      {/* Subtle thin atmospheric rim for realism */}
      <mesh>
        <sphereGeometry args={[1.98, 64, 64]} />
        <meshBasicMaterial 
          color="#ff4a22" 
          transparent 
          opacity={0.05} 
          side={THREE.BackSide} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </mesh>

      {/* Deploying the Aegis Satellite to Martian Orbit */}
      <SatelliteProbe orbitRadius={3.5} orbitSpeed={-0.3} />
    </>
  );
}

export default function MarsPlanet({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Suspense fallback={
        <mesh>
          <sphereGeometry args={[1.9, 32, 32]} />
          <meshBasicMaterial color="#441a10" />
        </mesh>
      }>
        {/* Tilt the entire Martian group so the satellite orbits at an angle */}
        <group rotation={[Math.PI * 0.1, 0, Math.PI * 0.15]}>
          <MarsGeometry />
        </group>
      </Suspense>
    </group>
  );
}
