import { pgEnum } from 'drizzle-orm/pg-core'

export const categoryEnum = pgEnum('recipe_category', [
  'breakfast', 
  'lunch', 
  'dinner', 
  'quick-bite', 
  'dessert', 
  'vegan',
]);

export const prepDifficultyEnum = pgEnum('recipe_prep_difficulty', [
  'easy', 
  'medium', 
  'hard',
]);

export type RecipePrepDifficulty = typeof prepDifficultyEnum.enumValues[number]
export type RecipeCategory = typeof categoryEnum.enumValues[number]