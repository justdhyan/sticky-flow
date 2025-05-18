import { Priority } from "@/lib/types";

// Helper: parse simple date phrases to a JS Date
export function parseDueDate(phrase: string): Date | undefined {
  if (!phrase) return undefined;
  const lower = phrase.toLowerCase();
  const now = new Date();

  if (/(today|tonight)/.test(lower)) return now;
  if (/tomorrow/.test(lower)) {
    const d = new Date(now);
    d.setDate(d.getDate() + 1);
    return d;
  }
  if (/yesterday/.test(lower)) {
    const d = new Date(now);
    d.setDate(d.getDate() - 1);
    return d;
  }
  if (/(next week)/.test(lower)) {
    const d = new Date(now);
    d.setDate(d.getDate() + 7);
    return d;
  }
  if (/(next month)/.test(lower)) {
    const d = new Date(now);
    d.setMonth(d.getMonth() + 1);
    return d;
  }
  // Day of week (mon-sun, next mon-sun)
  const dayMatch = lower.match(/(next |this )?(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/);
  if (dayMatch) {
    const dayMap = [
      "sunday","monday","tuesday","wednesday","thursday","friday","saturday"
    ];
    const target = dayMap.indexOf(dayMatch[2]);
    if (target !== -1) {
      const base = new Date(now);
      const startDay = now.getDay();
      let diff = target - startDay;
      if (diff <= 0) diff += 7;
      if (dayMatch[1] && dayMatch[1].startsWith("next")) diff += 7;
      base.setDate(now.getDate() + diff);
      return base;
    }
  }
  // Simple date strings (YYYY-MM-DD)
  const iso = lower.match(/(\d{4}-\d{2}-\d{2})/);
  if (iso && iso[1]) return new Date(iso[1]);
  return undefined;
}

// Helper: Parse priority tags from task description
export function parsePriority(text: string): Priority {
  const match = text.match(/#(high|medium|low)/i);
  if (!match) return "medium";
  const level = match[1].toLowerCase();
  if (level === "high" || level === "medium" || level === "low") return level as Priority;
  return "medium";
}

// Smart Quick Add parser
export function parseTaskInput(input: string): {
  title: string;
  dueDate?: Date;
  priority: Priority;
} {
  // Find date keyword or iso string
  const dateMatch = input.match(/today|tonight|tomorrow|yesterday|next week|next month|(next |this )?(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i);
  const dueDate = dateMatch ? parseDueDate(dateMatch[0]) : undefined;

  // Priority
  const priority = parsePriority(input);

  // Remove both from text for task title
  let title = input;
  if (dateMatch) title = title.replace(dateMatch[0], "");
  const prioMatch = input.match(/#(high|medium|low)/i);
  if (prioMatch) title = title.replace(prioMatch[0], "");

  // Clean up
  title = title.replace(/\s{2,}/g, " ").trim();

  return {
    title: title || "Untitled Task",
    dueDate,
    priority
  };
}
