import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchNotesProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export const SearchNotes: React.FC<SearchNotesProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-9 w-full md:w-64"
      />
    </div>
  );
};
