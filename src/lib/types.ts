export type NoteColor = "yellow" | "pink" | "blue" | "green" | "purple";

export type Note = {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  category?: string;
};

export type Priority = "high" | "medium" | "low";

export type SubTask = {
  id: string;
  title: string;
  completed: boolean;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  dueDate?: string;
  subtasks: SubTask[];
  created: string;
};

export type TasksState = {
  [key in Priority]: Task[];
};
