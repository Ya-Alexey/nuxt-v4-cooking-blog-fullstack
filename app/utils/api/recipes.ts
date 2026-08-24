import type { RecipePayload } from "~~/server/schemas/recipes";
import type { RecipePaginationParams } from "~~/shared/schemas/recipes-pagination";

export function createApiRecipes(apiFetch: typeof $fetch) {
  const BASE_URL = '/api/recipes';

  const create = (body: RecipePayload) => {
    return apiFetch(BASE_URL, {
      method: 'POST',
      body
    });
  };

  const get = (pagination:  Partial<RecipePaginationParams> = {}) => {
    return apiFetch(BASE_URL, {
      query: pagination,
    });
  }

  const getBySlug = (slug: string) => {
    return apiFetch(`${BASE_URL}/${slug}`)
  }

  const getFeatured = () => {
     return apiFetch(`${BASE_URL}/featured`)
  }
  
  return {
    create,
    get,
    getBySlug,
    getFeatured,
  } as const;
}