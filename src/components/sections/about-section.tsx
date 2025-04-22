"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { trackDownload } from "@/lib/download-tracker";
import { ComputersCanvas } from "../canvas";

export function AboutSection() {
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
    <section id="about" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="h-screen ">
            <ComputersCanvas />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  About Me
                </h2>
                <div className="w-12 h-1 bg-primary mt-2 mb-6 rounded-full" />
              </motion.div>

              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a passionate Frontend Developer with over 1.5 years of
                  experience building modern, responsive web applications. I
                  love creating interactive and visually appealing user
                  interfaces that provide exceptional user experiences.
                </p>
                <p>
                  I specialize in{" "}
                  <span className="text-primary font-medium">React</span> and{" "}
                  <span className="text-primary font-medium">Next.js</span>{" "}
                  development, with a strong focus on creating performant
                  applications with clean, maintainable code. I'm deeply
                  committed to web accessibility and believe that great websites
                  should work for everyone.
                </p>
                <p>
                  My technical toolkit includes{" "}
                  <span className="text-primary font-medium">TypeScript</span>,{" "}
                  <span className="text-primary font-medium">Redux</span>,{" "}
                  <span className="text-primary font-medium">Zustand</span>,
                  <span className="text-primary font-medium">Tailwind CSS</span>
                  , and various modern frontend frameworks. I'm always eager to
                  learn new technologies and stay at the cutting edge of web
                  development.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new design
                  trends, contributing to open-source projects, or enjoying
                  outdoor activities to keep a healthy work-life balance.
                </p>
              </div>
            </div>

            {/* Career highlights */}
            <motion.div
              className="mt-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold">Career Highlights</h3>
              <ul className="space-y-2 ml-5 list-disc text-muted-foreground">
                <li>
                  Developed and maintained multiple React/Next.js applications
                </li>
                <li>
                  Implemented responsive designs that work flawlessly across all
                  devices
                </li>
                <li>
                  Built reusable component libraries to improve development
                  efficiency
                </li>
                <li>
                  Optimized web performance for better user experience and SEO
                </li>
                <li>
                  Collaborated effectively with designers and backend developers
                </li>
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
                className="text-white mt-5 animate-bounce group border-2 border-[#ffd700] rounded-xl px-3 py-3 my-2 flex items-center 
                hover:bg-[#ffd700] hover:text-black transition-all duration-900"
                onClick={HandleDownload}
              >
                Download Resume
                <span className="ml-3 group-hover:rotate-12 transition-transform duration-300">
                  <Download />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
