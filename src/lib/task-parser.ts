// Natural language task parser

import { Priority, Task } from "@/lib/types";
import { parse, addDays, isValid, formatISO } from "date-fns";

// List of natural language patterns for dates
const datePatterns = [
  { regex: /\btoday\b/i, fn: () => new Date() },
  { regex: /\btomorrow\b/i, fn: () => addDays(new Date(), 1) },
  { regex: /\bnext week\b/i, fn: () => addDays(new Date(), 7) },
  { regex: /\bin (\d+) days?\b/i, fn: (n: string) => addDays(new Date(), parseInt(n, 10)) },
  // e.g. "5/22", "22 May", "May 22" etc., handled more generically
  { regex: /\b(on |by )?(\d{1,2})[\/-](\d{1,2})\b/i, fn: (_: string, m1: string, month: string, day: string) => {
    // MM/DD
    const year = new Date().getFullYear();
    return parse(`${month}/${day}/${year}`, "M/d/yyyy", new Date());
  } },
];

// Priority patterns
const priorityPatterns: [RegExp, Priority][] = [
  [/\b#?high\b|\b!high\b|\btop\b/i, "high"],
  [/\b#?medium\b|\b!medium\b|\bmed\b/i, "medium"],
  [/\b#?low\b|\b!low\b|\bbottom\b/i, "low"],
];

export function parseTaskInput(input: string) {
  let text = input.trim();
  let date: Date | undefined;
  let priority: Priority = "medium";

  // Extract explicit priority
  for (const [regex, prio] of priorityPatterns) {
    if (regex.test(text)) {
      priority = prio;
      text = text.replace(regex, "").trim();
      break;
    }
  }

  // Extract date
  for (const pattern of datePatterns) {
  const match = text.match(pattern.regex);
  if (match) {
    const [, ...groups] = match; // skip match[0], keep capture groups
    text = text.replace(pattern.regex, "").trim();
    break;
  }
}

  // Simple fallback: look for "due X" or "by X"
  if (!date) {
    const fallback = text.match(/\b(?:due|by)\s+(\w.+)$/i);
    if (fallback) {
      const parsed = parse(fallback[1], "MMM d", new Date());
      if (isValid(parsed)) date = parsed;
      text = text.replace(fallback[0], "").trim();
    }
  }

  return {
    title: text,
    dueDate: date ? formatISO(date, { representation: "date" }) : undefined,
    priority,
  };
}
