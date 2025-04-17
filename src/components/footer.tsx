"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-8 mt-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <Link href="#home" className="font-bold text-lg">
              <span className="text-primary">Portfolio</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} Rajjak Shaikh. All rights reserved.
            </p>
          </div>

          {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <p>Built with</p>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <p>using Next.js and Tailwind CSS</p>
          </div> */}

          <nav className="flex gap-4 md:gap-6">
            <Link
              href="#home"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              href="#projects"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
