export const getRecipes = async (query: string) => {
  const url = new URL("https://api.edamam.com/api/recipes/v2");
  const app_id = "ecfc8a8c";
  const app_key = "6a5410c5414e58656616eb9ca30ca4db";
  const params = {
    type: "public",
    beta: true,
    random: true,
    q: query,
    app_id,
    app_key,
  };
  url.search = new URLSearchParams(params as any).toString();

  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
