'use client';

import { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps { position: [number, number, number]; }

/* Clean, crisp 1D texture for ring opacity */
function createRingTexture(): THREE.DataTexture {
  const size = 512;
  const data = new Uint8Array(Math.floor(size) * 4);
  for (let x = 0; x < size; x++) {
    const nx = x / size;
    const i = x * 4;
    
    let alpha = 200;
    
    // Cassini Division
    if (nx > 0.65 && nx < 0.70) alpha = 0; 
    // Encke gap
    if (nx > 0.88 && nx < 0.90) alpha = 0; 
    // Outer fade
    if (nx > 0.98) alpha = 0;
    if (nx < 0.05) alpha = 0;

    data[i]     = 255;
    data[i+1]   = 255;
    data[i+2]   = 255;
    data[i+3]   = alpha;
  }
  const tex = new THREE.DataTexture(data, size, 1, THREE.RGBAFormat);
  tex.needsUpdate = true;
  return tex;
}

function SaturnGeometry() {
  const saturnRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringMeshRef = useRef<THREE.Mesh>(null);
  
  const colorMap = useTexture('/textures/saturn_color.jpg');
  const ringTex = useMemo(() => createRingTexture(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (saturnRef.current) saturnRef.current.rotation.y = t * 0.04;
    if (atmosphereRef.current) atmosphereRef.current.rotation.y = t * 0.045; // Atmopsphere rotates slightly faster
    if (ringMeshRef.current) ringMeshRef.current.rotation.y = t * -0.01;
  });

  return (
    <group rotation={[Math.PI * 0.15, 0, Math.PI * 0.08]}>
      
      {/* Gaseous Atmosphere Halo */}
      <mesh ref={atmosphereRef} scale={1.04}>
         <sphereGeometry args={[2.5, 64, 64]} />
         <meshBasicMaterial 
           color="#e8c890" 
           transparent 
           opacity={0.15} 
           blending={THREE.AdditiveBlending} 
           side={THREE.BackSide} 
         />
      </mesh>

      {/* Solid Core */}
      <mesh ref={saturnRef} castShadow receiveShadow>
        <sphereGeometry args={[2.5, 128, 128]} />
        <meshStandardMaterial
          map={colorMap}
          roughness={0.8}
          metalness={0.1}
          emissive="#221810" // Bring out depth in shadows
          emissiveIntensity={0.2}
          color="#ddccbb"
        />
      </mesh>

      {/* Iced Rings */}
      <mesh ref={ringMeshRef} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <ringGeometry args={[3.0, 5.2, 128]} />
        <meshStandardMaterial
          alphaMap={ringTex}
          color="#d1bfae"
          emissive="#d1bfae"
          emissiveIntensity={0.05}
          transparent
          side={THREE.DoubleSide}
          roughness={0.4} // Give ice rings some shine
          metalness={0.2}
          alphaTest={0.05}
        />
      </mesh>
    </group>
  );
}

export default function SaturnPlanet({ position }: PlanetProps) {
  return (
    <group position={position}>
      <Suspense fallback={
        <mesh>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial color="#d1bfae" />
        </mesh>
      }>
        <SaturnGeometry />
      </Suspense>
    </group>
  );
}
