"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

export function AnimatedDeveloper() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showGreeting, setShowGreeting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  
  const greetings = [
    "Hi there! 👋",
    "I'm a Frontend Developer!",
    "I build modern web apps",
    "React & Next.js expert",
    "Let's work together!"
  ];
  
  useEffect(() => {
    // Show greeting after a short delay
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 800);
    
    // Cycle through greeting messages
    const messageInterval = setInterval(() => {
      setGreetingIndex(prev => (prev + 1) % greetings.length);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(messageInterval);
    };
  }, [greetings.length]);

  return (
    <div 
      className="relative w-full h-full min-h-[400px] flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsWaving(!isWaving)}
    >
      {/* CSS Animated Developer Character */}
      <div className="w-full h-full max-w-[300px] flex items-center justify-center">
        <div className={`developer-character ${isHovered ? 'hovered' : ''} ${isWaving ? 'waving' : ''}`}>
          {/* Head */}
          <div className="head">
            {/* Face */}
            <div className="face">
              <div className="eyes">
                <div className="eye left"></div>
                <div className="eye right"></div>
              </div>
              <div className="mouth"></div>
            </div>
          </div>
          
          {/* Body */}
          <div className="body">
            {/* Arms */}
            <div className="arm left-arm"></div>
            <div className={`arm right-arm ${isWaving ? 'wave' : ''}`}></div>
            
            {/* Laptop */}
            <div className="laptop">
              <div className="laptop-screen">
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="code-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Speech bubble overlay */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: showGreeting ? 1 : 0, 
          y: showGreeting ? 0 : -10 
        }}
        transition={{ duration: 0.5 }}
        className="absolute top-5 left-1/2 transform -translate-x-1/2"
      >
        <SpeechBubble text={greetings[greetingIndex]} />
      </motion.div>
      
      {/* CSS for the animated character */}
      <style jsx>{`
        .developer-character {
          position: relative;
          width: 200px;
          height: 300px;
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .head {
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 80px;
          background-color: #f8d5b2;
          border-radius: 50%;
          z-index: 2;
        }
        
        .face {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .eyes {
          position: absolute;
          top: 30px;
          width: 100%;
          display: flex;
          justify-content: space-around;
        }
        
        .eye {
          width: 12px;
          height: 12px;
          background-color: #333;
          border-radius: 50%;
        }
        
        .mouth {
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 5px;
          background-color: #333;
          border-radius: 5px;
        }
        
        .body {
          position: absolute;
          top: 120px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 120px;
          background-color: var(--primary-color, #3f51b5);
          border-radius: 20px 20px 50px 50px;
        }
        
        .arm {
          position: absolute;
          width: 20px;
          height: 80px;
          background-color: var(--primary-color, #3f51b5);
          border-radius: 10px;
        }
        
        .left-arm {
          top: 30px;
          left: -15px;
          transform: rotate(20deg);
        }
        
        .right-arm {
          top: 30px;
          right: -15px;
          transform: rotate(-20deg);
          transform-origin: top right;
          transition: transform 0.3s ease;
        }
        
        .right-arm.wave {
          animation: wave 1s ease-in-out infinite;
        }
        
        @keyframes wave {
          0%, 100% { transform: rotate(-20deg); }
          50% { transform: rotate(-60deg); }
        }
        
        .laptop {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 60px;
          background-color: #333;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .laptop-screen {
          width: 90px;
          height: 50px;
          background-color: #444;
          border-radius: 3px;
          padding: 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .code-line {
          height: 3px;
          background-color: #6fd7ff;
          margin: 3px 0;
          border-radius: 1px;
          animation: typing 2s infinite;
        }
        
        .code-line:nth-child(1) { width: 70%; }
        .code-line:nth-child(2) { width: 40%; }
        .code-line:nth-child(3) { width: 60%; }
        
        @keyframes typing {
          0%, 100% { width: 70%; }
          25% { width: 80%; }
          50% { width: 60%; }
          75% { width: 90%; }
        }
        
        .hovered .head {
          animation: nod 2s ease-in-out infinite;
        }
        
        @keyframes nod {
          0%, 100% { transform: translateX(-50%) rotate(0); }
          50% { transform: translateX(-50%) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}
