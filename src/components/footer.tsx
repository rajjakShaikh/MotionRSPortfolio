"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  Code,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FooterLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoverLink, setHoverLink] = useState<string | null>(null);

  // Navigation links
  const navLinks: FooterLink[] = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  // Social links
  const socialLinks: FooterLink[] = [
    {
      href: "https://github.com/rajjak",
      label: "GitHub",
      icon: <Github className="h-4 w-4" />,
    },
    {
      href: "https://linkedin.com/in/rajjak",
      label: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" />,
    },
    {
      href: "mailto:rajjak@example.com",
      label: "Email",
      icon: <Mail className="h-4 w-4" />,
    },
  ];

  // Tech stack
  const techStack = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Shadcn UI",
  ];

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Wave SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform">
        <svg
          className="relative block w-full h-12 md:h-16"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-background"
          ></path>
        </svg>
      </div>

      {/* Main footer content */}
      <div className="bg-gradient-to-b from-muted/50 to-muted pt-16 pb-8">
        <div className="container px-4 md:px-6">
          {/* Top section with logo and links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Logo and tagline */}
            <div className="space-y-4">
              <Link href="#home" className="inline-block">
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    Rajjak Shaikh
                  </span>
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                </motion.div>
              </Link>
              <p className="text-muted-foreground max-w-xs">
                Frontend developer specializing in creating beautiful,
                responsive, and user-friendly web applications.
              </p>
              <div className="flex gap-3 pt-2">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-card hover:bg-primary/10 transition-colors"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigation links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Navigation</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <motion.li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors inline-block"
                      onMouseEnter={() => setHoverLink(link.label)}
                      onMouseLeave={() => setHoverLink(null)}
                    >
                      <div className="flex items-center gap-1">
                        <motion.div
                          animate={{ x: hoverLink === link.label ? 5 : 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {link.label}
                        </motion.div>
                        {hoverLink === link.label && (
                          <motion.div
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            transition={{ duration: 0.2 }}
                            className="text-primary"
                          >
                            →
                          </motion.div>
                        )}
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Built With</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech}
                    className="px-3 py-1 rounded-full bg-card text-xs font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ y: -2, backgroundColor: "var(--primary-10)" }}
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                <p>Crafted with</p>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                </motion.div>
                <p>and passion</p>
              </div>
            </div>
          </div>

          {/* Bottom section with copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} Rajjak Shaikh. All rights reserved.
            </p>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Code className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Designed & Developed by Rajjak Shaikh
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              size="icon"
              className="rounded-full shadow-lg bg-primary hover:bg-primary/90"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
