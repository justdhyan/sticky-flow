import { Task, TasksState } from "./types";

// Helper function to create a task with a specific ID
const createTask = (
  id: string,
  title: string,
  priority: "high" | "medium" | "low",
  description?: string,
  completed: boolean = false,
  subtasks: { title: string; completed: boolean }[] = [],
  dueDate?: Date
): Task => {
  return {
    id,
    title,
    description,
    priority,
    completed,
    subtasks: subtasks.map((st, index) => ({
      id: `${id}-subtask-${index}`,
      title: st.title,
      completed: st.completed
    })),
    created: new Date().toISOString(),
    dueDate: dueDate ? dueDate.toISOString() : undefined
  };
};

// Get dates relative to today
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

// Sample tasks grouped by priority
export const sampleTasks: TasksState = {
  high: [
    createTask(
      "task-1",
      "Complete project proposal",
      "high",
      "Finish the detailed proposal for the client meeting on Friday.",
      false,
      [
        { title: "Research competitors", completed: true },
        { title: "Create project timeline", completed: false },
        { title: "Prepare budget estimate", completed: false },
        { title: "Draft executive summary", completed: false }
      ],
      tomorrow
    ),
    createTask(
      "task-2",
      "Review quarterly report",
      "high",
      "Go through the Q1 financial report and prepare notes for the board.",
      false,
      [
        { title: "Check revenue figures", completed: false },
        { title: "Verify expense categories", completed: false },
        { title: "Analyze year-over-year growth", completed: false }
      ],
      nextWeek
    ),
    createTask(
      "task-3",
      "Fix critical app bug",
      "high",
      "The login functionality is broken in production. Needs immediate attention.",
      false,
      [
        { title: "Reproduce the issue", completed: true },
        { title: "Debug authentication flow", completed: false },
        { title: "Write tests", completed: false },
        { title: "Deploy hotfix", completed: false }
      ],
      today
    )
  ],
  medium: [
    createTask(
      "task-4",
      "Update portfolio website",
      "medium",
      "Add recent projects and refresh the design of the personal website.",
      false,
      [
        { title: "Update project gallery", completed: false },
        { title: "Refresh bio section", completed: true },
        { title: "Optimize images", completed: false },
        { title: "Test mobile responsiveness", completed: false }
      ],
      nextWeek
    ),
    createTask(
      "task-5",
      "Plan team building event",
      "medium",
      "Organize monthly team building activity for the development team.",
      false,
      [
        { title: "Research activity options", completed: true },
        { title: "Check team availability", completed: true },
        { title: "Book venue or virtual platform", completed: false },
        { title: "Send calendar invites", completed: false }
      ]
    ),
    createTask(
      "task-6",
      "Read design system documentation",
      "medium",
      "Go through the new company design system to understand changes.",
      false,
      [
        { title: "Review color system", completed: false },
        { title: "Study component library", completed: false },
        { title: "Check accessibility guidelines", completed: false }
      ]
    ),
    createTask(
      "task-7",
      "Prepare monthly report",
      "medium",
      "Compile team progress and metrics for the monthly department meeting",
      true,
      [
        { title: "Gather team statistics", completed: true },
        { title: "Create performance graphs", completed: true },
        { title: "Write executive summary", completed: true },
        { title: "Format document", completed: true }
      ],
      yesterday
    )
  ],
  low: [
    createTask(
      "task-8",
      "Clean up design assets folder",
      "low",
      "Organize and archive old design files to improve workflow.",
      false,
      [
        { title: "Sort by project", completed: false },
        { title: "Remove duplicates", completed: false },
        { title: "Archive completed projects", completed: false }
      ]
    ),
    createTask(
      "task-9",
      "Set up weekly backup system",
      "low",
      "Configure automatic backups for project files.",
      false,
      [
        { title: "Research backup options", completed: true },
        { title: "Compare pricing plans", completed: true },
        { title: "Test backup and restore process", completed: false }
      ]
    ),
    createTask(
      "task-10",
      "Learn new JavaScript framework",
      "low",
      "Take an online course to learn the basics of a new framework.",
      false,
      [
        { title: "Find good tutorial", completed: true },
        { title: "Set up development environment", completed: false },
        { title: "Complete first project", completed: false },
        { title: "Share learning with team", completed: false }
      ]
    ),
    createTask(
      "task-11",
      "Update resume",
      "low",
      "Refresh resume with latest achievements and skills",
      false,
      [
        { title: "Add recent projects", completed: false },
        { title: "Update skills section", completed: false },
        { title: "Get feedback from colleague", completed: false },
        { title: "Proofread final version", completed: false }
      ]
    )
  ]
};
