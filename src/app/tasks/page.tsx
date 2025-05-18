"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Home } from "lucide-react";
import { useTheme } from "next-themes";
import { TaskBoard } from "@/components/tasks/task-board";
import { motion } from "framer-motion";
import { animations } from "@/lib/animations";

export default function TasksPage() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon" title="Home">
                  <Home className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-semibold">StickyFlow</h1>
                <p className="text-muted-foreground text-sm">
                  Task Manager
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Button variant="ghost" size="icon" title="Toggle theme">
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </motion.button>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/app">
                  <Button variant="outline">
                    Switch to Notes
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      <motion.div
        className="flex-1"
        initial="initial"
        animate="enter"
        variants={animations.pageTransition}
      >
        <TaskBoard />
      </motion.div>

      <footer className="bg-secondary py-4 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>StickyFlow &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  );
}
