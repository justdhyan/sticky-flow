"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Task, SubTask, Priority } from "@/lib/types";
import { animations } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronDown, ChevronUp, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface TaskItemProps {
  task: Task;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
  onUpdateSubtask: (taskId: string, subtaskId: string, completed: boolean) => void;
  onDragStart?: () => void;
}

const priorityColors: Record<Priority, string> = {
  high: "bg-destructive/20 text-destructive border-destructive/40 hover:bg-destructive/30",
  medium: "bg-orange-500/20 text-orange-600 border-orange-500/40 hover:bg-orange-500/30",
  low: "bg-green-500/20 text-green-600 border-green-500/40 hover:bg-green-500/30"
};

const priorityIcons: Record<Priority, string> = {
  high: "🔴",
  medium: "🟠",
  low: "🟢"
};

export function TaskItem({ task, onUpdate, onDelete, onUpdateSubtask, onDragStart }: TaskItemProps) {
  const [showSubtasks, setShowSubtasks] = useState(false);

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  const completedSubtasks = task.subtasks.filter(st => st.completed).length;
  const totalSubtasks = task.subtasks.length;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const formattedDate = task.dueDate
    ? format(new Date(task.dueDate), "MMM d, yyyy")
    : "No due date";

  return (
    <motion.div
      layout
      initial="hidden"
      animate="visible"
      variants={animations.fadeInUp()}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onDragStart={onDragStart}
      className="w-full"
    >
      <Card
        className={cn(
          "p-4 border-l-4 overflow-hidden",
          task.completed
            ? "border-l-gray-300 bg-muted/40"
            : `border-l-${task.priority === "high"
              ? "destructive"
              : task.priority === "medium"
                ? "orange-500"
                : "green-500"}`
        )}
      >
        <div className="flex items-start gap-3">
          <div>
            <Checkbox
              checked={task.completed}
              onCheckedChange={handleToggleComplete}
              className="mt-0.5"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <motion.div
                className="flex-1"
                variants={animations.statusTransition}
                animate={task.completed ? "completed" : "uncompleted"}
              >
                <h3 className={cn(
                  "font-medium text-base",
                  task.completed && "text-muted-foreground line-through"
                )}>
                  {task.title}
                </h3>

                {task.description && (
                  <p className={cn(
                    "text-sm text-muted-foreground mt-1 line-clamp-2",
                    task.completed && "opacity-70"
                  )}>
                    {task.description}
                  </p>
                )}
              </motion.div>

              <Badge variant="outline" className={priorityColors[task.priority]}>
                <span className="mr-1">{priorityIcons[task.priority]}</span>
                <span className="capitalize">{task.priority}</span>
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              {task.dueDate && (
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formattedDate}</span>
                </div>
              )}

              {task.subtasks.length > 0 && (
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {completedSubtasks}/{totalSubtasks}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowSubtasks(!showSubtasks)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {showSubtasks ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </motion.button>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(task.id)}
                className="text-destructive/70 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </motion.button>
            </div>

            <AnimatePresence>
              {showSubtasks && task.subtasks.length > 0 && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={animations.collapse}
                  className="overflow-hidden"
                >
                  <div className="pt-3 mt-3 border-t space-y-2">
                    {task.subtasks.map((subtask) => (
                      <SubtaskItem
                        key={subtask.id}
                        subtask={subtask}
                        taskId={task.id}
                        onUpdate={onUpdateSubtask}
                        disabled={task.completed}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

interface SubtaskItemProps {
  subtask: SubTask;
  taskId: string;
  onUpdate: (taskId: string, subtaskId: string, completed: boolean) => void;
  disabled?: boolean;
}

function SubtaskItem({ subtask, taskId, onUpdate, disabled = false }: SubtaskItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-2"
    >
      <Checkbox
        id={subtask.id}
        checked={subtask.completed}
        onCheckedChange={(checked) => onUpdate(taskId, subtask.id, !!checked)}
        disabled={disabled}
        className="mt-0.5"
      />
      <label
        htmlFor={subtask.id}
        className={cn(
          "text-sm cursor-pointer flex-1",
          subtask.completed && "line-through text-muted-foreground",
          disabled && "opacity-50"
        )}
      >
        {subtask.title}
      </label>
    </motion.div>
  );
}
