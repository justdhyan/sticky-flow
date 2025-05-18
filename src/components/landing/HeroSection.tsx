"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative pt-16 pb-20 px-4 flex flex-col items-center text-center"
    >
      <Sparkles className="mx-auto mb-4 h-10 w-10 text-primary animate-pulse" />
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="\nmax-w-3xl text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary to-indigo-600 text-transparent bg-clip-text"
      >
        Supercharge Your Productivity
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="text-lg md:text-2xl text-muted-foreground mb-7 max-w-xl mx-auto"
      >
        All-in-one sticky notes & smart tasks app—beautifully simple, surprisingly powerful.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45, duration: 0.45, type: "spring", bounce: 0.4 }}
        whileHover={{ scale: 1.07 }}
      >
        <Link href="/app">
          <Button size="lg" className="gap-2 rounded-full shadow-lg px-8 text-lg">
            Get Started
          </Button>
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="hidden md:block absolute left-0 right-0 mx-auto top-[55%] w-full max-w-xl z-0"
      >
      </motion.div>
    </motion.section>
  );
}
