const AGIFY_BATCH_API_BASE_URL = "https://api.agify.io/";

export const batchGuessAgeByNames = async (
  names: string[]
): Promise<number[]> => {
  const queryParams = names
    .map((name) => `name[]=${encodeURIComponent(name)}`)
    .join("&");
  const response = await fetch(`${AGIFY_BATCH_API_BASE_URL}?${queryParams}`);
  const data = await response.json();

  // Extract the "age" value from each object in the response
  const ages = data.map((entry: { age: number }) => entry.age);

  return ages;
};
