"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

// Simple 3D character model
function Character(props: any) {
  const group = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Animation for the character
  useFrame((state) => {
    if (group.current) {
      // Gentle floating animation
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;

      // Wave animation when clicked
      if (clicked) {
        // Wave arm by rotating
        const rightArm = group.current.children[0].children[3]; // Right arm
        if (rightArm) {
          rightArm.rotation.z =
            Math.sin(state.clock.getElapsedTime() * 5) * 0.3 - 0.3;
        }
      }

      // Subtle rotation when hovered
      if (hovered) {
        group.current.rotation.y += 0.01;
      } else {
        // Always rotate slightly
        group.current.rotation.y += 0.003;
      }
    }
  });

  return (
    <group
      ref={group}
      {...props}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      {/* Simple character made of basic shapes */}
      <group scale={0.5}>
        {/* Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <capsuleGeometry args={[0.5, 1, 4, 8]} />
          <meshStandardMaterial color={hovered ? "#5f6bff" : "#3f48cc"} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color={hovered ? "#5f6bff" : "#3f48cc"} />
        </mesh>

        {/* Eyes */}
        <mesh position={[0.15, 1.3, 0.3]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[-0.15, 1.3, 0.3]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* Pupils */}
        <mesh position={[0.15, 1.3, 0.38]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[-0.15, 1.3, 0.38]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Arms */}
        <mesh position={[0.6, 0.2, 0]} castShadow>
          <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
          <meshStandardMaterial color={hovered ? "#5f6bff" : "#3f48cc"} />
        </mesh>
        <mesh position={[-0.6, 0.2, 0]} castShadow>
          <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
          <meshStandardMaterial color={hovered ? "#5f6bff" : "#3f48cc"} />
        </mesh>

        {/* Legs */}
        <mesh position={[0.25, -1, 0]} castShadow>
          <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
          <meshStandardMaterial color={hovered ? "#5f6bff" : "#3f48cc"} />
        </mesh>
        <mesh position={[-0.25, -1, 0]} castShadow>
          <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
          <meshStandardMaterial color={hovered ? "#5f6bff" : "#3f48cc"} />
        </mesh>
      </group>

      {/* Speech bubble that appears when clicked or hovered */}
      {(hovered || clicked) && (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Text
            position={[0, 2.2, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={2}
            lineHeight={1.2}
            font="/fonts/Inter-Bold.woff"
          >
            {clicked ? "I'm waving at you!" : "Click me to wave!"}
          </Text>
        </Float>
      )}
    </group>
  );
}

// Speech bubble component
function SpeechBubble({ text }: { text: string }) {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16 bg-primary/90 backdrop-blur-sm text-white px-5 py-3 rounded-xl shadow-lg border border-white/10">
      <div className="relative">
        <motion.span
          key={text} // Important for animation to trigger on text change
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          className="block font-medium"
        >
          {text}
        </motion.span>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-4 h-4 bg-primary/90 rotate-45 border-r border-b border-white/10"></div>
      </div>
    </div>
  );
}

export function AnimatedCharacter() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showGreeting, setShowGreeting] = useState(false);

  const greetings = [
    "Hi there! 👋",
    "I'm a Frontend Developer!",
    "I build modern web apps",
    "React & Next.js expert",
    "Let's work together!",
  ];

  useEffect(() => {
    // Show greeting after a short delay
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 800);

    // Cycle through greeting messages
    const messageInterval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(messageInterval);
    };
  }, [greetings.length]);

  return (
    <div className="relative w-full h-full min-h-[400px]">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="w-full h-full rounded-lg"
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Character position={[0, -1, 0]} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          rotateSpeed={0.5}
        />
      </Canvas>

      {/* 2D Speech bubble overlay */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: showGreeting ? 1 : 0,
          y: showGreeting ? 0 : -10,
        }}
        transition={{ duration: 0.5 }}
        className="absolute top-10 left-1/2 transform -translate-x-1/2"
      >
        <SpeechBubble text={greetings[greetingIndex]} />
      </motion.div>
    </div>
  );
}
