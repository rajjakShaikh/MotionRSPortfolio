"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ExperienceEducationSection } from "./experience-education-section";
import { BallCanvas } from "@/components/canvas";
import { SkillNetwork } from "@/components/ui/skill-network";

// Custom hook for window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

interface Skill {
  id: string;
  name: string;
  icon: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: "frontend" | "backend" | "design" | "tools";
  proficiency: number; // 0-100
  relatedSkills?: string[];
}

const skills: Skill[] = [
  {
    id: "react",
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description: "Building interactive UIs with React and its ecosystem",
    level: "intermediate",
    category: "frontend",
    proficiency: 85,
    relatedSkills: ["javascript", "typescript", "redux", "nextjs"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    description:
      "Server-side rendering, static site generation, and API routes",
    level: "intermediate",
    category: "frontend",
    proficiency: 80,
    relatedSkills: ["react", "typescript", "javascript"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    description: "Type-safe JavaScript development",
    level: "intermediate",
    category: "frontend",
    proficiency: 75,
    relatedSkills: ["javascript", "react", "nextjs"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: "/logos/tailwind.svg",
    description: "Utility-first CSS framework for rapid UI development",
    level: "intermediate",
    category: "frontend",
    proficiency: 90,
    relatedSkills: ["css", "html", "shadcn"],
  },
  {
    id: "shadcn",
    name: "Shadcn UI",
    icon: "/logos/shad.svg",
    description: "Component library built with Radix UI and Tailwind CSS",
    level: "intermediate",
    category: "frontend",
    proficiency: 85,
    relatedSkills: ["tailwind", "react"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    description: "Core language for web development",
    level: "intermediate",
    category: "frontend",
    proficiency: 90,
    relatedSkills: ["typescript", "react", "html", "css"],
  },
  {
    id: "html",
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    description: "Semantic markup and structure",
    level: "intermediate",
    category: "frontend",
    proficiency: 95,
    relatedSkills: ["css", "javascript"],
  },
  {
    id: "css",
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    description: "Styling and animations",
    level: "intermediate",
    category: "frontend",
    proficiency: 90,
    relatedSkills: ["html", "tailwind"],
  },
  {
    id: "redux",
    name: "Redux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    description: "State management for complex applications",
    level: "intermediate",
    category: "frontend",
    proficiency: 75,
    relatedSkills: ["react", "javascript"],
  },
  {
    id: "framer",
    name: "Framer Motion",
    icon: "/logos/framer.svg",
    description: "Production-ready animation library for React",
    level: "intermediate",
    category: "frontend",
    proficiency: 80,
    relatedSkills: ["react", "javascript"],
  },
  {
    id: "git",
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    description: "Version control system for tracking changes",
    level: "intermediate",
    category: "tools",
    proficiency: 85,
    relatedSkills: [],
  },
  {
    id: "figma",
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    description: "Collaborative interface design tool",
    level: "intermediate",
    category: "design",
    proficiency: 75,
    relatedSkills: ["css", "tailwind"],
  },
];

export function SkillsSection() {
  const { width } = useWindowSize();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [networkHeight, setNetworkHeight] = useState(600);

  // Adjust network height based on screen size
  useEffect(() => {
    if (width) {
      if (width < 640) {
        setNetworkHeight(500);
      } else if (width < 1024) {
        setNetworkHeight(550);
      } else {
        setNetworkHeight(600);
      }
    }
  }, [width]);

  const getSkillLevelColor = (level: Skill["level"]) => {
    switch (level) {
      case "beginner":
        return "bg-blue-500/20 text-blue-500 dark:bg-blue-500/10";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-500 dark:bg-yellow-500/10";
      case "advanced":
        return "bg-orange-500/20 text-orange-500 dark:bg-orange-500/10";
      case "expert":
        return "bg-primary/20 text-primary";
      default:
        return "bg-green-500/20 text-green-500";
    }
  };

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  // Category buttons with counts
  const categories = [
    { id: "all", label: "All Skills", count: skills.length },
    {
      id: "frontend",
      label: "Frontend",
      count: skills.filter((s) => s.category === "frontend").length,
    },
    {
      id: "design",
      label: "Design",
      count: skills.filter((s) => s.category === "design").length,
    },
    {
      id: "tools",
      label: "Tools",
      count: skills.filter((s) => s.category === "tools").length,
    },
  ].filter((cat) => cat.count > 0);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-muted/30" />
      <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center opacity-5" />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Technical Skills
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Explore my interconnected web of technical expertise
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card hover:bg-card/80 text-muted-foreground hover:text-foreground border border-border"
              )}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label} ({category.count})
            </motion.button>
          ))}
        </div>

        {/* Skill Network Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SkillNetwork
                skills={filteredSkills}
                width={width ? width - 100 : 1000}
                height={networkHeight}
                getSkillLevelColor={getSkillLevelColor}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Separator */}
        <div className="my-20 flex items-center justify-center">
          <div className="h-px w-full max-w-sm bg-border"></div>
          <div className="mx-4 text-muted-foreground">My Journey</div>
          <div className="h-px w-full max-w-sm bg-border"></div>
        </div>

        {/* Experience & Education Section */}
        <ExperienceEducationSection />
      </div>
    </section>
  );
}
