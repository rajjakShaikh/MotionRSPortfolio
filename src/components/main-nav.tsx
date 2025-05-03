"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export function MainNav() {
  const [activeSection, setActiveSection] = React.useState<string>("home");
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      setIsScrolled(window.scrollY > 50);

      // Find which section is currently in view
      const sections = navItems.map((item) => item.href.substring(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -21 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <div className="flex items-center gap-4">
            <Link href="#home" className="flex items-center group">
              <div className="relative flex items-center">
                {/* Logo Container */}
                <motion.div
                  className="relative overflow-hidden rounded-full shadow-md bg-gradient-to-br from-primary/20 to-background border border-primary/20 h-10 w-10 flex items-center justify-center"
                  initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 0 12px rgba(109, 40, 217, 0.5)",
                    transition: { duration: 0.3, type: "spring" },
                  }}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 opacity-70"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 8,
                      ease: "linear",
                    }}
                  />

                  {/* Initials */}
                  <motion.div
                    className="relative z-10 text-lg font-bold text-primary"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                    }}
                  >
                    RS
                  </motion.div>
                </motion.div>

                {/* Name with animated gradient */}
                <motion.div
                  className="ml-2 hidden sm:block"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <motion.span
                    className="font-medium text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-200% tracking-wide"
                    animate={{
                      backgroundPosition: [
                        "0% center",
                        "200% center",
                        "0% center",
                      ],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    𝓇𝒶𝒿𝒿𝒶𝓀
                  </motion.span>
                  <motion.span className="font-light text-sm text-muted-foreground ml-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    𝓈𝒽𝒶𝒾𝓀𝒽
                  </motion.span>
                </motion.div>
              </div>
            </Link>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 ml-2 animate-fade-in">
              <a
                href="https://www.linkedin.com/in/rajjak-shaikh-271216243/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
                aria-label="LinkedIn Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="https://github.com/rajjakShaikh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
                aria-label="GitHub Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-6"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-1.5",
                activeSection === item.href.substring(1)
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
              onClick={() => setActiveSection(item.href.substring(1))}
            >
              {item.label}
              {activeSection === item.href.substring(1) && (
                <motion.div
                  className="absolute h-0.5 bg-primary rounded-full bottom-0 left-0 right-0"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <ThemeToggle />
        </motion.nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[350px] px-6">
              <div className="flex items-center mb-8 mt-4">
                {/* Logo Container */}
                <motion.div
                  className="relative overflow-hidden rounded-full shadow-md bg-gradient-to-br from-primary/20 to-background border border-primary/20 h-10 w-10 flex items-center justify-center mr-3"
                  initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 opacity-70"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 8,
                      ease: "linear",
                    }}
                  />

                  {/* Initials */}
                  <motion.div
                    className="relative z-10 text-lg font-bold text-primary"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                    }}
                  >
                    RS
                  </motion.div>
                </motion.div>

                <div className="flex flex-col">
                  <span className="font-medium text-lg text-primary">
                    Rajjak Shaikh
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Frontend Developer
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-6 h-full">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      activeSection === item.href.substring(1)
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setActiveSection(item.href.substring(1))}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Social Media Icons for Mobile */}
                <div className="flex items-center gap-4 mt-4 animate-fade-in">
                  <a
                    href="https://www.linkedin.com/in/rajjak-shaikh-271216243/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
                    aria-label="LinkedIn Profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a
                    href="https://github.com/rajjakShaikh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
                    aria-label="GitHub Profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
