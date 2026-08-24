
export const RECIPE_CATEGORIES_LIST = [
  'breakfast', 
  'lunch', 
  'dinner', 
  'quick-bite', 
  'dessert', 
  'vegan',
] as const;

export type RecipeCategory = typeof RECIPE_CATEGORIES_LIST[number]

export const RECIPE_PREP_DIFFICULTY = [
  'easy', 
  'medium', 
  'hard',
] as const;

export type RecipePrepDifficulty = typeof RECIPE_PREP_DIFFICULTY[number]