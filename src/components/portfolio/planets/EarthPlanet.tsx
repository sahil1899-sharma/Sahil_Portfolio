'use client';

import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps { position: [number, number, number]; }

function EarthGeometry() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);

  // Loading local high-resolution 2K textures
  const [colorMap, specularMap, cloudsMap] = useTexture([
    '/textures/earth_color.jpg',
    '/textures/earth_spec.jpg',
    '/textures/earth_clouds.png'
  ]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (earthRef.current) earthRef.current.rotation.y = t * 0.04;
    // Clouds rotate slightly faster
    if (cloudRef.current) cloudRef.current.rotation.y = t * 0.05;
  });

  return (
    <>
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[2.2, 128, 128]} />
        <meshStandardMaterial
          map={colorMap}
          roughnessMap={specularMap}
          roughness={1}
          metalness={0.1}
        />
      </mesh>
      
      <mesh ref={cloudRef} castShadow receiveShadow>
        <sphereGeometry args={[2.22, 128, 128]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      {/* Subtle atmospheric scattering limb */}
      <mesh>
        <sphereGeometry args={[2.28, 64, 64]} />
        <meshBasicMaterial 
          color="#1e90ff" 
          transparent 
          opacity={0.08} 
          side={THREE.BackSide} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </mesh>
    </>
  );
}

export default function EarthPlanet({ position }: PlanetProps) {
  return (
    <group position={position}>
      <Suspense fallback={
        <mesh>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshBasicMaterial color="#001133" />
        </mesh>
      }>
        <EarthGeometry />
      </Suspense>
    </group>
  );
}
