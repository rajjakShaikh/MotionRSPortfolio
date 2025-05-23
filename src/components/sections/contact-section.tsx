"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import * as emailjs from "@emailjs/browser";
import { EarthCanvas } from "../canvas";
import { ContactStarsCanvas } from "../ui/contact-stars";
import { Mail, MapPin, Phone, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Initialize EmailJS with your public key
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");

    // Prepare template parameters
    const templateParams = {
      from_name: form.name,
      to_name: "Rajjak Shaikh",
      from_email: form.email,
      to_email: "rajjak.shaikh@example.com",
      message: form.message,
    };

    // Send email using EmailJS
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        templateParams
      )
      .then(
        () => {
          setLoading(false);
          toast.success("Message sent successfully!", {
            description:
              "Thank you. I will get back to you as soon as possible.",
            icon: <CheckCircle className="h-5 w-5" />,
            duration: 5000,
          });

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error: unknown) => {
          setLoading(false);
          console.error(error);

          toast.error("Failed to send message", {
            description: "Something went wrong. Please try again later.",
            icon: <AlertCircle className="h-5 w-5" />,
            duration: 5000,
          });
        }
      );
  };

  return (
    <section
      id="contact"
      className="py-24 relative min-h-screen flex items-center"
    >
      {/* Stars Background */}
      <ContactStarsCanvas />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center mb-8 sm:mb-16"
        >
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl/tight">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-xl px-4">
            Have a project in mind or want to discuss a collaboration? I'd love
            to hear from you.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card/60 backdrop-blur-md p-4 sm:p-8 rounded-2xl border border-primary/20 shadow-lg hover:border-primary/30 transition-all duration-300 order-2 lg:order-1"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Send Me a Message
            </h3>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 sm:gap-6"
            >
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Rajjak Shaikh"
                    className="w-full bg-background/30 py-2 sm:py-3 px-3 sm:px-4 placeholder:text-muted-foreground rounded-lg outline-none border border-border font-medium focus:border-primary focus:bg-background/40 transition-colors text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="rajjakshaikh8800@gmail.com"
                    className="w-full bg-background/30 py-2 sm:py-3 px-3 sm:px-4 placeholder:text-muted-foreground rounded-lg outline-none border border-border font-medium focus:border-primary focus:bg-background/40 transition-colors text-sm sm:text-base"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="message">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or inquiry..."
                  className="w-full bg-background/30 py-2 sm:py-3 px-3 sm:px-4 placeholder:text-muted-foreground rounded-lg outline-none border border-border font-medium focus:border-primary focus:bg-background/40 transition-colors text-sm sm:text-base"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-primary py-2 sm:py-3 px-6 sm:px-8 rounded-xl outline-none w-fit text-primary-foreground font-bold shadow-md hover:bg-primary/90 hover:shadow-primary/20 hover:shadow-lg transition-all duration-300 relative text-sm sm:text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="opacity-0">Send Message</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="ml-2 text-sm sm:text-base">
                        Sending...
                      </span>
                    </span>
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>

          {/* 3D Earth - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2 w-full"
          >
            <div className="earth-container">
              <EarthCanvas />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
