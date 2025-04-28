"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Image from "next/image";

// Define the tech logos to display
const techLogos = [
  { name: "Next.js", src: "/logos/nextjs.svg" },
  { name: "React3d", src: "/logos/Reactjs3d.svg" },
  { name: "jsnew3d", src: "/logos/js3dnew.svg" },
  { name: "jsnew3d", src: "/logos/js3dnew.svg" },
  { name: "js3d", src: "/logos/JS3d.svg" },
  { name: "React", src: "/logos/react.svg" },
  { name: "React", src: "/logos/react.svg" },
  { name: "React", src: "/logos/react.svg" },
  { name: "TypeScript", src: "/logos/typescript.svg" },
  { name: "TypeScript", src: "/logos/typescript.svg" },
  { name: "TypeScript", src: "/logos/typescript.svg" },
  { name: "HTML", src: "/logos/html.svg" },
  { name: "CSS", src: "/logos/css.svg" },
  { name: "CSS", src: "/logos/css.svg" },
  { name: "Tailwind CSS", src: "/logos/tailwind.svg" },
  { name: "Tailwind CSS", src: "/logos/tailwind.svg" },
  { name: "Tailwind CSS", src: "/logos/tailwind.svg" },
  { name: "shadcn/ui", src: "/logos/shadcn.svg" },
  { name: "JavaScript", src: "/logos/javascript.svg" },
];

interface LogoProps {
  src: string;
  name: string;
  x: number;
  delay: number;
  size: number;
  mouseX: number;
  mouseY: number;
  isMousePresent: boolean;
}

// Individual falling logo component
const FallingLogo = ({
  src,
  name,
  x,
  delay,
  size,
  mouseX,
  mouseY,
  isMousePresent,
}: LogoProps) => {
  const controls = useAnimation();
  const logoRef = useRef<HTMLDivElement>(null);
  const posX = useMotionValue(x);
  const [logoPosition, setLogoPosition] = useState({ x, y: 0 });

  useEffect(() => {
    let animationId: number;
    let currentY = 0;
    const speed = 0.5 + Math.random() * 1.5; // Random speed between 0.5 and 1
    const rotationSpeed = 0.2 + Math.random() * 0.5; // Random rotation speed
    let rotation = 0;

    const animate = () => {
      if (logoRef.current) {
        // Update vertical position
        currentY += speed;
        if (currentY > window.innerHeight) {
          currentY = -size;
        }

        // Update rotation
        rotation += rotationSpeed;

        // Mouse interaction
        let newX = x;
        if (isMousePresent) {
          const logoRect = logoRef.current.getBoundingClientRect();
          const logoX = logoRect.left + logoRect.width / 2;
          const logoY = logoRect.top + logoRect.height / 2;

          // Calculate distance from mouse to logo
          const dx = mouseX - logoX;
          const dy = mouseY - logoY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // If mouse is close to logo, move it away
          if (distance < 150) {
            const repelFactor = 1 - distance / 150;
            const repelX = dx * repelFactor * 0.5;
            newX = x - repelX / 10;
          } else {
            // Slowly return to original position
            newX = x + (newX - x) * 0.95;
          }
        }

        setLogoPosition({ x: newX, y: currentY });
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [x, size, mouseX, mouseY, isMousePresent]);

  return (
    <motion.div
      ref={logoRef}
      className="absolute opacity-20 dark:opacity-10 hover:opacity-40 transition-opacity duration-300"
      style={{
        left: `${logoPosition.x}%`,
        top: logoPosition.y,
        transform: `rotate(${logoPosition.y * 0.2}deg)`,
        zIndex: 1,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.2, 0.15, 0.1, 0.15, 0.2] }}
      transition={{
        opacity: {
          repeat: Infinity,
          duration: 8 + Math.random() * 4,
          ease: "easeInOut",
        },
      }}
      whileHover={{ scale: 1.2, opacity: 0.4 }}
    >
      <div
        className="relative filter drop-shadow-lg"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <Image
          src={src}
          alt={name}
          fill
          className="object-contain"
          sizes={`${size}px`}
        />
      </div>
    </motion.div>
  );
};

export function FallingLogos() {
  const [logos, setLogos] = useState<React.ReactNode[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMousePresent, setIsMousePresent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMousePresent(true);
    };

    const handleMouseLeave = () => {
      setIsMousePresent(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    // Create random logos
    const logoElements = Array.from({ length: 25 }, (_, i) => {
      const logoIndex = Math.floor(Math.random() * techLogos.length);
      const logo = techLogos[logoIndex];
      const x = Math.random() * 100; // Random horizontal position (0-100%)
      const delay = Math.random() * 1; // Random delay
      const size = 30 + Math.random() * 40; // Random size between 30px and 70px

      return (
        <FallingLogo
          key={i}
          src={logo.src}
          name={logo.name}
          x={x}
          delay={delay}
          size={size}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
          isMousePresent={isMousePresent}
        />
      );
    });

    setLogos(logoElements);
  }, [mousePosition, isMousePresent]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden -z-10">
      {logos}
    </div>
  );
}
