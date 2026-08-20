import type { RecipePayload } from "~~/server/schemas/recipes";

export function createApiRecipes(apiFetch: typeof $fetch) {
  const BASE_URL = '/api/recipes';

  const create = (body: RecipePayload) => {
    return apiFetch(BASE_URL, {
      method: 'POST',
      body
    });
  };

  const get = () => {
    return apiFetch(BASE_URL)
  }
  
  return {
    create,
    get,
  } as const;
}