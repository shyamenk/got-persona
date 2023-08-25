import React, { useEffect, useState } from "react";
import { batchGuessAgeByNames } from "../../lib/agifyApi";
import { fetchCharacters } from "../../lib/iceAndFireApi";
import Spinner from "../ui/spinner";
import { Character, Columns } from "./Columns";
import { DataTable } from "./DataTable";

const PAGE_SIZE = 10;
const NAMES_BATCH_SIZE = 10;

const apiCache: Record<number, Character[]> = {};
const ageCache: Record<string, number | null> = {};

function getFirstNames(nameList: Character[]): string[] {
  return nameList.map((item: Character) => item.name.split(" ")[0]);
}

function batchNamesList(namesList: string[]): string[][] {
  const nameBatches = [];
  for (let i = 0; i < namesList.length; i += NAMES_BATCH_SIZE) {
    nameBatches.push(namesList.slice(i, i + NAMES_BATCH_SIZE));
  }
  return nameBatches;
}

async function fetchAgeDataForBatch(batch: string[]): Promise<void> {
  const ages = await batchGuessAgeByNames(batch);
  for (let i = 0; i < batch.length; i++) {
    ageCache[batch[i]] = ages[i];
  }
}

async function fetchCharacterData(page: number, pageSize: number) {
  if (apiCache[page]) {
    return apiCache[page];
  } else {
    const response = await fetchCharacters(page, pageSize);
    const dataWithNames = response.filter((item: Character) => item.name);

    const namesList = getFirstNames(dataWithNames);
    const nameBatches = batchNamesList(namesList);

    await Promise.all(nameBatches.map(fetchAgeDataForBatch));

    const charactersWithAge = dataWithNames.map((item: Character) => ({
      ...item,
      age: ageCache[item.name.split(" ")[0]],
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
    <div className="container mx-auto py-6">
      {loading ? (
        <Spinner />
      ) : (
        <DataTable
          Columns={Columns}
          data={characters}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default CharacterTable;
