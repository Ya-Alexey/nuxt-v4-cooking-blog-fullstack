import type { CollectionQueryBuilder, RecipesCollectionItem } from '@nuxt/content'

const RECIPE_CARD_FIELDS = [
  'id', 
  'preview', 
  'title', 
  'description', 
  'welcomeDescription', 
  'prep', 
  'prepTime', 
  'servesCount', 
  'path', 
  'vegan',
] as const;

export type RecipeCardFieldsKey = typeof RECIPE_CARD_FIELDS[number];

export function selectRecipeCardFields(
  query: CollectionQueryBuilder<RecipesCollectionItem>
) {
  return query.select(...RECIPE_CARD_FIELDS)
}
