"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Skill {
  id: string;
  name: string;
  icon: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: "frontend" | "backend" | "design" | "tools";
  proficiency: number;
}

interface SkillCubeProps {
  skills: Skill[];
  getSkillLevelColor: (level: string) => string;
}

export function SkillCube({ skills, getSkillLevelColor }: SkillCubeProps) {
  const [currentFace, setCurrentFace] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [cubeSize, setCubeSize] = useState(300);
  const cubeRef = useRef<HTMLDivElement>(null);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const controls = useAnimation();

  // Group skills into faces (6 faces for a cube)
  const skillsPerFace = Math.ceil(skills.length / 6);
  const faces = Array.from({ length: 6 }, (_, i) => 
    skills.slice(i * skillsPerFace, (i + 1) * skillsPerFace)
  ).filter(face => face.length > 0);

  // Adjust cube size based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCubeSize(240);
      } else if (window.innerWidth < 1024) {
        setCubeSize(280);
      } else {
        setCubeSize(320);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate cube
  useEffect(() => {
    if (autoRotate && !isHovered && !selectedSkill) {
      autoRotateTimerRef.current = setInterval(() => {
        setCurrentFace((prev) => (prev + 1) % faces.length);
      }, 5000);
    }

    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
    };
  }, [autoRotate, faces.length, isHovered, selectedSkill]);

  // Handle navigation
  const navigateCube = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentFace((prev) => (prev + 1) % faces.length);
    } else {
      setCurrentFace((prev) => (prev - 1 + faces.length) % faces.length);
    }
  };

  // Get transform for each face
  const getFaceTransform = (faceIndex: number) => {
    const isActive = faceIndex === currentFace;
    
    switch (faceIndex) {
      case 0: // front
        return `rotateY(0deg) translateZ(${cubeSize / 2}px) ${isActive ? 'scale(1.05)' : ''}`;
      case 1: // right
        return `rotateY(90deg) translateZ(${cubeSize / 2}px) ${isActive ? 'scale(1.05)' : ''}`;
      case 2: // back
        return `rotateY(180deg) translateZ(${cubeSize / 2}px) ${isActive ? 'scale(1.05)' : ''}`;
      case 3: // left
        return `rotateY(-90deg) translateZ(${cubeSize / 2}px) ${isActive ? 'scale(1.05)' : ''}`;
      case 4: // top
        return `rotateX(90deg) translateZ(${cubeSize / 2}px) ${isActive ? 'scale(1.05)' : ''}`;
      case 5: // bottom
        return `rotateX(-90deg) translateZ(${cubeSize / 2}px) ${isActive ? 'scale(1.05)' : ''}`;
      default:
        return '';
    }
  };

  // Get cube transform based on current face
  const getCubeTransform = () => {
    switch (currentFace) {
      case 0: // front
        return 'rotateY(0deg)';
      case 1: // right
        return 'rotateY(-90deg)';
      case 2: // back
        return 'rotateY(-180deg)';
      case 3: // left
        return 'rotateY(90deg)';
      case 4: // top
        return 'rotateX(-90deg)';
      case 5: // bottom
        return 'rotateX(90deg)';
      default:
        return 'rotateY(0deg)';
    }
  };

  // Handle skill selection
  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(selectedSkill?.id === skill.id ? null : skill);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div 
        className="relative perspective-1000 w-full flex items-center justify-center my-8"
        style={{ height: `${cubeSize + 100}px` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Cube container */}
        <div
          ref={cubeRef}
          className="relative preserve-3d transition-transform duration-1000 ease-out"
          style={{
            width: `${cubeSize}px`,
            height: `${cubeSize}px`,
            transform: `${getCubeTransform()} rotateZ(0deg)`,
          }}
        >
          {/* Cube faces */}
          {faces.map((faceskills, faceIndex) => (
            <div
              key={faceIndex}
              className={cn(
                "absolute inset-0 preserve-3d backface-hidden rounded-xl border border-border/50 transition-transform duration-1000",
                currentFace === faceIndex 
                  ? "bg-card/90 backdrop-blur-md shadow-xl" 
                  : "bg-card/70 backdrop-blur-sm"
              )}
              style={{
                width: `${cubeSize}px`,
                height: `${cubeSize}px`,
                transform: getFaceTransform(faceIndex),
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-60 rounded-xl" />
              
              {/* Face content */}
              <div className="relative z-10 h-full w-full p-4 flex flex-col">
                <div className="text-center mb-2">
                  <h3 className="text-lg font-semibold">
                    {faceIndex === 0 ? "Frontend" : 
                     faceIndex === 1 ? "UI Libraries" : 
                     faceIndex === 2 ? "Languages" : 
                     faceIndex === 3 ? "Frameworks" : 
                     faceIndex === 4 ? "Tools" : "Design"}
                  </h3>
                </div>
                
                <div className="flex-1 grid grid-cols-2 gap-3 p-2 overflow-hidden">
                  {faceskills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      className={cn(
                        "flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition-all",
                        "hover:bg-primary/10 hover:shadow-md",
                        selectedSkill?.id === skill.id && "bg-primary/20 ring-1 ring-primary"
                      )}
                      onClick={() => handleSkillClick(skill)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative w-12 h-12 mb-2 flex items-center justify-center">
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className="w-10 h-10 object-contain"
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full bg-primary/10"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 0.3, 0.7]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-center">{skill.name}</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "mt-1 text-xs capitalize",
                          getSkillLevelColor(skill.level)
                        )}
                      >
                        {skill.level}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation controls */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 pb-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-card/80 backdrop-blur-sm hover:bg-primary/20"
            onClick={() => navigateCube('prev')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "rounded-full bg-card/80 backdrop-blur-sm",
              autoRotate ? "bg-primary/20 text-primary" : "hover:bg-primary/20"
            )}
            onClick={() => setAutoRotate(!autoRotate)}
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-card/80 backdrop-blur-sm hover:bg-primary/20"
            onClick={() => navigateCube('next')}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Face indicator */}
        <div className="absolute top-0 left-0 right-0 flex justify-center gap-2 pt-4">
          {faces.map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full",
                currentFace === index ? "bg-primary" : "bg-muted"
              )}
              whileHover={{ scale: 1.5 }}
              onClick={() => setCurrentFace(index)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>

      {/* Selected skill details */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl mx-auto mt-8 p-6 rounded-xl bg-card/90 backdrop-blur-md border border-border/50 shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <img 
                  src={selectedSkill.icon} 
                  alt={selectedSkill.name} 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold">{selectedSkill.name}</h3>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs capitalize",
                      getSkillLevelColor(selectedSkill.level)
                    )}
                  >
                    {selectedSkill.level}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{selectedSkill.description}</p>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium flex items-center gap-1">
                      <Info className="h-3 w-3" /> Proficiency
                    </span>
                    <span>{selectedSkill.proficiency}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={cn(
                        "h-full",
                        selectedSkill.level === "beginner" ? "bg-blue-500" :
                        selectedSkill.level === "intermediate" ? "bg-yellow-500" :
                        selectedSkill.level === "advanced" ? "bg-orange-500" :
                        "bg-primary"
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.proficiency}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
