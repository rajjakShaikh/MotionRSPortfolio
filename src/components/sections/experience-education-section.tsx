"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  Award,
} from "lucide-react";
import { experiences, education } from "@/data/experience-education";

export function ExperienceEducationSection() {
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const [expandedEdu, setExpandedEdu] = useState<number | null>(null);

  const toggleExpand = (id: number, type: "experience" | "education") => {
    if (type === "experience") {
      setExpandedExp(expandedExp === id ? null : id);
    } else {
      setExpandedEdu(expandedEdu === id ? null : id);
    }
  };

  return (
    <section id="experience-education" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Experience & Education
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            My professional journey and academic background
          </p>
        </motion.div>

        <Tabs defaultValue="experience" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>Experience</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>Education</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experience" className="space-y-8">
            <div className="relative">
              {/* Timeline line */}
              <motion.div
                className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute w-full h-24 bg-gradient-to-b from-transparent via-primary to-transparent"
                  initial={{ top: "-100%" }}
                  animate={{ top: "100%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Experience cards */}
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative md:w-1/2 ${
                    index % 2 === 0 ? "md:ml-auto md:pl-8" : "md:pr-8"
                  } mb-12`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-[-8px] md:left-auto md:right-[-8px] top-6 w-4 h-4 rounded-full bg-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: index * 0.2,
                      duration: 0.5,
                      type: "spring",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/30"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />
                  </motion.div>

                  {/* Card */}
                  <Card className="w-full border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden group transform hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-start gap-4 pb-2">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {exp.role}
                        </CardTitle>
                        <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <span className="font-medium">{exp.company}</span>
                          <div className="hidden sm:flex h-1 w-1 rounded-full bg-muted-foreground"></div>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {exp.location}
                          </span>
                        </CardDescription>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleExpand(exp.id, "experience")}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={
                          expandedExp === exp.id
                            ? "Collapse details"
                            : "Expand details"
                        }
                      >
                        {expandedExp === exp.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </CardHeader>

                    <CardContent className="pb-3">
                      <p className="text-muted-foreground">{exp.description}</p>
                    </CardContent>

                    <AnimatePresence>
                      {expandedExp === exp.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <CardContent className="pt-0">
                            <div className="mt-4 space-y-4">
                              <div>
                                <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                                  <Award className="h-4 w-4 text-primary" /> Key
                                  Achievements
                                </h4>
                                <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                                  {exp.achievements.map((achievement, i) => (
                                    <li key={i}>{achievement}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </CardContent>

                          <CardFooter className="flex flex-wrap gap-2 pt-0">
                            {exp.technologies.map((tech, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="bg-primary/10 hover:bg-primary/20 transition-colors cursor-default"
                                >
                                  {tech}
                                </Badge>
                              </motion.div>
                            ))}
                          </CardFooter>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education" className="space-y-8">
            <div className="relative">
              {/* Timeline line */}
              <motion.div
                className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute w-full h-24 bg-gradient-to-b from-transparent via-primary to-transparent"
                  initial={{ top: "-100%" }}
                  animate={{ top: "100%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Education cards */}
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative md:w-1/2 ${
                    index % 2 === 0 ? "md:ml-auto md:pl-8" : "md:pr-8"
                  } mb-12`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-[-8px] md:left-auto md:right-[-8px] top-6 w-4 h-4 rounded-full bg-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: index * 0.2,
                      duration: 0.5,
                      type: "spring",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/30"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />
                  </motion.div>

                  {/* Card */}
                  <Card className="w-full border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden group transform hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-start gap-4 pb-2">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                        <img
                          src={edu.logo}
                          alt={edu.institution}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {edu.degree}
                        </CardTitle>
                        <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <span className="font-medium">{edu.institution}</span>
                          <div className="hidden sm:flex h-1 w-1 rounded-full bg-muted-foreground"></div>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {edu.location}
                          </span>
                        </CardDescription>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{edu.duration}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleExpand(edu.id, "education")}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={
                          expandedEdu === edu.id
                            ? "Collapse details"
                            : "Expand details"
                        }
                      >
                        {expandedEdu === edu.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </CardHeader>

                    <CardContent className="pb-3">
                      <p className="text-muted-foreground">{edu.description}</p>
                    </CardContent>

                    <AnimatePresence>
                      {expandedEdu === edu.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <CardContent className="pt-0">
                            <div className="mt-4 space-y-4">
                              <div>
                                <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                                  <Award className="h-4 w-4 text-primary" />{" "}
                                  Achievements & Activities
                                </h4>
                                <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                                  {edu.achievements.map((achievement, i) => (
                                    <li key={i}>{achievement}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </CardContent>

                          <CardFooter className="flex flex-wrap gap-2 pt-0">
                            {edu.courses.map((course, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="bg-primary/10 hover:bg-primary/20 transition-colors cursor-default"
                                >
                                  {course}
                                </Badge>
                              </motion.div>
                            ))}
                          </CardFooter>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
