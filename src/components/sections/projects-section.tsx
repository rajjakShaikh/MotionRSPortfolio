"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: "proj1",
    title: "National Payments Corporation of India (NPCI)",
    description:
      "Developed a robust NPCI Portal system with three modules: Admin Portal, Issuer Portal, and Corporate Portal, using React JS, Tailwind CSS, Axios, and Redux Toolkit. The Admin Portal allows onboarding of banks as issuers, while the Issuer Portal manages corporate accounts, and the Corporate Portal adds and manages employees. Integrated crypto-js for secure data handling, Chart.js for data visualization, and Formik for form validation. Designed with dynamic routing and a fully responsive grid layout, ensuring seamless navigation and usability across devices. This project demonstrates expertise in secure, scalable, and responsive web applications.",
    image: "/images/npci-4A.jpg",
    tags: [
      "React",
      "Redux",
      "React-Query",
      "Tailwind CSS",
      "Chart.js",
      "Formik",
    ],
    demoUrl: "#",
    featured: true,
  },
  {
    id: "proj2",
    title: "Fitness Tracker App",
    description:
      "Developed a modern and responsive Shoe Store Website using React JS, Redux Toolkit, and Tailwind CSS, featuring a sleek and user-friendly interface. The website includes functionality for adding products to a cart with real-time updates, wishlist management, and category-based filtering for personalized browsing. It ensures seamless performance across devices with a fully responsive design. Efficient state management using Redux Toolkit enables smooth handling of cart and wishlist features. This project demonstrates expertise in creating visually appealing, functional, and dynamic e-commerce applications",
    image: "/images/npci-4A.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"],
    demoUrl: "#",
    featured: true,
  },
  {
    id: "proj3",
    title: "Real Estate Listing Platform",
    description:
      "Property listing website with advanced search filters, interactive maps, and user accounts for saved properties. Built with the MERN stack (MongoDB, Express, React, Node.js) for a full-stack solution. Implemented Redux for state management and responsive design for all devices.",
    image: "/images/npci-4A.jpg",
    tags: ["React", "Redux", "MongoDB", "Express", "Node.js"],
    demoUrl: "#",
    featured: true,
  },
];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [visibleProjects, setVisibleProjects] = useState<Project[]>(projects);
  const [expandedProjects, setExpandedProjects] = useState<
    Record<string, boolean>
  >({});

  // Extract unique tags from all projects
  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags))
  ).sort();

  // Filter projects based on selected tag
  const filterProjects = (tag: string) => {
    setActiveFilter(tag);

    if (tag === "all") {
      setVisibleProjects(projects);
    } else if (tag === "featured") {
      setVisibleProjects(projects.filter((project) => project.featured));
    } else {
      setVisibleProjects(
        projects.filter((project) => project.tags.includes(tag))
      );
    }
  };

  // Toggle description expansion
  const toggleDescription = (projectId: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section id="projects" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center mb-10"
        >
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            A showcase of my latest work and technical capabilities
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          className="flex flex-wrap gap-2 justify-center mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => filterProjects("all")}
            className="rounded-full"
          >
            All Projects
          </Button>
          <Button
            variant={activeFilter === "featured" ? "default" : "outline"}
            size="sm"
            onClick={() => filterProjects("featured")}
            className="rounded-full"
          >
            Featured
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={activeFilter === tag ? "default" : "outline"}
              size="sm"
              onClick={() => filterProjects(tag)}
              className="rounded-full"
            >
              {tag}
            </Button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {visibleProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500">
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="pt-6 pb-2 flex-grow">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <div className="relative">
                    <div
                      className={`text-muted-foreground text-sm mb-4 ${
                        !expandedProjects[project.id] ? "line-clamp-3" : ""
                      }`}
                    >
                      {project.description}
                    </div>
                    {project.description.length > 150 &&
                      !expandedProjects[project.id] && (
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent"></div>
                      )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.map((tag) => (
                      <Badge
                        key={`${project.id}-${tag}`}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2 pt-2">
                  {project.description.length > 150 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-1/2 flex items-center gap-1"
                      onClick={() => toggleDescription(project.id)}
                    >
                      {expandedProjects[project.id] ? (
                        <>
                          <ChevronUp className="h-3 w-3" /> Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3 w-3" /> Read More
                        </>
                      )}
                    </Button>
                  )}
                  <Button
                    asChild
                    size="sm"
                    className={
                      project.description.length > 150 ? "w-1/2" : "w-full"
                    }
                  >
                    <Link
                      href={project.demoUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" /> Demo
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
