import { pgEnum } from 'drizzle-orm/pg-core'
import { RECIPE_CATEGORIES_LIST, RECIPE_PREP_DIFFICULTY } from '~~/shared/constants'

export const categoryEnum = pgEnum(
  'recipe_category', 
  RECIPE_CATEGORIES_LIST
);
export const prepDifficultyEnum = pgEnum(
  'recipe_prep_difficulty', 
  RECIPE_PREP_DIFFICULTY
);