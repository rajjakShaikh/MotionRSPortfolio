"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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

export function LottieCharacter() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showGreeting, setShowGreeting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const lottieRef = useRef<any>(null);

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

  // Handle animation speed based on interaction
  useEffect(() => {
    if (lottieRef.current) {
      if (isClicked) {
        // Play animation faster when clicked
        lottieRef.current.setSpeed(1.5);
      } else if (isHovered) {
        // Play animation at normal speed when hovered
        lottieRef.current.setSpeed(1);
      } else {
        // Play animation slower when idle
        lottieRef.current.setSpeed(0.5);
      }
    }
  }, [isHovered, isClicked]);

  return (
    <div
      className="relative w-full h-full min-h-[400px] flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
    >
      {/* Lottie Animation */}
      <div className="w-full h-full max-w-[300px] flex items-center justify-center">
        {/* Using a developer animation GIF */}
        <div className="relative w-full h-full">
          <Image
            src="/images/developer-animation.gif"
            alt="Developer Animation"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Speech bubble overlay */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: showGreeting ? 1 : 0,
          y: showGreeting ? 0 : -10,
        }}
        transition={{ duration: 0.5 }}
        className="absolute top-5 left-1/2 transform -translate-x-1/2"
      >
        <SpeechBubble text={greetings[greetingIndex]} />
      </motion.div>
    </div>
  );
}
