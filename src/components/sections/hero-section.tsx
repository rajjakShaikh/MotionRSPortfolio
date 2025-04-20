"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Send } from "lucide-react";
import Link from "next/link";
import { TypewriterText } from "@/components/ui/typewriter-text";
import { FallingLogos } from "@/components/ui/falling-logos";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center py-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background dark:from-primary/5"></div>

      {/* Falling logos background */}
      <FallingLogos />

      {/* Content container */}
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Text content */}
          <motion.div
            className="flex flex-col items-center justify-center space-y-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none">
                  <span className="text-primary">Frontend</span> Developer
                </h1>
              </motion.div>

              <div className="h-32 md:h-20 mt-2">
                <TypewriterText
                  sequences={[
                    "Hi, I am Rajjak Shaikh...",
                    1000,
                    "I am a front end developer",
                    1000,
                    "I build modern web applications",
                    1000,
                  ]}
                  className="text-xl md:text-2xl font-medium text-primary"
                  wrapper="p"
                />
              </div>

              <motion.div
                className="max-w-[700px]  mx-auto p-6 rounded-xl backdrop-blur-lg bg-white/15 dark:bg-black/25 border border-white/30 dark:border-white/10 shadow-xl relative overflow-hidden group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Glassmorphism glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-purple-500/20 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl animate-gradient bg-[length:200%_200%]"></div>

                {/* Subtle light reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30"></div>

                {/* Content */}
                <div className="relative z-10">
                  <p className="text-muted-foreground md:text-xl">
                    Front-End Developer with more than one and half years of
                    hands-on experience, specializing in{" "}
                    <span className="text-primary font-medium">React</span> |{" "}
                    <span className="text-primary font-medium">Next.js</span> |
                    <span className="text-primary font-medium">TypeScript</span>{" "}
                    | <span className="text-primary font-medium">Redux</span> |{" "}
                    <span className="text-primary font-medium">Zustand</span> |{" "}
                    <span className="text-primary font-medium">Shadcn</span> | I
                    excel at building responsive, high-performing, and
                    user-friendly web applications that deliver seamless UI/UX
                    experiences. My passion lies in leveraging cutting-edge
                    tools and technologies to craft clean, scalable, and
                    efficient solutions that meet modern user needs.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md mx-auto justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild className="gap-1 py-6 text-md sm:w-40">
                <Link href="#contact">
                  Contact Me
                  <Send className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" className="gap-1 py-6 text-md sm:w-40">
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </Button>
            </motion.div>

            {/* Tech tag line */}
            <motion.div
              className="flex items-center gap-2 mt-8 w-full max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="h-px flex-1 bg-border"></div>
              <p className="text-sm text-muted-foreground whitespace-nowrap">
                Specializing in React, Next.js, and TypeScript, Shadcn
              </p>
              <div className="h-px flex-1 bg-border"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
