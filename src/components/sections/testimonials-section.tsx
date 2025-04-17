"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechForward",
    image: "/testimonials/sarah.jpg",
    quote:
      "Working with this developer was a game-changer for our project. Their attention to detail and ability to translate our ideas into elegant code exceeded our expectations. The frontend they built not only looks stunning but performs exceptionally well.",
  },
  {
    id: "t2",
    name: "Michael Chen",
    role: "CTO",
    company: "Startup Innovate",
    image: "/testimonials/michael.jpg",
    quote:
      "I've worked with many developers, but few have the combination of technical expertise and design sensibility that they possess. They delivered our application ahead of schedule and implemented innovative solutions that significantly improved user engagement.",
  },
  {
    id: "t3",
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "Creative Studios",
    image: "/testimonials/emily.jpg",
    quote:
      "As a designer, I appreciate a developer who can bring my designs to life with precision. They turned my complex animations and interactions into flawless code, and the collaboration was smooth throughout the entire process.",
  },
  {
    id: "t4",
    name: "David Foster",
    role: "Marketing Director",
    company: "Global Reach Inc.",
    image: "/testimonials/david.jpg",
    quote:
      "Our website revamp led to a 40% increase in conversions, thanks to the intuitive user interface and lightning-fast performance. I was particularly impressed by their commitment to accessibility and creating an inclusive experience for all users.",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Client Testimonials
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            What people are saying about working with me
          </p>
        </motion.div>

        {/* Testimonials slider */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4">
            <Quote className="h-20 w-20 text-primary/10 rotate-180" />
          </div>
          <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4">
            <Quote className="h-20 w-20 text-primary/10" />
          </div>

          {/* Slider */}
          <div className="relative h-[300px] md:h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[activeIndex].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm h-full">
                  <CardContent className="p-6 md:p-8 flex flex-col h-full justify-between">
                    <div className="mb-4">
                      <p className="text-lg text-muted-foreground italic relative">
                        &ldquo;{testimonials[activeIndex].quote}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 border-2 border-primary">
                        <AvatarImage src={testimonials[activeIndex].image} alt={testimonials[activeIndex].name} />
                        <AvatarFallback>{testimonials[activeIndex].name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="text-base font-medium">{testimonials[activeIndex].name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-primary scale-110"
                    : "bg-primary/20 hover:bg-primary/40"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
