"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseTaskInput } from "@/lib/task-parser";
import { Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAddBarProps {
  onAddSmartTask: (spec: { title: string; dueDate?: string; priority: string }) => void;
}

export function QuickAddBar({ onAddSmartTask }: QuickAddBarProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleQuickAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) {
      setError("Please enter a task.");
      return;
    }
    const parsed = parseTaskInput(input);
    if (!parsed.title) {
      setError("No task title found.");
      return;
    }
    // Send to parent
    onAddSmartTask(parsed);
    setInput("");
    setError("");
    if (inputRef.current) inputRef.current.blur();
  };

  const handleChange = (v: string) => {
    setInput(v);
    if (error) setError("");
  };

  return (
    <motion.form
      onSubmit={handleQuickAdd}
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-2 py-2 bg-secondary/30 rounded-xl shadow max-w-xl mx-auto"
    >
      <Sparkles className="h-6 w-6 text-primary" aria-hidden />
      <Input
        ref={inputRef}
        value={input}
        onChange={e => handleChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey) {
            handleQuickAdd();
          }
        }}
        placeholder="Quick add: e.g. 'Submit report tomorrow #high'"
        className="flex-1 bg-transparent border-none shadow-none px-2 text-base focus-visible:ring-0"
        autoFocus={false}
        aria-label="Add task with natural language"
      />
      <motion.div
        whileHover={{ scale: 1.12, boxShadow: "0px 2px 10px 0px #ddd" }}
        whileTap={{ scale: 0.94 }}
      >
        <Button size="sm" type="submit" className="rounded-full shadow px-3 font-semibold text-base">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.div
            key="error-msg"
            initial={{ scale: 0.9, opacity: 0, y: -7 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: -13 }}
            className="ml-2 text-sm text-destructive shadow bg-background/70 px-2 rounded"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
