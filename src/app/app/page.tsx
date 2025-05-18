"use client";

import React, { useState, useEffect } from "react";
import { StickyNotesGrid, Note } from "@/components/sticky-notes-grid";
import { AddNote } from "@/components/add-note";
import { SearchNotes } from "@/components/search-notes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Moon, Sun, Download, Upload } from "lucide-react";
import { useTheme } from "next-themes";

// Sample notes for first-time users
const sampleNotes: Note[] = [
  {
    id: "note-1",
    title: "Welcome to StickyFlow!",
    content: "This is your personal sticky notes app. Add, edit, and organize your thoughts with colorful notes.",
    color: "yellow",
    category: "General",
  },
  {
    id: "note-2",
    title: "How to use",
    content: "• Click on a note to edit\n• Use the color picker to change colors\n• Click the plus button to add new notes\n• All notes are saved in your browser",
    color: "blue",
    category: "General",
  },
  {
    id: "note-3",
    title: "Shopping List",
    content: "• Eggs\n• Milk\n• Bread\n• Apples\n• Coffee",
    color: "green",
    category: "Personal",
  },
  {
    id: "note-4",
    title: "Project Ideas",
    content: "1. Learn a new programming language\n2. Build a mobile app\n3. Create a personal website\n4. Write a blog post",
    color: "pink",
    category: "Work",
  },
];

// Available categories
const defaultCategories = ["All", "General", "Work", "Personal", "Ideas"];

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const { theme, setTheme } = useTheme();

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("sticky-notes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse notes from localStorage:", e);
        setNotes(sampleNotes); // Use sample notes if parsing fails
      }
    } else {
      // Use sample notes for first-time users
      setNotes(sampleNotes);
    }

    // Load saved categories
    const savedCategories = localStorage.getItem("sticky-notes-categories");
    if (savedCategories) {
      try {
        const parsedCategories = JSON.parse(savedCategories);
        setCategories(["All", ...parsedCategories.filter((cat: string) => cat !== "All")]);
      } catch (e) {
        console.error("Failed to parse categories from localStorage:", e);
      }
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("sticky-notes", JSON.stringify(notes));

    // Extract categories from notes and save
    const uniqueCategories = [...new Set(notes.map(note => note.category).filter(Boolean))];
    const allCategories: string[] = Array.from(
  new Set(
    notes
      .map(note => note.category)
      .filter((cat): cat is string => typeof cat === "string")
      .concat("All")
  )
);
    setCategories(allCategories);

    localStorage.setItem("sticky-notes-categories", JSON.stringify(allCategories.filter(cat => cat !== "All")));
  }, [notes]);

  // Function to add a new note
  const handleAddNote = (title: string, content: string, color: Note["color"], category: string = "General") => {
    const newNote: Note = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title,
      content,
      color,
      category,
    };
    setNotes([...notes, newNote]);
  };

  // Function to update a note
  const handleUpdateNote = (
    id: string,
    title: string,
    content: string,
    color: Note["color"],
    category?: string
  ) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, title, content, color, category: category || note.category } : note
      )
    );
  };

  // Function to delete a note
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Export notes to file
  const handleExportNotes = () => {
    const notesJson = JSON.stringify(notes, null, 2);
    const blob = new Blob([notesJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `stickyflow-notes-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  // Import notes from file
  const handleImportNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedNotes = JSON.parse(e.target?.result as string);
        if (Array.isArray(importedNotes)) {
          if (window.confirm('Do you want to replace your current notes or merge them?')) {
            // Replace
            setNotes(importedNotes);
          } else {
            // Merge
            const mergedNotes = [...notes];

            // Generate new IDs for imported notes to avoid collisions
            const importedWithNewIds = importedNotes.map(note => ({
              ...note,
              id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
            }));

            setNotes([...mergedNotes, ...importedWithNewIds]);
          }
        }
      } catch (err) {
        console.error('Error importing notes:', err);
        alert('Error importing notes. Please check the file format.');
      }
    };
    reader.readAsText(file);

    // Reset the input
    event.target.value = '';
  };

  // Filter notes based on search term and category
  const filteredNotes = notes.filter(
    (note) =>
      (selectedCategory === "All" || note.category === selectedCategory) &&
      (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
                  Organize your thoughts with colorful notes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle theme">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button variant="ghost" size="icon" onClick={handleExportNotes} title="Export notes">
                <Download className="h-5 w-5" />
              </Button>

              <div className="relative">
                <Button variant="ghost" size="icon" title="Import notes" className="relative">
                  <Upload className="h-5 w-5" />
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportNotes}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    title="Import notes"
                  />
                </Button>
              </div>

              <AddNote onAddNote={handleAddNote} categories={categories.filter(cat => cat !== "All")} />
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <SearchNotes searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="flex flex-wrap gap-2 items-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end">
            <div className="text-sm text-muted-foreground">
              {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
            </div>
          </div>
        </div>
      </header>

      <section className="flex-1 container mx-auto py-8">
        <StickyNotesGrid
          notes={filteredNotes}
          onDelete={handleDeleteNote}
          onUpdate={handleUpdateNote}
          categories={categories.filter(cat => cat !== "All")}
        />

        {filteredNotes.length === 0 && (searchTerm || selectedCategory !== "All") && (
          <div className="text-center py-12">
            <p className="text-lg font-medium mb-2">No matching notes found</p>
            <p className="text-muted-foreground">
              Try changing your search or category filter
            </p>
          </div>
        )}
      </section>

      <footer className="bg-secondary py-4 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>StickyFlow &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  );
}
