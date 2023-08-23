const API_BASE_URL = "https://anapioficeandfire.com/api/";

export const fetchCharacters = async (page: number, pageSize: number) => {
  const response = await fetch(
    `${API_BASE_URL}characters?page=${page}&pageSize=${pageSize}`
  );
  const data = await response.json();
  return data;
};
