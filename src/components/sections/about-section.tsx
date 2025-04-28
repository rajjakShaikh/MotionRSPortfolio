"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { trackDownload } from "@/lib/download-tracker";
import { ComputersCanvas } from "../canvas";

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<"about" | "skills" | "interests">(
    "about"
  );

  const HandleDownload = () => {
    // Create and trigger download
    const link = document.createElement("a");
    link.href = "/docs/SoftwareDevResumeRajjak25.pdf"; // Replace with your actual resume file path
    link.download = "Rajjak_Shaikh_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Track the download
    const downloadCount = trackDownload();

    // Show success toast
    toast.success("Resume download started", {
      description: `Thank you for your interest in my profile! ${
        downloadCount > 1
          ? `This resume has been downloaded ${downloadCount} times.`
          : ""
      }`,
      icon: <CheckCircle className="h-5 w-5" />,
      duration: 3000,
    });
  };

  // Define the tab content
  const tabContent = {
    about: (
      <div className="space-y-4 text-muted-foreground">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          I'm a passionate Frontend Developer with over 1.5 years of experience
          building modern, responsive web applications. I love creating
          interactive and visually appealing user interfaces that provide
          exceptional user experiences.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          I specialize in{" "}
          <motion.span
            className="text-primary font-medium inline-block"
            whileHover={{ scale: 1.1, y: -2 }}
          >
            React
          </motion.span>{" "}
          and{" "}
          <motion.span
            className="text-primary font-medium inline-block"
            whileHover={{ scale: 1.1, y: -2 }}
          >
            Next.js
          </motion.span>{" "}
          development, with a strong focus on creating performant applications
          with clean, maintainable code. I'm deeply committed to web
          accessibility and believe that great websites should work for
          everyone.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          When I'm not coding, you can find me exploring new design trends,
          contributing to open-source projects, or enjoying outdoor activities
          to keep a healthy work-life balance.
        </motion.p>
      </div>
    ),
    skills: (
      <div className="space-y-6 text-muted-foreground">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-foreground font-medium">Frontend Development</h4>
          <div className="space-y-2">
            {["React", "Next.js", "TypeScript", "JavaScript", "HTML5/CSS3"].map(
              (skill, index) => (
                <div key={skill} className="relative">
                  <div className="flex justify-between mb-1">
                    <span>{skill}</span>
                    <span className="text-primary">
                      {85 + Math.floor(Math.random() * 15)}%
                    </span>
                  </div>
                  <motion.div
                    className="h-2 w-full bg-muted rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${85 + Math.floor(Math.random() * 15)}%`,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2 + index * 0.1,
                        ease: "easeOut",
                      }}
                    />
                  </motion.div>
                </div>
              )
            )}
          </div>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h4 className="text-foreground font-medium">UI Libraries & Tools</h4>
          <div className="space-y-2">
            {[
              "Tailwind CSS",
              "Shadcn UI",
              "Redux",
              "Zustand",
              "Framer Motion",
            ].map((skill, index) => (
              <div key={skill} className="relative">
                <div className="flex justify-between mb-1">
                  <span>{skill}</span>
                  <span className="text-primary">
                    {80 + Math.floor(Math.random() * 15)}%
                  </span>
                </div>
                <motion.div
                  className="h-2 w-full bg-muted rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${80 + Math.floor(Math.random() * 15)}%`,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + index * 0.1,
                      ease: "easeOut",
                    }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    ),
    interests: (
      <div className="space-y-4 text-muted-foreground">
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {[
            {
              title: "Web Design",
              icon: "🎨",
              description: "Exploring modern UI/UX trends",
            },
            {
              title: "Open Source",
              icon: "🌐",
              description: "Contributing to community projects",
            },
            {
              title: "Tech Blogs",
              icon: "📝",
              description: "Reading and writing about new technologies",
            },
            {
              title: "Outdoor Activities",
              icon: "🏞️",
              description: "Hiking and exploring nature",
            },
          ].map((interest, index) => (
            <motion.div
              key={interest.title}
              className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-3xl mb-2">{interest.icon}</div>
              <h4 className="font-medium text-foreground">{interest.title}</h4>
              <p className="text-sm">{interest.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    ),
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background opacity-70"></div>
      <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center opacity-5"></div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* 3D Computer Model */}
          <motion.div
            className="h-[500px] lg:h-screen relative rounded-xl overflow-hidden border border-border/30 shadow-xl"
            transition={{ duration: 0.5 }}
          >
            <ComputersCanvas />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  About Me
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 mt-2 mb-6 rounded-full" />
              </motion.div>

              {/* Tab Navigation */}
              <div className="flex space-x-1 rounded-lg bg-muted/50 p-1 mb-6">
                {(["about", "skills", "interests"] as const).map((tab) => (
                  <motion.button
                    key={tab}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md capitalize transition-all ${
                      activeTab === tab
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tabContent[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Career highlights */}
            <motion.div
              className="space-y-4 p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold flex items-center">
                <span className="text-primary mr-2">✦</span> Career Highlights
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Developed and maintained multiple React/Next.js applications",
                  "Implemented responsive designs that work flawlessly across all devices",
                  "Built reusable component libraries to improve development efficiency",
                  "Optimized web performance for better user experience and SEO",
                  "Collaborated effectively with designers and backend developers",
                ].map((highlight, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <span className="text-primary mt-1">→</span>
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <Button
                className="relative overflow-hidden text-white  group border-2 border-[#ffd700] rounded-xl px-3 py-3  flex items-center
                hover:bg-[#ffd700] hover:text-black transition-all duration-300"
                onClick={HandleDownload}
              >
                <span className="absolute inset-0 w-0 bg-[#ffd700] group-hover:w-full transition-all duration-300 -z-10"></span>
                <span className="relative z-10 flex items-center">
                  Download Resume
                  <span className="ml-3 group-hover:rotate-12 transition-transform duration-100">
                    <Download className="animate-pulse " />
                  </span>
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
