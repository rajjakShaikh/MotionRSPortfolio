"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
}

// Individual falling logo component
const FallingLogo = ({ src, name, x, delay, size }: LogoProps) => {
  return (
    <motion.div
      className="absolute opacity-20 dark:opacity-10"
      style={{ left: `${x}%` }}
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: ["0vh", "100vh"],
        opacity: [0.2, 0.15, 0.1, 0.05],
        rotate: [0, 360],
      }}
      transition={{
        y: {
          repeat: Infinity,
          duration: 15 + Math.random() * 10,
          delay,
          ease: "linear",
        },
        opacity: {
          repeat: Infinity,
          duration: 15 + Math.random() * 10,
          delay,
          ease: "linear",
        },
        rotate: {
          repeat: Infinity,
          duration: 20 + Math.random() * 10,
          delay,
          ease: "linear",
        },
      }}
    >
      <div
        className="relative"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <Image src={src} alt={name} fill className="object-contain" />
      </div>
    </motion.div>
  );
};

export function FallingLogos() {
  const [logos, setLogos] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Create 20 random logos
    const logoElements = Array.from({ length: 30 }, (_, i) => {
      const logoIndex = Math.floor(Math.random() * techLogos.length);
      const logo = techLogos[logoIndex];
      const x = Math.random() * 150; // Random horizontal position
      const delay = Math.random() * 3; // Random delay
      const size = 30 + Math.random() * 40; // Random size between 30px and 70px

      return (
        <FallingLogo
          key={i}
          src={logo.src}
          name={logo.name}
          x={x}
          delay={delay}
          size={size}
        />
      );
    });

    setLogos(logoElements);
  }, []);

  return <div className="absolute inset-0 overflow-hidden -z-10">{logos}</div>;
}
