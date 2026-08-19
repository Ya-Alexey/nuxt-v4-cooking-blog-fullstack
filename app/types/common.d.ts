import type { RecipesCollectionItem } from '@nuxt/content';
import type { RecipeCardFieldsKey } from '~/utils/selectRecipeCardFields';

export type ControlTag = 'div' | 'soan' | 'button' | 'a' | 'NuxtLink';

export type RecipePrep = RecipesCollectionItem['prep']
export type RecipeCategory = RecipesCollectionItem['category']

export type RecipeCard = Pick<
  RecipesCollectionItem, 
  RecipeCardFieldsKey
>
export type RecipeWelcome = Pick<
  RecipesCollectionItem, 
  "title" | "welcomeDescription" | "preview" | "prep" | "servesCount" | "prepTime"
>