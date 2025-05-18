"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Task, Priority } from "@/lib/types";
import { TaskItem } from "./task-item";
import { animations } from "@/lib/animations";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TaskColumnProps {
  priority: Priority;
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateSubtask: (taskId: string, subtaskId: string, completed: boolean) => void;
  onAddTask: (priority: Priority) => void;
}

const priorityColors: Record<Priority, string> = {
  high: "text-destructive border-destructive/30",
  medium: "text-orange-600 border-orange-500/30",
  low: "text-green-600 border-green-500/30"
};

const priorityBackgrounds: Record<Priority, string> = {
  high: "bg-destructive/5",
  medium: "bg-orange-500/5",
  low: "bg-green-500/5"
};

const priorityIcons: Record<Priority, string> = {
  high: "🔴",
  medium: "🟠",
  low: "🟢"
};

export function TaskColumn({
  priority,
  tasks,
  onUpdateTask,
  onDeleteTask,
  onUpdateSubtask,
  onAddTask
}: TaskColumnProps) {
  const [collapsed, setCollapsed] = useState(false);

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animations.fadeInUp()}
      className={cn(
        "rounded-lg border",
        priorityBackgrounds[priority]
      )}
    >
      <motion.div
        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{priorityIcons[priority]}</span>
          <h3 className={cn(
            "font-medium capitalize",
            priorityColors[priority]
          )}>
            {priority} Priority
          </h3>
          <span className="text-xs text-muted-foreground rounded-full bg-muted px-2 py-0.5">
            {completedTasks}/{totalTasks}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onAddTask(priority);
              }}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            animate={{ rotate: collapsed ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={animations.collapse}
            className="overflow-hidden"
          >
            <Droppable droppableId={priority}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "p-3 min-h-[100px] space-y-3 transition-colors duration-200",
                    snapshot.isDraggingOver && "bg-muted/50"
                  )}
                >
                  {tasks.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      className="flex items-center justify-center h-20 text-muted-foreground text-sm"
                    >
                      No tasks yet
                    </motion.div>
                  ) : (
                    <>
                      {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskItem
                                task={task}
                                onUpdate={onUpdateTask}
                                onDelete={onDeleteTask}
                                onUpdateSubtask={onUpdateSubtask}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
