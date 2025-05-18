import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Palette } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type NoteColor = "yellow" | "pink" | "blue" | "green" | "purple";

type AddNoteProps = {
  onAddNote: (title: string, content: string, color: NoteColor, category?: string) => void;
  categories?: string[];
};

export const AddNote: React.FC<AddNoteProps> = ({
  onAddNote,
  categories = []
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState<NoteColor>("yellow");
  const [category, setCategory] = useState("General");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onAddNote(title, content, color, category);
      setTitle("");
      setContent("");
      setColor("yellow");
      setCategory("General");
      setOpen(false);
    }
  };

  const colorOptions: { color: NoteColor; label: string }[] = [
    { color: "yellow", label: "Yellow" },
    { color: "pink", label: "Pink" },
    { color: "blue", label: "Blue" },
    { color: "green", label: "Green" },
    { color: "purple", label: "Purple" },
  ];

  // Default categories if none provided
  const availableCategories = categories.length > 0
    ? categories
    : ["General", "Work", "Personal", "Ideas"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 rounded-full">
          <Plus className="h-5 w-5" />
          <span>Add Note</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Input
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="text-lg font-medium"
              />
            </div>

            <div>
              <Textarea
                placeholder="Note content... (Supports Markdown)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="min-h-[150px] resize-none"
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Palette className="h-4 w-4 text-muted-foreground" />
                  <span>Choose color:</span>
                </label>
                <div className="flex gap-2 items-center">
                  {colorOptions.map((opt) => (
                    <TooltipProvider key={opt.color}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => setColor(opt.color)}
                            className={`w-6 h-6 rounded-full transition-all sticky-note-${opt.color} ${
                              color === opt.color
                                ? "ring-2 ring-primary scale-110"
                                : ""
                            }`}
                            aria-label={opt.label}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>{opt.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path
                      d="M1 3.25C1 3.11193 1.11193 3 1.25 3H13.75C13.8881 3 14 3.11193 14 3.25V10.75C14 10.8881 13.8881 11 13.75 11H1.25C1.11193 11 1 10.8881 1 10.75V3.25ZM1.25 2C0.559644 2 0 2.55964 0 3.25V10.75C0 11.4404 0.559644 12 1.25 12H13.75C14.4404 12 15 11.4404 15 10.75V3.25C15 2.55964 14.4404 2 13.75 2H1.25Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      d="M7.5 6C8.32843 6 9 5.32843 9 4.5C9 3.67157 8.32843 3 7.5 3C6.67157 3 6 3.67157 6 4.5C6 5.32843 6.67157 6 7.5 6ZM10.5 4.5C10.5 6.15685 9.15685 7.5 7.5 7.5C5.84315 7.5 4.5 6.15685 4.5 4.5C4.5 2.84315 5.84315 1.5 7.5 1.5C9.15685 1.5 10.5 2.84315 10.5 4.5Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      d="M3.75 8.75C3.33579 8.75 3 9.08579 3 9.5V14.25C3 14.3881 3.11193 14.5 3.25 14.5H11.75C11.8881 14.5 12 14.3881 12 14.25V9.5C12 9.08579 11.6642 8.75 11.25 8.75H3.75ZM2 9.5C2 8.5335 2.7835 7.75 3.75 7.75H11.25C12.2165 7.75 13 8.5335 13 9.5V14.25C13 14.9404 12.4404 15.5 11.75 15.5H3.25C2.55964 15.5 2 14.9404 2 14.25V9.5Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Choose category:</span>
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>Tip: This editor supports Markdown formatting.</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Note</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
