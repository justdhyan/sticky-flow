"use client";

import React from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const FeaturesSection = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="py-20 px-4 container mx-auto"
    id="features"
  >
    <h2 className="text-3xl font-bold mb-5 text-center">Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
      <motion.div whileHover={{ scale: 1.04, boxShadow: "0 3px 24px rgba(0,0,0,0.06)" }} className="bg-background p-7 rounded-xl shadow border text-center">
        <span className="text-4xl">⚡️</span>
        <h3 className="font-semibold text-lg mt-4 mb-2">Instant Sticky Notes</h3>
        <p className="text-muted-foreground mb-2">Add, edit, and color-code notes for anything—ideas, to-dos, thoughts—in a beautiful grid.</p>
      </motion.div>
      <motion.div whileHover={{ scale: 1.04, boxShadow: "0 3px 24px rgba(0,0,0,0.06)" }} className="bg-background p-7 rounded-xl shadow border text-center">
        <span className="text-4xl">📝</span>
        <h3 className="font-semibold text-lg mt-4 mb-2">Smart Task Lists</h3>
        <p className="text-muted-foreground mb-2">Natural language quick-add, drag & drop, subtasks, smart sorting, and circular progress tracking.</p>
      </motion.div>
      <motion.div whileHover={{ scale: 1.04, boxShadow: "0 3px 24px rgba(0,0,0,0.06)" }} className="bg-background p-7 rounded-xl shadow border text-center">
        <span className="text-4xl">🌗</span>
        <h3 className="font-semibold text-lg mt-4 mb-2">Custom Themes & Dark Mode</h3>
        <p className="text-muted-foreground mb-2">Switch easily between light/dark, mood check-ins, and personalize your workspace vibes.</p>
      </motion.div>
    </div>
  </motion.section>
);



const BenefitsSection = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="py-20 px-4 container mx-auto"
    id="benefits"
  >
    <h2 className="text-3xl font-bold mb-7 text-center">Why StickyFlow?</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <motion.div whileHover={{ y: -7, boxShadow: "0px 6px 32px #bcd7de55" }} className="flex flex-col items-center bg-background p-8 shadow rounded-xl border">
        <span className="text-4xl mb-2">🚀</span>
        <p className="text-base font-semibold mb-1">Fast & Effortless</p>
        <p className="text-muted-foreground text-sm text-center">Everything autosaves and syncs locally – never lose a thought.</p>
      </motion.div>
      <motion.div whileHover={{ y: -7, boxShadow: "0px 6px 32px #a5949340" }} className="flex flex-col items-center bg-background p-8 shadow rounded-xl border">
        <span className="text-4xl mb-2">🎯</span>
        <p className="text-base font-semibold mb-1">Focus On Results</p>
        <p className="text-muted-foreground text-sm text-center">Smart reminders, progress tracking, and organization to keep you on track.</p>
      </motion.div>
      <motion.div whileHover={{ y: -7, boxShadow: "0px 6px 32px #d8e6ee6c" }} className="flex flex-col items-center bg-background p-8 shadow rounded-xl border">
        <span className="text-4xl mb-2">😌</span>
        <p className="text-base font-semibold mb-1">Beautiful & Calming</p>
        <p className="text-muted-foreground text-sm text-center">Crafted for everyday joy with soothing visuals and gentle animations.</p>
      </motion.div>
    </div>
  </motion.section>
);

const TestimonialsSection = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.54, ease: "easeOut" }}
    className="py-20 px-4 container mx-auto"
    id="testimonials"
  >
    <h2 className="text-3xl font-bold mb-8 text-center">What Users Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
      <motion.div whileHover={{ scale: 1.045, backgroundColor: "#fff2", boxShadow: "0 2px 20px #bcd7de5a" }}
        className="rounded-xl px-7 py-5 bg-background shadow-md border text-center">
        <p className="mb-1 text-base text-primary font-semibold">“I finally stay on top of both work and life. The animations actually make me want to come back!”</p>
        <span className="text-sm text-muted-foreground">— Alex, Designer</span>
      </motion.div>
      <motion.div whileHover={{ scale: 1.045, backgroundColor: "#fff5", boxShadow: "0 2px 32px #ffb3c040" }}
        className="rounded-xl px-7 py-5 bg-background shadow-md border text-center">
        <p className="mb-1 text-base text-primary font-semibold">“StickyFlow is my new daily ritual. The quick add with smart input is a game-changer.”</p>
        <span className="text-sm text-muted-foreground">— Robin, Marketing Lead</span>
      </motion.div>
      <motion.div whileHover={{ scale: 1.045, backgroundColor: "#fff0", boxShadow: "0 2px 28px #bcd7de65" }}
        className="rounded-xl px-7 py-5 bg-background shadow-md border text-center">
        <p className="mb-1 text-base text-primary font-semibold">“It’s so smooth and calming—feels more like a creative studio than a notes app.”</p>
        <span className="text-sm text-muted-foreground">— Jamie, Entrepreneur</span>
      </motion.div>
    </div>
  </motion.section>
);

const FinalCTASection = () => (
  <motion.section
    initial={{ opacity: 0, scale: 0.96 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.65 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="py-16 mx-auto flex flex-col gap-4 items-center text-center px-4"
    id="get-started"
  >
    <motion.h3
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.55 }}
      className="text-3xl md:text-4xl font-bold mb-2"
    >Ready to focus smarter?</motion.h3>
    <p className="text-lg text-muted-foreground mb-5">Join thousands who track, organize, and actually enjoy their daily flow!</p>
    <motion.div whileHover={{ scale: 1.1, boxShadow: "0 2px 20px #6d617b44" }}>
      <a href="/app">
        <Button size="lg" className="rounded-full px-8 text-lg">Start Tracking Your Tasks Today</Button>
      </a>
    </motion.div>
  </motion.section>
);

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <path
              d="M8 2V5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M16 2V5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M3 8.5H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M2.5 12.5C2.5 8.09 2.5 5.88 3.94 4.44C5.38 3 7.59 3 12 3C16.41 3 18.62 3 20.06 4.44C21.5 5.88 21.5 8.09 21.5 12.5C21.5 16.91 21.5 19.12 20.06 20.56C18.62 22 16.41 22 12 22C7.59 22 5.38 22 3.94 20.56C2.5 19.12 2.5 16.91 2.5 12.5Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M10.5 16.5C10.5 15.67 9.83 15 9 15C8.17 15 7.5 15.67 7.5 16.5C7.5 17.33 8.17 18 9 18C9.83 18 10.5 17.33 10.5 16.5Z"
              fill="currentColor"
            />
            <path
              d="M16.5 16.5C16.5 15.67 15.83 15 15 15C14.17 15 13.5 15.67 13.5 16.5C13.5 17.33 14.17 18 15 18C15.83 18 16.5 17.33 16.5 16.5Z"
              fill="currentColor"
            />
            <path
              d="M10.5 12C10.5 11.17 9.83 10.5 9 10.5C8.17 10.5 7.5 11.17 7.5 12C7.5 12.83 8.17 13.5 9 13.5C9.83 13.5 10.5 12.83 10.5 12Z"
              fill="currentColor"
            />
            <path
              d="M16.5 12C16.5 11.17 15.83 10.5 15 10.5C14.17 10.5 13.5 11.17 13.5 12C13.5 12.83 14.17 13.5 15 13.5C15.83 13.5 16.5 12.83 16.5 12Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-xl font-semibold">StickyFlow</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/app">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/app">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <TestimonialsSection />
        <FinalCTASection />
      </main>
      <footer className="bg-secondary py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path
                  d="M8 2V5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M16 2V5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M3 8.5H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M2.5 12.5C2.5 8.09 2.5 5.88 3.94 4.44C5.38 3 7.59 3 12 3C16.41 3 18.62 3 20.06 4.44C21.5 5.88 21.5 8.09 21.5 12.5C21.5 16.91 21.5 19.12 20.06 20.56C18.62 22 16.41 22 12 22C7.59 22 5.38 22 3.94 20.56C2.5 19.12 2.5 16.91 2.5 12.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M10.5 16.5C10.5 15.67 9.83 15 9 15C8.17 15 7.5 15.67 7.5 16.5C7.5 17.33 8.17 18 9 18C9.83 18 10.5 17.33 10.5 16.5Z"
                  fill="currentColor"
                />
                <path
                  d="M16.5 16.5C16.5 15.67 15.83 15 15 15C14.17 15 13.5 15.67 13.5 16.5C13.5 17.33 14.17 18 15 18C15.83 18 16.5 17.33 16.5 16.5Z"
                  fill="currentColor"
                />
                <path
                  d="M10.5 12C10.5 11.17 9.83 10.5 9 10.5C8.17 10.5 7.5 11.17 7.5 12C7.5 12.83 8.17 13.5 9 13.5C9.83 13.5 10.5 12.83 10.5 12Z"
                  fill="currentColor"
                />
                <path
                  d="M16.5 12C16.5 11.17 15.83 10.5 15 10.5C14.17 10.5 13.5 11.17 13.5 12C13.5 12.83 14.17 13.5 15 13.5C15.83 13.5 16.5 12.83 16.5 12Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-lg font-semibold">StickyFlow</span>
            </div>
            <div className="text-center md:text-right text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} StickyFlow. All rights reserved.</p>
              <p className="mt-1">
                <Link href="#" className="underline underline-offset-4 hover:text-primary">
                  Privacy Policy
                </Link>{" "}
                •{" "}
                <Link href="#" className="underline underline-offset-4 hover:text-primary">
                  Terms of Service
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
