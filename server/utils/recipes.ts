import { recipes } from '~~/server/schemas/recipes'

export const recipeCardFields = {
  id: recipes.id,
  title: recipes.title,
  preview: recipes.preview,
  description: recipes.description,
  welcomeDescription: recipes.welcomeDescription,
  prep: recipes.prep,
  prepTime: recipes.prepTime,
  servesCount: recipes.servesCount,
  vegan: recipes.vegan,
  category: recipes.category,
  slug: recipes.slug,
}