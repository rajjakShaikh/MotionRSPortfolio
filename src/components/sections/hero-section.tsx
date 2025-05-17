"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Send, CheckCircle } from "lucide-react";
import Link from "next/link";
import { TypewriterText } from "@/components/ui/typewriter-text";
import { FallingLogos } from "@/components/ui/falling-logos";
import { toast } from "sonner";
import { trackDownload } from "@/lib/download-tracker";

export function HeroSection() {
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

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center py-20 overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="main-bg absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-background dark:from-primary/10 dark:via-background/80 dark:to-background animate-gradient-slow bg-[length:400%_400%]"></div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center opacity-5 dark:opacity-10"></div>

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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl/none">
                  <span className="text-primary">Frontend</span> Developer
                </h1>
              </motion.div>

              <div className="h-36 sm:h-32 md:h-20 mt-2">
                <TypewriterText
                  sequences={[
                    "Hi, I am Rajjak Shaikh...",
                    1000,
                    "I am a front end developer",
                    1000,
                    "I build modern web applications",
                    1000,
                  ]}
                  className="text-lg sm:text-xl md:text-2xl font-medium text-primary"
                  wrapper="p"
                />
              </div>

              <motion.div
                className="max-w-[700px] mx-auto p-4 sm:p-6 rounded-xl backdrop-blur-lg bg-white/15 dark:bg-black/25 border border-white/30 dark:border-white/10 shadow-xl relative overflow-hidden group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-purple-500/20 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl animate-gradient bg-[length:200%_200%]"></div>

                {/* Light reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30"></div>

                {/* Content */}
                <div className="relative z-10">
                  <p className="text-sm sm:text-base md:text-xl text-muted-foreground">
                    Front-End Developer with Two Years of hands-on experience,
                    specializing in{" "}
                    <span className="flex flex-wrap gap-x-2 gap-y-1 mt-2">
                      <motion.span
                        className="text-primary font-medium inline-block"
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        React
                      </motion.span>{" "}
                      |{" "}
                      <motion.span
                        className="text-primary font-medium inline-block"
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        Next.js
                      </motion.span>{" "}
                      |{" "}
                      <motion.span
                        className="text-primary font-medium inline-block"
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        Tailwind CSS
                      </motion.span>{" "}
                      |{" "}
                      <motion.span
                        className="text-primary font-medium inline-block"
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        TypeScript
                      </motion.span>{" "}
                      |{" "}
                      <motion.span
                        className="text-primary font-medium inline-block"
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        Redux
                      </motion.span>{" "}
                      |{" "}
                      <motion.span
                        className="text-primary font-medium inline-block"
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        Zustand
                      </motion.span>{" "}
                      |{" "}
                      <motion.span
                        className="text-primary font-medium inline-block"
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        React Query
                      </motion.span>{" "}
                      |{" "}
                      <motion.span
                        className="text-primary font-medium inline-block"
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        ShadCN
                      </motion.span>
                    </span>
                    <span className="block mt-2">
                      I excel at building responsive, high-performing, and
                      user-friendly web applications that deliver seamless UI/UX
                      experiences.
                    </span>
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
              <Button
                asChild
                className="gap-1 rounded-xl px-3 py-3 text-sm sm:text-md sm:w-40 relative overflow-hidden group"
              >
                <Link
                  href="#contact"
                  className="flex items-center justify-center"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                  <span className="relative z-10 flex items-center">
                    Contact Me
                    <Send className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              </Button>
              <Button
                className="relative overflow-hidden text-white group border-2 border-[#ffd700] rounded-xl px-3 py-3 flex items-center
                hover:bg-[#ffd700] hover:text-black transition-all duration-300 text-sm sm:text-md"
                onClick={HandleDownload}
              >
                <span className="absolute inset-0 w-0 bg-[#ffd700] group-hover:w-full transition-all duration-300 -z-10"></span>
                <span className="relative z-10 flex items-center">
                  <span className="sm:inline">Download</span> Resume
                  <span className="ml-2 sm:ml-3 group-hover:rotate-12 transition-transform duration-100">
                    <Download className="h-4 w-4 animate-pulse" />
                  </span>
                </span>
              </Button>
            </motion.div>

            {/* Tech tagline */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-2 mt-8 w-full max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="h-px w-16 sm:w-auto sm:flex-1 bg-border"></div>
              <p className="text-xs sm:text-sm text-muted-foreground text-center px-2">
                Specializing in React, Next.js, Tailwind CSS, TypeScript,
                ShadCN, Redux, and Zustand.
              </p>
              <div className="h-px w-16 sm:w-auto sm:flex-1 bg-border"></div>
            </motion.div>
          </motion.div>

          {/* Scroll down icon */}
          <div className="absolute xs:bottom-10 bottom-5 w-full flex justify-center items-center">
            <a href="#about">
              <div className="w-[35px] h-[64px] !mt-4 rounded-3xl border-4 border-primary flex justify-center items-start p-2">
                <motion.div
                  animate={{
                    y: [0, 24, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className="w-3 h-3 rounded-full bg-white mb-1"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
