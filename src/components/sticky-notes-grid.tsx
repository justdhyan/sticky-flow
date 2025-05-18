import React from "react";
import { StickyNote, StickyNoteProps } from "@/components/sticky-note";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

type NoteColor = "yellow" | "pink" | "blue" | "green" | "purple";

export type Note = {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  category?: string;
};

type StickyNotesGridProps = {
  notes: Note[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, content: string, color: NoteColor, category?: string) => void;
  categories?: string[];
};

export const StickyNotesGrid: React.FC<StickyNotesGridProps> = ({
  notes,
  onDelete,
  onUpdate,
  categories = [],
}) => {
  const [orderedNotes, setOrderedNotes] = React.useState<Note[]>([]);

  // Initialize ordered notes when notes change
  React.useEffect(() => {
    setOrderedNotes(notes);
  }, [notes]);

  const onDragEnd = (result: DropResult) => {
    // Dropped outside the list
    if (!result.destination) return;

    const items = Array.from(orderedNotes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOrderedNotes(items);
  };

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-center">
        <h3 className="text-lg font-medium mb-2">No notes yet</h3>
        <p className="text-muted-foreground">
          Create a new note to get started!
        </p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="notes-grid">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {orderedNotes.map((note, index) => (
              <Draggable key={note.id} draggableId={note.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <StickyNote
                      id={note.id}
                      title={note.title}
                      content={note.content}
                      color={note.color}
                      category={note.category}
                      onDelete={onDelete}
                      onUpdate={onUpdate}
                      categories={categories}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
