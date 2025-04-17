"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";

interface Skill {
  name: string;
  icon: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: "frontend" | "backend" | "design" | "tools";
}

const skills: Skill[] = [
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description: "Building interactive UIs with React and its ecosystem",
    level: "expert",
    category: "frontend"
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    description: "Server-side rendering, static site generation, and API routes",
    level: "expert",
    category: "frontend"
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    description: "Type-safe JavaScript development",
    level: "advanced",
    category: "frontend"
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    description: "Utility-first CSS framework for rapid UI development",
    level: "expert",
    category: "frontend"
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    description: "Core language for web development",
    level: "expert",
    category: "frontend"
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    description: "Semantic markup and structure",
    level: "expert",
    category: "frontend"
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    description: "Styling and animations",
    level: "expert",
    category: "frontend"
  },
  {
    name: "Redux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    description: "State management for complex applications",
    level: "advanced",
    category: "frontend"
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    description: "JavaScript runtime for server-side development",
    level: "intermediate",
    category: "backend"
  },
  {
    name: "Express",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    description: "Web framework for Node.js",
    level: "intermediate",
    category: "backend"
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    description: "NoSQL database for modern applications",
    level: "intermediate",
    category: "backend"
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    description: "Collaborative UI design tool",
    level: "advanced",
    category: "design"
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    description: "Version control system",
    level: "advanced",
    category: "tools"
  },
  {
    name: "Webpack",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
    description: "Module bundler for JavaScript applications",
    level: "intermediate",
    category: "tools"
  },
  {
    name: "Jest",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
    description: "JavaScript testing framework",
    level: "intermediate",
    category: "tools"
  }
];

export function SkillsSection() {
  const categories = [
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "design", label: "Design" },
    { id: "tools", label: "Tools & Libraries" }
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

  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Technical Skills
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            A collection of technologies and tools I've worked with
          </p>
        </motion.div>

        <div className="space-y-10">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-6">{category.label}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {skills
                  .filter((skill) => skill.category === category.id)
                  .map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05 + i * 0.05,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="bg-card p-4 rounded-lg shadow-sm border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all duration-300 h-full">
                            <img
                              src={skill.icon}
                              className="h-10 w-10 object-contain"
                              alt={skill.name}
                            />
                            <p className="font-medium text-center">{skill.name}</p>
                            <Badge
                              variant="outline"
                              className={cn(
                                "mt-1 text-xs capitalize",
                                getSkillLevelColor(skill.level)
                              )}
                            >
                              {skill.level}
                            </Badge>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="flex items-center gap-2">
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
                        </HoverCardContent>
                      </HoverCard>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
