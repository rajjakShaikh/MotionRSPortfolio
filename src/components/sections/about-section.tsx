"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/about-image.jpg"
                alt="About me"
                fill
                className="object-cover"
              />

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/30 rounded-full blur-xl" />

              {/* Border decoration */}
              <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-background rounded-lg opacity-50" />
            </div>
          </motion.div>

          {/* Right column - Content */}
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
                whileInView={{ opacity: 1 }}
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
                  I'm a passionate Frontend Developer with over 5 years of experience
                  building modern, responsive web applications. My journey began as a graphic
                  designer, which gives me a unique perspective on creating visually stunning
                  and user-friendly interfaces.
                </p>
                <p>
                  I specialize in React and Next.js development, with a strong focus on
                  creating performant applications with clean, maintainable code. I'm deeply
                  committed to web accessibility and believe that great websites should work
                  for everyone.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new design trends,
                  contributing to open-source projects, or enjoying outdoor activities
                  to keep a healthy work-life balance.
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
                <li>Led frontend development for 10+ successful client projects</li>
                <li>Reduced load time by 40% on a high-traffic e-commerce site</li>
                <li>Created responsive UIs that increased mobile conversion rates by 25%</li>
                <li>Contributed to popular open-source UI component libraries</li>
                <li>Mentored junior developers and led technical workshops</li>
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
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
