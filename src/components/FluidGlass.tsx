/* eslint-disable react/no-unknown-property */
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export default function FluidGlass() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Canvas
      camera={{
        position: [0, 0, 6],
        fov: 45,
      }}
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        toneMappingExposure: 1.2,
      }}
      style={{
        background: 'transparent',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Sophisticated Lighting Setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 8, 8]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-8, -8, 5]} intensity={0.8} color="#4169e1" />
      <pointLight position={[5, 5, 8]} intensity={1.2} color="#ff6b35" />
      <pointLight position={[-5, -5, 8]} intensity={0.8} color="#00d4ff" />

      <PremiumGlassBubble mousePos={mousePos} />
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={1.2}
        enablePan={false}
      />
    </Canvas>
  );
}

interface BubbleProps {
  mousePos: { x: number; y: number };
}

const PremiumGlassBubble = ({ mousePos }: BubbleProps) => {
  const bubbleRef = useRef<THREE.Group>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (bubbleRef.current) {
      // Smooth interaction with mouse
      bubbleRef.current.position.x += (mousePos.x * 0.3 - bubbleRef.current.position.x) * 0.05;
      bubbleRef.current.position.y += (mousePos.y * 0.3 - bubbleRef.current.position.y) * 0.05;

      // Gentle floating animation
      bubbleRef.current.position.z += Math.sin(state.clock.elapsedTime * 0.5) * 0.0005;

      // Smooth rotation
      bubbleRef.current.rotation.x += 0.0003;
      bubbleRef.current.rotation.y += 0.0005;
    }

    if (innerSphereRef.current) {
      // Counter rotation for inner sphere
      innerSphereRef.current.rotation.x -= 0.0002;
      innerSphereRef.current.rotation.y -= 0.0003;
    }
  });

  return (
    <group ref={bubbleRef}>
      {/* Outer Glass Sphere - Premium Material */}
      <Sphere args={[1.8, 128, 128]} scale={1}>
        <meshPhysicalMaterial
          transmission={0.96}
          opacity={0.96}
          transparent={true}
          ior={1.25}
          thickness={2}
          roughness={0.04}
          metalness={0}
          envMapIntensity={1.3}
          clearcoat={0.95}
          clearcoatRoughness={0.08}
          iridescence={0.7}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 500]}
          color={new THREE.Color('#ffffff')}
          emissive={new THREE.Color('#2563eb')}
          emissiveIntensity={0.08}
        />
      </Sphere>

      {/* Inner Accent Sphere - Subtle Detail */}
      <Sphere ref={innerSphereRef} args={[1.2, 64, 64]} scale={1} position={[0, 0, 0.1]}>
        <meshPhysicalMaterial
          transmission={0.7}
          opacity={0.3}
          transparent={true}
          ior={1.15}
          thickness={1}
          roughness={0.2}
          metalness={0.1}
          envMapIntensity={0.8}
          color={new THREE.Color('#60a5fa')}
          emissive={new THREE.Color('#3b82f6')}
          emissiveIntensity={0.15}
        />
      </Sphere>

      {/* Light Refraction Rings */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.9, 0.08, 16, 100]} />
        <meshStandardMaterial
          color={new THREE.Color('#fbbf24')}
          emissive={new THREE.Color('#f59e0b')}
          emissiveIntensity={0.4}
          transparent={true}
          opacity={0.4}
          wireframe={false}
        />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.85, 0.06, 16, 100]} />
        <meshStandardMaterial
          color={new THREE.Color('#06b6d4')}
          emissive={new THREE.Color('#0891b2')}
          emissiveIntensity={0.3}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};
