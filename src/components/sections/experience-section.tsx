"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { CalendarDays, GraduationCap, Briefcase } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string[];
  type: "education" | "work";
  skills?: string[];
}

const timelineItems: TimelineItem[] = [
  {
    id: "exp1",
    title: "Senior Frontend Developer",
    organization: "TechVision Solutions",
    date: "2022-01-01",
    description: [
      "Lead a team of 5 developers in building modern web applications for enterprise clients",
      "Implemented design systems and component libraries that reduced development time by 30%",
      "Optimized application performance, achieving 40% faster load times across all client projects",
      "Established code review processes and quality standards for the frontend team"
    ],
    type: "work",
    skills: ["React", "Next.js", "TypeScript", "Design Systems", "Team Leadership"]
  },
  {
    id: "exp2",
    title: "Frontend Developer",
    organization: "Digital Innovators",
    date: "2019-03-01",
    description: [
      "Developed responsive web applications for diverse clients across various industries",
      "Collaborated with designers to implement pixel-perfect UI components and animations",
      "Built reusable component libraries and contributed to internal documentation",
      "Mentored junior developers and conducted knowledge-sharing sessions"
    ],
    type: "work",
    skills: ["React", "JavaScript", "CSS/SCSS", "Webpack", "RESTful APIs"]
  },
  {
    id: "exp3",
    title: "Junior Web Developer",
    organization: "Creative Web Studios",
    date: "2017-09-01",
    description: [
      "Created responsive websites for small businesses and e-commerce platforms",
      "Implemented modern CSS techniques and responsive design principles",
      "Developed custom WordPress themes and plugins for content management",
      "Assisted with UX improvements and performance optimizations"
    ],
    type: "work",
    skills: ["HTML5", "CSS3", "JavaScript", "WordPress", "PHP"]
  },
  {
    id: "edu1",
    title: "Master's in Computer Science",
    organization: "Tech University",
    date: "2016-08-01",
    description: [
      "Specialized in Human-Computer Interaction and Web Technologies",
      "Capstone project: A progressive web application for accessibility testing",
      "Research assistant for web performance optimization techniques"
    ],
    type: "education"
  },
  {
    id: "edu2",
    title: "Bachelor's in Web Design",
    organization: "Creative Arts College",
    date: "2014-05-01",
    description: [
      "Graduated with honors (GPA 3.8/4.0)",
      "Focused on UI/UX design principles and frontend development",
      "Senior project: Interactive data visualization dashboard"
    ],
    type: "education"
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Experience & Education
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            My professional journey and educational background
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-border" />

          {timelineItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative grid items-center grid-cols-1 gap-6 mb-12 md:grid-cols-2 ${
                index % 2 === 0 ? "md:grid-flow-col" : "md:grid-flow-col-dense"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-card border-4 border-background shadow flex items-center justify-center z-10">
                  {item.type === "education" ? (
                    <GraduationCap className="h-5 w-5 text-primary" />
                  ) : (
                    <Briefcase className="h-5 w-5 text-primary" />
                  )}
                </div>
              </div>

              {/* Content card */}
              <div
                className={`bg-card rounded-lg p-6 border shadow-sm md:col-span-1 ${
                  index % 2 === 0 ? "md:text-right" : "md:text-left"
                }`}
              >
                <div className="flex items-center gap-2 mb-2 text-muted-foreground text-sm">
                  <CalendarDays className="h-4 w-4" />
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-primary font-medium">{item.organization}</p>
                <ul className={`mt-3 space-y-1 text-muted-foreground ${
                  index % 2 === 0 ? "md:ml-auto" : ""
                }`}>
                  {item.description.map((point, i) => (
                    <li key={i} className="text-sm">
                      {point}
                    </li>
                  ))}
                </ul>
                {item.skills && (
                  <div className={`flex flex-wrap gap-1.5 mt-4 ${
                    index % 2 === 0 ? "md:justify-end" : ""
                  }`}>
                    {item.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Empty column for layout */}
              <div className="hidden md:block md:col-span-1"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
