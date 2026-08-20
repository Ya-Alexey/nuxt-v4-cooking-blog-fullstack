import { createApiRecipes } from "./recipes";

export function createApiList(apiFetch: typeof $fetch) {
  return {
    recipes: createApiRecipes(apiFetch),
  }
}