import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export type Character = {
  id: number;
  name: string;
  gender: string;
  culture: string;
  age: number;
};

export const Columns: ColumnDef<Character>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "culture",
    header: "Culture",
  },
  {
    accessorKey: "born",
    header: "Born",
  },
  {
    accessorKey: "died",
    header: "Died",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
];
