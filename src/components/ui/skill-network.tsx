"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Skill {
  id: string;
  name: string;
  icon: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: string;
  proficiency: number;
  relatedSkills?: string[];
}

interface SkillNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  skill: Skill;
}

interface SkillEdge {
  source: string;
  target: string;
  strength: number;
}

interface SkillNetworkProps {
  skills: Skill[];
  width: number;
  height: number;
  getSkillLevelColor: (level: string) => string;
}

export function SkillNetwork({
  skills,
  width,
  height,
  getSkillLevelColor,
}: SkillNetworkProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<SkillNode[]>([]);
  const [edges, setEdges] = useState<SkillEdge[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Initialize the network
  useEffect(() => {
    if (!canvasRef.current || isInitialized) return;

    // Create nodes
    const initialNodes: SkillNode[] = skills.map((skill) => {
      // Position nodes in a circle initially
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.min(width, height) * 0.3 * Math.random();
      const x = width / 2 + Math.cos(angle) * radius;
      const y = height / 2 + Math.sin(angle) * radius;

      return {
        id: skill.id,
        x,
        y,
        vx: 0,
        vy: 0,
        radius: 30 + skill.proficiency / 10, // Size based on proficiency
        skill,
      };
    });

    // Create edges based on related skills
    const initialEdges: SkillEdge[] = [];
    skills.forEach((skill) => {
      if (skill.relatedSkills) {
        skill.relatedSkills.forEach((relatedId) => {
          // Only add edge if both skills exist
          if (skills.some((s) => s.id === relatedId)) {
            initialEdges.push({
              source: skill.id,
              target: relatedId,
              strength: 0.5,
            });
          }
        });
      }
    });

    // Add some random connections to make the network more interesting
    for (let i = 0; i < skills.length; i++) {
      const skill = skills[i];
      const numConnections = Math.floor(Math.random() * 3) + 1; // 1-3 random connections

      for (let j = 0; j < numConnections; j++) {
        const targetIndex = Math.floor(Math.random() * skills.length);
        if (targetIndex !== i) {
          initialEdges.push({
            source: skill.id,
            target: skills[targetIndex].id,
            strength: 0.3,
          });
        }
      }
    }

    setNodes(initialNodes);
    setEdges(initialEdges);
    setIsInitialized(true);
  }, [skills, width, height, isInitialized]);

  // Force-directed layout simulation
  useEffect(() => {
    if (!isInitialized || nodes.length === 0) return;

    const simulate = () => {
      setNodes((currentNodes) => {
        const newNodes = [...currentNodes];

        // Apply forces
        for (let i = 0; i < newNodes.length; i++) {
          const node = newNodes[i];

          // Apply repulsive forces between nodes
          for (let j = 0; j < newNodes.length; j++) {
            if (i !== j) {
              const otherNode = newNodes[j];
              const dx = node.x - otherNode.x;
              const dy = node.y - otherNode.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minDistance = node.radius + otherNode.radius + 20;

              if (distance < minDistance) {
                const force = ((minDistance - distance) / distance) * 0.05;
                node.vx += dx * force;
                node.vy += dy * force;
              }
            }
          }

          // Apply attractive forces along edges
          edges.forEach((edge) => {
            if (edge.source === node.id || edge.target === node.id) {
              const otherNodeId =
                edge.source === node.id ? edge.target : edge.source;
              const otherNode = newNodes.find((n) => n.id === otherNodeId);

              if (otherNode) {
                const dx = otherNode.x - node.x;
                const dy = otherNode.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const targetDistance = 100; // Desired distance between connected nodes
                const force =
                  ((distance - targetDistance) / distance) *
                  0.01 *
                  edge.strength;

                node.vx += dx * force;
                node.vy += dy * force;
              }
            }
          });

          // Apply center gravity
          const centerX = width / 2;
          const centerY = height / 2;
          const dx = centerX - node.x;
          const dy = centerY - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = Math.min(width, height) * 0.4;

          if (distance > maxDistance) {
            const force = ((distance - maxDistance) / distance) * 0.02;
            node.vx += dx * force;
            node.vy += dy * force;
          }

          // Update position with velocity
          node.x += node.vx;
          node.y += node.vy;

          // Damping
          node.vx *= 0.9;
          node.vy *= 0.9;

          // Boundary constraints
          const padding = node.radius;
          if (node.x < padding) {
            node.x = padding;
            node.vx = Math.abs(node.vx) * 0.5;
          }
          if (node.x > width - padding) {
            node.x = width - padding;
            node.vx = -Math.abs(node.vx) * 0.5;
          }
          if (node.y < padding) {
            node.y = padding;
            node.vy = Math.abs(node.vy) * 0.5;
          }
          if (node.y > height - padding) {
            node.y = height - padding;
            node.vy = -Math.abs(node.vy) * 0.5;
          }
        }

        return newNodes;
      });

      animationRef.current = requestAnimationFrame(simulate);
    };

    animationRef.current = requestAnimationFrame(simulate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInitialized, nodes.length, edges, width, height]);

  // Handle skill selection
  const handleSkillClick = (skillId: string) => {
    setSelectedSkill(skillId === selectedSkill ? null : skillId);
  };

  // Get connected skills for highlighting
  const getConnectedSkills = (skillId: string) => {
    return edges
      .filter((edge) => edge.source === skillId || edge.target === skillId)
      .map((edge) => (edge.source === skillId ? edge.target : edge.source));
  };

  const connectedSkills = selectedSkill
    ? getConnectedSkills(selectedSkill)
    : [];

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full overflow-hidden rounded-xl border border-border/30 bg-card/20 backdrop-blur-sm"
      style={{ minHeight: `${height}px` }}
    >
      {/* Edges */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {edges.map((edge, index) => {
          const sourceNode = nodes.find((node) => node.id === edge.source);
          const targetNode = nodes.find((node) => node.id === edge.target);

          if (!sourceNode || !targetNode) return null;

          const isHighlighted =
            selectedSkill &&
            (selectedSkill === edge.source || selectedSkill === edge.target);

          return (
            <motion.line
              key={`${edge.source}-${edge.target}-${index}`}
              x1={sourceNode.x}
              y1={sourceNode.y}
              x2={targetNode.x}
              y2={targetNode.y}
              stroke={isHighlighted ? "var(--primary)" : "var(--border)"}
              strokeWidth={isHighlighted ? 2 : 1}
              strokeOpacity={isHighlighted ? 0.8 : 0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: index * 0.01 }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const isSelected = selectedSkill === node.id;
        const isConnected = connectedSkills.includes(node.id);
        const isHighlighted = isSelected || isConnected;
        const isHovered = hoveredSkill === node.id;

        return (
          <motion.div
            key={node.id}
            className={cn(
              "absolute flex items-center justify-center rounded-full cursor-pointer transition-shadow duration-300",
              isHighlighted ? "shadow-lg" : "shadow-md",
              isSelected ? "z-20" : isConnected ? "z-10" : "z-0"
            )}
            style={{
              left: node.x - node.radius,
              top: node.y - node.radius,
              width: node.radius * 2,
              height: node.radius * 2,
              backgroundColor: isHighlighted
                ? "var(--card)"
                : "var(--card-foreground-muted)",
              opacity: selectedSkill && !isHighlighted ? 0.4 : 1,
              border: isSelected
                ? "2px solid var(--primary)"
                : isConnected
                ? "2px solid var(--primary-light)"
                : "1px solid var(--border)",
            }}
            animate={{
              scale: isHovered ? 1.1 : 1,
              boxShadow: isHovered
                ? "0 0 15px 5px rgba(var(--primary-rgb), 0.3)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            whileHover={{ scale: 1.1 }}
            onClick={() => handleSkillClick(node.id)}
            onHoverStart={() => setHoveredSkill(node.id)}
            onHoverEnd={() => setHoveredSkill(null)}
          >
            <img
              src={node.skill.icon}
              alt={node.skill.name}
              className="w-1/2 h-1/2 object-contain"
            />

            {/* Skill name label */}
            <div
              className={cn(
                "absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md text-xs font-medium",
                isSelected || isHovered ? "opacity-100" : "opacity-0",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-card-foreground"
              )}
              style={{
                transition: "opacity 0.2s ease",
              }}
            >
              {node.skill.name}
            </div>

            {/* Skill level indicator */}
            {(isSelected || isHovered) && (
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] capitalize",
                    getSkillLevelColor(node.skill.level)
                  )}
                >
                  {node.skill.level}
                </Badge>
              </div>
            )}
          </motion.div>
        );
      })}

      {/* Selected skill details */}
      {selectedSkill && (
        <motion.div
          className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-md p-4 rounded-lg border border-border shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {(() => {
            const skill = skills.find((s) => s.id === selectedSkill);
            if (!skill) return null;

            return (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 bg-card rounded-full p-2 border border-border">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">{skill.name}</h3>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs capitalize",
                        getSkillLevelColor(skill.level)
                      )}
                    >
                      {skill.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {skill.description}
                  </p>

                  {/* Proficiency bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Proficiency</span>
                      <span>{skill.proficiency}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={cn(
                          "h-full",
                          skill.level === "beginner"
                            ? "bg-blue-500"
                            : skill.level === "intermediate"
                            ? "bg-yellow-500"
                            : skill.level === "advanced"
                            ? "bg-orange-500"
                            : "bg-primary"
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Related skills */}
                  {connectedSkills.length > 0 && (
                    <div className="mt-3">
                      <span className="text-xs font-medium">
                        Related Skills:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {connectedSkills.map((skillId) => {
                          const relatedSkill = skills.find(
                            (s) => s.id === skillId
                          );
                          if (!relatedSkill) return null;

                          return (
                            <Badge
                              key={skillId}
                              variant="secondary"
                              className="text-xs cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSkillClick(skillId);
                              }}
                            >
                              {relatedSkill.name}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}

      {/* Instructions */}
      {!selectedSkill && (
        <div className="absolute bottom-4 left-4 right-4 text-center text-sm text-muted-foreground bg-card/50 backdrop-blur-sm p-2 rounded-lg">
          Click on a skill to see details and connections
        </div>
      )}
    </div>
  );
}
