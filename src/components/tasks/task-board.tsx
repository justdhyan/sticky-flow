"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Task, TasksState, Priority } from "@/lib/types";
import { sampleTasks } from "@/lib/sample-data";
import { TaskColumn } from "./task-column";
import { AddTaskDialog } from "./add-task-dialog";
import { QuickAddBar } from "./quick-add-bar";
import { animations } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTheme } from "next-themes";

export function TaskBoard() {
  const [tasks, setTasks] = useState<TasksState>(sampleTasks);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<Priority>("medium");

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks-app-data");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error("Failed to parse tasks from localStorage:", error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks-app-data", JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const sourcePriority = source.droppableId as Priority;
    const destPriority = destination.droppableId as Priority;
    const newTasks = { ...tasks };
    const [movedTask] = newTasks[sourcePriority].splice(source.index, 1);
    if (sourcePriority !== destPriority) {
      movedTask.priority = destPriority;
    }
    newTasks[destPriority].splice(destination.index, 0, movedTask);
    setTasks(newTasks);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    const newTasks = { ...tasks };
    for (const priority of ["high", "medium", "low"] as Priority[]) {
      const index = newTasks[priority].findIndex(task => task.id === taskId);
      if (index !== -1) {
        newTasks[priority][index] = {
          ...newTasks[priority][index],
          ...updates
        };
        break;
      }
    }
    setTasks(newTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    const newTasks = { ...tasks };
    for (const priority of ["high", "medium", "low"] as Priority[]) {
      const index = newTasks[priority].findIndex(task => task.id === taskId);
      if (index !== -1) {
        newTasks[priority].splice(index, 1);
        break;
      }
    }
    setTasks(newTasks);
  };

  const handleUpdateSubtask = (taskId: string, subtaskId: string, completed: boolean) => {
    const newTasks = { ...tasks };
    for (const priority of ["high", "medium", "low"] as Priority[]) {
      const taskIndex = newTasks[priority].findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const subtaskIndex = newTasks[priority][taskIndex].subtasks.findIndex(
          st => st.id === subtaskId
        );
        if (subtaskIndex !== -1) {
          newTasks[priority][taskIndex].subtasks[subtaskIndex].completed = completed;
          break;
        }
      }
    }
    setTasks(newTasks);
  };

  const handleAddNewTask = (task: Omit<Task, "id" | "created">) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      created: new Date().toISOString()
    };
    setTasks({
      ...tasks,
      [newTask.priority]: [...tasks[newTask.priority], newTask]
    });
  };

  // --- New: Smart Add from Quick Add ---
  const handleSmartAddTask = (spec: { title: string; dueDate?: string; priority: string }) => {
    const prio = (["high", "medium", "low"].includes(spec.priority) ? spec.priority : "medium") as Priority;
    handleAddNewTask({
      title: spec.title,
      description: "",
      priority: prio,
      completed: false,
      dueDate: spec.dueDate,
      subtasks: [],
    });
  };

  const openAddTaskDialog = (priority: Priority) => {
    setSelectedPriority(priority);
    setAddDialogOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animations.fadeInUp()}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <p className="text-muted-foreground">
            Organize your tasks by priority
          </p>
        </div>
        <Button
          onClick={() => setAddDialogOpen(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </motion.div>
      {/* ---- Insert Quick Add here ---- */}
      <div className="mb-6">
        <QuickAddBar onAddSmartTask={handleSmartAddTask} />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <motion.div
          variants={animations.staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <TaskColumn
            priority="high"
            tasks={tasks.high}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onUpdateSubtask={handleUpdateSubtask}
            onAddTask={openAddTaskDialog}
          />
          <TaskColumn
            priority="medium"
            tasks={tasks.medium}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onUpdateSubtask={handleUpdateSubtask}
            onAddTask={openAddTaskDialog}
          />
          <TaskColumn
            priority="low"
            tasks={tasks.low}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onUpdateSubtask={handleUpdateSubtask}
            onAddTask={openAddTaskDialog}
          />
        </motion.div>
      </DragDropContext>
      <AddTaskDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAddTask={handleAddNewTask}
        initialPriority={selectedPriority}
      />
    </div>
  );
}
