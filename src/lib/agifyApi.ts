const AGIFY_API_BASE_URL = "https://api.agify.io/";

export const guessAgeByName = async (name: string) => {
  let firstName = name.split(" ")[0];
  console.log(firstName);

  const response = await fetch(`${AGIFY_API_BASE_URL}?name=${firstName}`);
  const data = await response.json();
  return data.age;
};
