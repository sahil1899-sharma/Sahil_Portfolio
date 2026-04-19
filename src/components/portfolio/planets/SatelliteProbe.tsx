'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function SatelliteProbe({ orbitRadius = 4, orbitSpeed = 0.2 }) {
  const pivotRef = useRef<THREE.Group>(null);
  const satelliteRef = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // 1. Orbital rotation around the parent planet
    if (pivotRef.current) {
      pivotRef.current.rotation.y = t * orbitSpeed;
      // Slight vertical wobble in the orbit
      pivotRef.current.position.y = Math.sin(t * 0.5) * 0.5;
    }

    // 2. Local attitude adjustments (slow tumbling)
    if (satelliteRef.current) {
      satelliteRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
      satelliteRef.current.rotation.x = Math.cos(t * 0.3) * 0.1;
    }
    
    // 3. Blinking antenna logic
    if (antennaRef.current) {
      const isBlinking = Math.sin(t * 8) > 0.8;
      const mat = antennaRef.current.material as THREE.MeshBasicMaterial;
      mat.color.setHex(isBlinking ? 0xff0044 : 0x220000);
    }
  });

  return (
    <group ref={pivotRef}>
      {/* Pushed out to the orbit radius */}
      <group position={[orbitRadius, 0, 0]} ref={satelliteRef}>
        
        {/* Core Body (Golden Foil/Metallic) */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.6, 0.8]} />
          <meshStandardMaterial 
            color="#ccaa44" 
            roughness={0.4} 
            metalness={0.8} 
          />
        </mesh>
        
        {/* Secondary silver instrument module */}
        <mesh position={[0, 0, -0.5]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.4, 8]} />
          <meshStandardMaterial color="#8899aa" roughness={0.5} metalness={0.7} />
        </mesh>

        {/* Solar Panel - Left */}
        <group position={[-0.8, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.0, 0.02, 0.6]} />
            <meshStandardMaterial color="#051024" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Solar Panel glowing grid lines */}
          <mesh position={[0, 0.015, 0]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[0.95, 0.55]} />
            <meshBasicMaterial 
               color="#00f0ff" 
               wireframe 
               transparent 
               opacity={0.3} 
               side={THREE.DoubleSide} 
            />
          </mesh>
        </group>

        {/* Solar Panel - Right */}
        <group position={[0.8, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.0, 0.02, 0.6]} />
            <meshStandardMaterial color="#051024" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Solar Panel glowing grid lines */}
          <mesh position={[0, 0.015, 0]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[0.95, 0.55]} />
            <meshBasicMaterial 
               color="#00f0ff" 
               wireframe 
               transparent 
               opacity={0.3} 
               side={THREE.DoubleSide} 
            />
          </mesh>
        </group>

        {/* Comm Dish */}
        <group position={[0, 0.35, 0.2]} rotation={[-Math.PI / 4, 0, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.4, 0.05, 0.1, 16]} />
            <meshStandardMaterial color="#dddddd" roughness={0.3} metalness={0.5} />
          </mesh>
          {/* Dish Antenna Spike */}
          <mesh position={[0, 0.15, 0]}>
             <cylinderGeometry args={[0.01, 0.01, 0.2]} />
             <meshStandardMaterial color="#444" />
          </mesh>
        </group>

        {/* Main Sensor Spire */}
        <mesh position={[0, 0, 0.6]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.8]} />
          <meshStandardMaterial color="#aaaaaa" metalness={0.8} />
        </mesh>
        
        {/* Blinking Red Beacon */}
        <mesh ref={antennaRef} position={[0, 0, 1.05]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#ff0044" />
        </mesh>

        {/* Tactical HUD Target Label */}
        <Html center distanceFactor={15}>
          <div className="flex items-center gap-1.5 pointer-events-none select-none">
            {/* Target Reticle */}
            <div className="w-4 h-4 border border-[#00f0ff] rounded-full flex items-center justify-center relative">
               <div className="w-1 h-1 bg-[#00f0ff] rounded-full animate-ping absolute" />
            </div>
            
            {/* Data Feed */}
            <div className="flex flex-col">
              <div className="text-[8px] font-mono tracking-widest text-[#00f0ff] uppercase bg-[#030014]/80 px-1 border border-[#00f0ff]/30 backdrop-blur-sm whitespace-nowrap">
                AEGIS-PROBE_01
              </div>
              <div className="text-[6px] font-mono tracking-widest text-white/50 px-1 whitespace-nowrap">
                Uplink: ESTABLISHED
              </div>
            </div>
          </div>
        </Html>
        
      </group>
    </group>
  );
}
