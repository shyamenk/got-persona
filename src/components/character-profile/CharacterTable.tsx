import React, { useEffect, useState } from "react";
import { fetchCharacters } from "../../lib/iceAndFireApi";
import Spinner from "../ui/spinner";
import { Character, columns } from "./columns";
import { DataTable } from "./data-table";

const PAGE_SIZE = 10;

async function fetchCharacterData(page: number, pageSize: number) {
  const response = await fetchCharacters(page, pageSize);
  return response;
}

function CharacterTable() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const data = await fetchCharacterData(currentPage, PAGE_SIZE);
        const namedItems = data.filter((item: Character) => item.name);

        if (namedItems.length === PAGE_SIZE) {
          setCharacters(namedItems);
        } else {
          setCurrentPage(currentPage + 1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentPage]);

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <Spinner />
      ) : (
        <DataTable columns={columns} data={characters} />
      )}
    </div>
  );
}

export default CharacterTable;
