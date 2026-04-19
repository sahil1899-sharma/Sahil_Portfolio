'use client';

import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function NeptuneGeometry() {
  const neptuneRef = useRef<THREE.Mesh>(null);
  const ringGroupRef = useRef<THREE.Group>(null);
  
  // We utilize the high-res Jupiter gas bands texture but heavily tint it deep azure blue 
  // to create hyper-realistic Neptunian storm bands.
  const [colorMap] = useTexture([
    '/textures/jupiter_color.jpg'
  ]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (neptuneRef.current) neptuneRef.current.rotation.y = t * 0.05;
    if (ringGroupRef.current) ringGroupRef.current.rotation.y = t * -0.015;
  });

  return (
    <group rotation={[Math.PI * 0.1, 0, Math.PI * 0.05]}>
      
      {/* Volumetric Ice-Blue Atmosphere */}
      <mesh scale={1.03}>
         <sphereGeometry args={[2.0, 64, 64]} />
         <meshBasicMaterial 
           color="#0088ff" 
           transparent 
           opacity={0.12} 
           blending={THREE.AdditiveBlending} 
           side={THREE.BackSide} 
           depthWrite={false}
         />
      </mesh>

      {/* Solid Oceanic/Gaseous Core */}
      <mesh ref={neptuneRef} castShadow receiveShadow>
        <sphereGeometry args={[2.0, 128, 128]} />
        <meshStandardMaterial
          map={colorMap}
          color="#0066ee" // Tint the gas bands blue
          roughness={0.7}
          metalness={0.0}
          bumpMap={colorMap}
          bumpScale={0.005} // Subtle depth to the storms
        />
      </mesh>

      {/* Ultra Faint Thin Ice Rings */}
      <mesh ref={ringGroupRef} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <ringGeometry args={[2.8, 2.85, 128]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          roughness={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Outer Faint Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.22, 128]} />
        <meshBasicMaterial
          color="#aaeeff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function NeptunePlanet({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Suspense fallback={
        <mesh>
          <sphereGeometry args={[2.0, 32, 32]} />
          <meshBasicMaterial color="#0044cc" />
        </mesh>
      }>
        <NeptuneGeometry />
      </Suspense>
    </group>
  );
}
