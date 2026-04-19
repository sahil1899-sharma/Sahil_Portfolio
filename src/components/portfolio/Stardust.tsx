'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Stardust({ count = 8000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Dynamic particle scaling for mobile devices to maintain 60FPS
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const actualCount = isMobile ? Math.min(count, 4000) : count;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(actualCount * 3);
    const colors = new Float32Array(actualCount * 3);

    const color = new THREE.Color();
    for (let i = 0; i < actualCount; i++) {
      // Distribute points spherically, favoring a wider horizontal disc (milky way style)
      const r = 20 + Math.random() * 200; // between 20 and 220 units away
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      // Flatten the sphere slightly to make an elliptical dust field
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.4; 
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Assign slight color variations (ice blue, pure white, faint violet)
      const rand = Math.random();
      if (rand > 0.8) {
        color.set('#00f0ff'); // cyan highlight
      } else if (rand > 0.6) {
        color.set('#8a2be2'); // violet highlight
      } else {
        color.set('#ffffff'); // standard star
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, [actualCount]);

  // Velocity tracking for Warp-Speed effect
  const currentVelocity = useRef(0);
  const targetVelocity = useRef(0);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  useFrame(() => {
    // Calculate raw scroll delta perfectly synced with screen refresh
    if (typeof window !== 'undefined') {
      const currentY = window.scrollY;
      const rawDelta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      // Cap and smooth target velocity to prevent erratic snapping
      targetVelocity.current = THREE.MathUtils.lerp(
        targetVelocity.current, 
        Math.min(Math.max(rawDelta, -100), 100), 
        0.1
      );
      
      // Decay actual velocity toward target
      currentVelocity.current = THREE.MathUtils.lerp(currentVelocity.current, targetVelocity.current, 0.05);
    }

    if (pointsRef.current) {
      // Instead of absolute rotation, we add a base cinematic rotation + our smoothed velocity delta
      // This guarantees flawless FPS and avoids lag spikes from matrix scale recalculations.
      pointsRef.current.rotation.y += 0.0005 + (currentVelocity.current * 0.001);
      pointsRef.current.rotation.x += 0.0002 + (Math.abs(currentVelocity.current) * 0.0005);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
