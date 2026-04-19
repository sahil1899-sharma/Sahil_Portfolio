'use client';

import { useRef, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps { position: [number, number, number]; }

interface OrbitNode {
  id: string;
  label: string;
  color: string;
  angle: number;
  radius: number;
  elevation: number;
}

const ORBIT_NODES: OrbitNode[] = [
  { id: 'aegis',  label: 'Project Aegis',  color: '#888888', angle: 0,    radius: 4.5, elevation: 0.5 },
  { id: 'digi',   label: 'DIGI Farm',      color: '#888888', angle: Math.PI, radius: 4.2, elevation: -0.3 },
];

function OrbitingNode({ node, onSelect }: { node: OrbitNode; onSelect: (id: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const angle = node.angle + t * 0.15;
    groupRef.current.position.set(
      Math.cos(angle) * node.radius,
      node.elevation,
      Math.sin(angle) * node.radius
    );
  });

  return (
    <group ref={groupRef}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(node.id)}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={hovered ? '#ffffff' : node.color} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.15, 0.16, 32]} />
        <meshBasicMaterial color={hovered ? '#ffffff' : node.color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <Html center distanceFactor={10}>
        <div
          style={{
            color: hovered ? '#ffffff' : node.color,
            fontSize: '10px',
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
            marginTop: '16px',
            letterSpacing: '0.1em',
            opacity: 1,
            transition: 'color 0.2s',
            pointerEvents: 'none',
          }}
        >
          {node.label}
        </div>
      </Html>
    </group>
  );
}

function JupiterGeometry() {
  const jupiterRef = useRef<THREE.Mesh>(null);
  const colorMap = useTexture('/textures/jupiter_color.jpg');

  useFrame(({ clock }) => {
    if (jupiterRef.current) jupiterRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <mesh ref={jupiterRef} castShadow receiveShadow>
      <sphereGeometry args={[3.2, 128, 128]} />
      <meshStandardMaterial
        map={colorMap}
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  );
}

export default function JupiterPlanet({ position }: PlanetProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <group position={position}>
      <Suspense fallback={
        <mesh>
          <sphereGeometry args={[3.2, 32, 32]} />
          <meshBasicMaterial color="#3a2512" />
        </mesh>
      }>
        <JupiterGeometry />
      </Suspense>

      {/* Modern minimal UI nodes */}
      {ORBIT_NODES.map(node => (
        <OrbitingNode key={node.id} node={node} onSelect={setSelectedNode} />
      ))}

      {/* Selected node detail popup */}
      {selectedNode && (
        <Html position={[4.5, 2, 0]} distanceFactor={8}>
          <div
            style={{
              background: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '16px',
              width: '240px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#fff', fontFamily: 'monospace', fontSize: '12px', fontWeight: 'bold' }}>
                {selectedNode === 'aegis' ? 'PROJECT AEGIS' : 'DIGI FARM'}
              </span>
              <button
                onClick={() => setSelectedNode(null)}
                style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
              >×</button>
            </div>
            {selectedNode === 'aegis' && (
              <div style={{ color: '#a3a3a3', fontFamily: 'monospace', fontSize: '11px', lineHeight: '1.6' }}>
                <div style={{ color: '#e5e5e5', marginBottom: '6px' }}>🏆 3rd — SMVDU EKATVA</div>
                <div>• ESP32 wearable IoT</div>
                <div>• Autonomous escort drone</div>
                <div>• Raspberry Pi backend</div>
                <div>• Arduino Uno payload</div>
              </div>
            )}
            {selectedNode === 'digi' && (
              <div style={{ color: '#a3a3a3', fontFamily: 'monospace', fontSize: '11px', lineHeight: '1.6' }}>
                <div style={{ color: '#e5e5e5', marginBottom: '6px' }}>🌱 AI Smart Farming</div>
                <div>• Google Genkit AI</div>
                <div>• Edge IoT sensors</div>
                <div>• Real-time insights</div>
                <div>• Moisture monitoring</div>
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}
