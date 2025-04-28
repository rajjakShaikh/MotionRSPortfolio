"use client";

import { ExperienceEducationSection } from "./experience-education-section";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-5">
      {/* Separator */}
      <div className="mt-20 mb-5 flex items-center justify-center">
        <div className="h-px w-full max-w-sm bg-border"></div>
        <div className="mx-4 text-muted-foreground">My Journey</div>
        <div className="h-px w-full max-w-sm bg-border"></div>
      </div>
      <ExperienceEducationSection />
    </section>
  );
}
