import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export type Character = {
  id: number;
  name: string;
  gender: string;
  culture: string;
  born: string;
  died: string;
  age: number | null;
};

const isColumnForFiltering = (key: string): boolean => {
  return key === "name" || key === "culture";
};
const createSortableColumn = (
  accessorKey: keyof Character,
  label: string
): ColumnDef<Character> => {
  return {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    enableGlobalFilter: isColumnForFiltering(accessorKey),
  };
};

export const Columns: ColumnDef<Character>[] = [
  createSortableColumn("name", "Name"),
  createSortableColumn("gender", "Gender"),
  createSortableColumn("culture", "Culture"),
  createSortableColumn("born", "Born"),
  createSortableColumn("died", "Died"),
  createSortableColumn("age", "Age"),
];
