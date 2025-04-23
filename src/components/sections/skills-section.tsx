"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { ExperienceEducationSection } from "./experience-education-section";
import { BallCanvas } from "@/components/canvas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface Skill {
  name: string;
  icon: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: "frontend" | "backend" | "design" | "tools";
  proficiency: number; // 0-100
}

const skills: Skill[] = [
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description: "Building interactive UIs with React and its ecosystem",
    level: "intermediate",
    category: "frontend",
    proficiency: 85,
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    description:
      "Server-side rendering, static site generation, and API routes",
    level: "intermediate",
    category: "frontend",
    proficiency: 80,
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    description: "Type-safe JavaScript development",
    level: "intermediate",
    category: "frontend",
    proficiency: 75,
  },
  {
    name: "Tailwind CSS",
    icon: "/logos/tailwind.svg",
    description: "Utility-first CSS framework for rapid UI development",
    level: "intermediate",
    category: "frontend",
    proficiency: 90,
  },
  {
    name: "Shadcn Ui",
    icon: "/logos/shad.svg",
    description: "Utility-first CSS framework for rapid UI development",
    level: "intermediate",
    category: "frontend",
    proficiency: 85,
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    description: "Core language for web development",
    level: "intermediate",
    category: "frontend",
    proficiency: 90,
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    description: "Semantic markup and structure",
    level: "intermediate",
    category: "frontend",
    proficiency: 95,
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    description: "Styling and animations",
    level: "intermediate",
    category: "frontend",
    proficiency: 90,
  },
  {
    name: "Redux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    description: "State management for complex applications",
    level: "intermediate",
    category: "frontend",
    proficiency: 75,
  },
  // Uncomment and add more skills as needed
  // {
  //   name: "Node.js",
  //   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  //   description: "JavaScript runtime for server-side development",
  //   level: "intermediate",
  //   category: "backend",
  //   proficiency: 70
  // },
];

// Component for the skill proficiency bar
const SkillBar = ({
  proficiency,
  color,
}: {
  proficiency: number;
  color: string;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        width: `${proficiency}%`,
        transition: { duration: 1, ease: "easeOut" },
      });
    }
  }, [controls, inView, proficiency]);

  return (
    <div ref={ref} className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        className={`h-full ${color}`}
        initial={{ width: 0 }}
        animate={controls}
      />
    </div>
  );
};

// Component for the 3D skill ball
const SkillBall = ({ icon }: { icon: string }) => {
  return (
    <div className="h-24 w-24">
      <BallCanvas icon={icon} />
    </div>
  );
};

export function SkillsSection() {
  const [activeView, setActiveView] = useState<"grid" | "detailed">("grid");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Skills" },
    { id: "frontend", label: "Frontend" },
    // Uncomment if you add more categories
    // { id: "backend", label: "Backend" },
    // { id: "design", label: "Design" },
    // { id: "tools", label: "Tools & Libraries" },
  ];

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

  const getProgressBarColor = (level: Skill["level"]) => {
    switch (level) {
      case "beginner":
        return "bg-blue-500";
      case "intermediate":
        return "bg-yellow-500";
      case "advanced":
        return "bg-orange-500";
      case "expert":
        return "bg-primary";
      default:
        return "bg-green-500";
    }
  };

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-20 bg-muted/50 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/5 to-background/10 pointer-events-none" />

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
            A collection of technologies and tools I've worked with
          </p>
        </motion.div>

        {/* View toggle and category filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <Tabs defaultValue="all" className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 w-full sm:w-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="text-sm"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <Button
              variant={activeView === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("grid")}
              className="text-xs"
            >
              Grid View
            </Button>
            <Button
              variant={activeView === "detailed" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("detailed")}
              className="text-xs"
            >
              Detailed View
            </Button>
          </div>
        </div>

        {/* Grid View */}
        {activeView === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ y: -5, scale: 1.03 }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="bg-card/80 backdrop-blur-sm p-4 rounded-xl border border-border/50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full">
                      <div className="relative h-12 w-12 flex items-center justify-center">
                        <img
                          src={skill.icon}
                          className="h-10 w-10 object-contain z-10"
                          alt={skill.name}
                        />
                        {hoveredSkill === skill.name && (
                          <motion.div
                            className="absolute inset-0 bg-primary/10 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1.5 }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                          />
                        )}
                      </div>
                      <p className="font-medium text-center">{skill.name}</p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs capitalize",
                          getSkillLevelColor(skill.level)
                        )}
                      >
                        {skill.level}
                      </Badge>
                      <div className="w-full mt-1">
                        <SkillBar
                          proficiency={skill.proficiency}
                          color={getProgressBarColor(skill.level)}
                        />
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 backdrop-blur-md bg-card/90 border-border/50">
                    <div className="flex items-center gap-3">
                      <img
                        src={skill.icon}
                        className="h-8 w-8 object-contain"
                        alt={skill.name}
                      />
                      <h4 className="text-lg font-semibold">{skill.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {skill.description}
                    </p>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Proficiency</span>
                        <span>{skill.proficiency}%</span>
                      </div>
                      <SkillBar
                        proficiency={skill.proficiency}
                        color={getProgressBarColor(skill.level)}
                      />
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* Detailed View */}
        {activeView === "detailed" && (
          <div className="space-y-8">
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="flex-shrink-0">
                    <SkillBall icon={skill.icon} />
                  </div>
                  <div className="flex-grow space-y-4 text-center md:text-left">
                    <div>
                      <h3 className="text-xl font-bold">{skill.name}</h3>
                      <p className="text-muted-foreground mt-1">
                        {skill.description}
                      </p>
                    </div>

                    <div className="w-full">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Proficiency</span>
                        <span className="font-medium">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <SkillBar
                        proficiency={skill.proficiency}
                        color={getProgressBarColor(skill.level)}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs capitalize",
                          getSkillLevelColor(skill.level)
                        )}
                      >
                        {skill.level}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

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
