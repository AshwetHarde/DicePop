"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Suppress THREE.Clock deprecation warning from library internals
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) {
    return;
  }
  originalWarn.apply(console, args);
};

// Preload the GLTF model
useGLTF.preload("/dice.glb");

function DiceModel({ value, isRolling }) {
  const { nodes, materials } = useGLTF("/dice.glb");
  const diceRef = useRef();

  // Correct face mappings based on empirical observation of the GLTF model
  const faceRotations = {
    1: [0, 0, 0],            // Front shows 1
    2: [Math.PI / 2, 0, 0],  // Top shows 2
    3: [0, Math.PI, 0],      // Back shows 3
    4: [-Math.PI / 2, 0, 0], // Bottom shows 4
    5: [0, Math.PI / 2, 0],  // Right shows 5
    6: [0, -Math.PI / 2, 0], // Left shows 6
  };

  const targetRotation = useRef(new THREE.Euler(...faceRotations[1]));

  useEffect(() => {
    if (value && faceRotations[value] && diceRef.current) {
      const target = faceRotations[value];
      
      // Calculate shortest angular path to target to prevent backward spinning
      const cx = diceRef.current.rotation.x;
      const cy = diceRef.current.rotation.y;
      const cz = diceRef.current.rotation.z;
      
      targetRotation.current.x = cx + Math.atan2(Math.sin(target[0] - cx), Math.cos(target[0] - cx));
      targetRotation.current.y = cy + Math.atan2(Math.sin(target[1] - cy), Math.cos(target[1] - cy));
      targetRotation.current.z = cz + Math.atan2(Math.sin(target[2] - cz), Math.cos(target[2] - cz));
    }
  }, [value]);

  const rollTimer = useRef(0);

  useEffect(() => {
    if (isRolling) {
      rollTimer.current = 0;
    }
  }, [isRolling]);

  useFrame((state, delta) => {
    if (!diceRef.current) return;

    if (isRolling) {
      rollTimer.current += delta;
      // The roll duration in GameWrapper is 600ms (0.6s)
      const progress = Math.min(rollTimer.current / 0.6, 1.0);

      // Fast random spinning
      diceRef.current.rotation.x += delta * 25;
      diceRef.current.rotation.y += delta * 20;
      diceRef.current.rotation.z += delta * 30;
      
      // Zoom straight towards camera (Z axis only) — perfectly centered
      diceRef.current.position.z = Math.sin(progress * Math.PI) * 2.5;
      diceRef.current.position.y = 0;
      diceRef.current.position.x = 0;
    } else {
      // Set rotation directly to target to prevent any movement when passing
      diceRef.current.rotation.x = targetRotation.current.x;
      diceRef.current.rotation.y = targetRotation.current.y;
      diceRef.current.rotation.z = targetRotation.current.z;
      
      // Set position directly to 0 to prevent bouncing when passing
      diceRef.current.position.z = 0;
      diceRef.current.position.y = 0;
      diceRef.current.position.x = 0;
    }
  });

  const { scene } = useGLTF("/dice.glb");

  return (
    <primitive 
      ref={diceRef} 
      object={scene.clone()} 
      scale={11} 
    />
  );
}

export default function Dice3D({ value, isRolling }) {
  const [contextLost, setContextLost] = useState(false);

  const handleError = (error) => {
    console.error('Three.js error:', error);
    if (error.message.includes('context lost')) {
      setContextLost(true);
      // Attempt recovery after a short delay
      setTimeout(() => {
        setContextLost(false);
      }, 1000);
    }
  };

  return (
    <div className="w-full h-full relative z-10 flex items-center justify-center" style={{ background: 'transparent' }}>
      {contextLost ? (
        <div className="text-center text-black">
          <p className="font-bold">Recovering...</p>
        </div>
      ) : (
        <Canvas 
          camera={{ position: [0, 0, 7], fov: 44 }}
          onError={handleError}
          gl={{ 
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
            clearColor: 0x000000,
            clearAlpha: 0,
            premultipliedAlpha: false
          }}
          style={{ 
            backgroundColor: 'transparent',
            borderRadius: '50%'
          }}
          className="rounded-full overflow-hidden"
        >
          {/* Soft ambient base */}
          <ambientLight intensity={1.4} />
          {/* Wide soft front light — avoids harsh specular glare spot */}
          <directionalLight position={[0, 1, 8]} intensity={1.2} />
          {/* Side fill lights for depth */}
          <pointLight position={[-5, 3, 5]} intensity={0.3} />
          <pointLight position={[5, 3, 5]} intensity={0.3} />
          
          <DiceModel value={value || 1} isRolling={isRolling} />
          
          <Environment preset="studio" />
        </Canvas>
      )}
    </div>
  );
}

