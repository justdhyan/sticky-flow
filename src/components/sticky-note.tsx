import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { X, Edit2, Save, Palette, Tag } from "lucide-react";
import Markdown from "react-markdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NoteColor = "yellow" | "pink" | "blue" | "green" | "purple";

export type StickyNoteProps = {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  category?: string;
  categories?: string[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, content: string, color: NoteColor, category?: string) => void;
};

export const StickyNote: React.FC<StickyNoteProps> = ({
  id,
  title: initialTitle,
  content: initialContent,
  color: initialColor,
  category: initialCategory = "General",
  categories = [],
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [color, setColor] = useState<NoteColor>(initialColor);
  const [category, setCategory] = useState(initialCategory);
  const [showFormatHelp, setShowFormatHelp] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    onUpdate(id, title, content, color, category);
    setIsEditing(false);
  };

  const handleColorChange = (newColor: NoteColor) => {
    setColor(newColor);
    if (!isEditing) {
      onUpdate(id, title, content, newColor, category);
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    if (!isEditing) {
      onUpdate(id, title, content, color, newCategory);
    }
  };

  const colorOptions: { color: NoteColor; label: string }[] = [
    { color: "yellow", label: "Yellow" },
    { color: "pink", label: "Pink" },
    { color: "blue", label: "Blue" },
    { color: "green", label: "Green" },
    { color: "purple", label: "Purple" },
  ];

  const formatHelpText = `
## Markdown Tips
- **Bold** text: \`**text**\`
- *Italic* text: \`*text*\`
- # Heading: \`# Heading\`
- ## Subheading: \`## Subheading\`
- [Link](https://example.com): \`[Link](url)\`
- Lists:
  \`\`\`
  - Item 1
  - Item 2
  \`\`\`
- Numbered lists:
  \`\`\`
  1. First
  2. Second
  \`\`\`
  `;

  return (
    <Card className={`sticky-note sticky-note-${color} pop-in overflow-hidden p-4 flex flex-col h-full`}>
      {isEditing ? (
        <div className="flex flex-col gap-2 h-full">
          <div className="flex items-center justify-between gap-2">
            <Input
              ref={titleInputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title"
              className="bg-transparent border-none text-primary focus-visible:ring-0 text-lg font-medium"
            />
            <div className="flex gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setShowFormatHelp(!showFormatHelp)}
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M2.5 4.5C2.5 3.09886 3.59886 2 5 2H10C11.4011 2 12.5 3.09886 12.5 4.5V10.5C12.5 11.9011 11.4011 13 10 13H5C3.59886 13 2.5 11.9011 2.5 10.5V4.5ZM5 3C4.15114 3 3.5 3.65114 3.5 4.5V10.5C3.5 11.3489 4.15114 12 5 12H10C10.8489 12 11.5 11.3489 11.5 10.5V4.5C11.5 3.65114 10.8489 3 10 3H5ZM7.5 5.5C8.05228 5.5 8.5 5.05228 8.5 4.5C8.5 3.94772 8.05228 3.5 7.5 3.5C6.94772 3.5 6.5 3.94772 6.5 4.5C6.5 5.05228 6.94772 5.5 7.5 5.5ZM5 8.5H10C10.2761 8.5 10.5 8.27614 10.5 8C10.5 7.72386 10.2761 7.5 10 7.5H5C4.72386 7.5 4.5 7.72386 4.5 8C4.5 8.27614 4.72386 8.5 5 8.5ZM5 10.5H8C8.27614 10.5 8.5 10.2761 8.5 10C8.5 9.72386 8.27614 9.5 8 9.5H5C4.72386 9.5 4.5 9.72386 4.5 10C4.5 10.2761 4.72386 10.5 5 10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Formatting Help</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Tag className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Category</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DropdownMenuContent>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <DropdownMenuItem
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={category === cat ? "bg-secondary" : ""}
                      >
                        {cat}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => handleCategoryChange("General")}>
                        General
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCategoryChange("Work")}>
                        Work
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCategoryChange("Personal")}>
                        Personal
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCategoryChange("Ideas")}>
                        Ideas
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Palette className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2" align="end">
                  <div className="flex gap-1">
                    {colorOptions.map((opt) => (
                      <TooltipProvider key={opt.color}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => handleColorChange(opt.color)}
                              className={`w-6 h-6 rounded-full sticky-note-${opt.color} ${
                                color === opt.color ? "ring-2 ring-primary" : ""
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
                </PopoverContent>
              </Popover>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleSave}
                className="h-8 w-8"
              >
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {showFormatHelp && (
            <div className="bg-background/90 border rounded-md p-2 mb-2 text-xs overflow-y-auto max-h-[200px]">
              <Markdown>{formatHelpText}</Markdown>
            </div>
          )}

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note content... (Supports Markdown)"
            className="flex-1 bg-transparent border-none text-primary/90 focus-visible:ring-0 resize-none min-h-[120px]"
          />
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col flex-1">
              <h3 className="text-lg font-medium line-clamp-2">{title}</h3>
              {category && (
                <span className="text-xs text-muted-foreground bg-background/30 rounded-full px-2 py-0.5 w-fit mt-1">
                  {category}
                </span>
              )}
            </div>
            <div className="flex gap-1 items-center shrink-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsEditing(true)}
                      className="h-8 w-8"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Tag className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Category</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DropdownMenuContent>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <DropdownMenuItem
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={category === cat ? "bg-secondary" : ""}
                      >
                        {cat}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => handleCategoryChange("General")}>
                        General
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCategoryChange("Work")}>
                        Work
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCategoryChange("Personal")}>
                        Personal
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCategoryChange("Ideas")}>
                        Ideas
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Palette className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2" align="end">
                  <div className="flex gap-1">
                    {colorOptions.map((opt) => (
                      <TooltipProvider key={opt.color}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => handleColorChange(opt.color)}
                              className={`w-6 h-6 rounded-full sticky-note-${opt.color} ${
                                color === opt.color ? "ring-2 ring-primary" : ""
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
                </PopoverContent>
              </Popover>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(id)}
                      className="h-8 w-8 text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="mt-2 flex-1 overflow-y-auto prose prose-sm max-w-none prose-h1:text-lg prose-h1:mt-3 prose-h1:mb-2 prose-p:my-1 prose-headings:my-1">
            <Markdown>{content}</Markdown>
          </div>
        </div>
      )}
    </Card>
  );
};
