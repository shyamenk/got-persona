import React, { useEffect, useState } from "react";
import { guessAgeByName } from "../../lib/agifyApi";
import { fetchCharacters } from "../../lib/iceAndFireApi";
import Spinner from "../ui/spinner";
import { Character, Columns } from "./Columns";
import { DataTable } from "./DataTable";

const PAGE_SIZE = 10;

const apiCache: Record<number, Character[]> = {};
const ageCache: Record<string, number | null> = {};

async function fetchCharacterData(page: number, pageSize: number) {
  if (apiCache[page]) {
    return apiCache[page];
  } else {
    const response = await fetchCharacters(page, pageSize);
    const dataWithNames = response.filter((item: Character) => item.name);

    const agePromises = dataWithNames.map(async (item: Character) => {
      if (!ageCache[item.name]) {
        const age = await guessAgeByName(item.name);
        ageCache[item.name] = age;
      }
    });

    await Promise.all(agePromises);

    const charactersWithAge = dataWithNames.map((item: Character) => ({
      ...item,
      age: ageCache[item.name],
    }));

    apiCache[page] = charactersWithAge;
    return charactersWithAge;
  }
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
        if (data.length === PAGE_SIZE) {
          setCharacters(data);
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
        <DataTable
          columns={Columns}
          data={characters}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default CharacterTable;
