import type { RecipePrep } from "~/types/common";

export const prepRegistry: { [K in RecipePrep]: string } = {
  'easy': 'Элементарно',
  'medium': 'Мастер',
  'hard': 'Профи',
} as const;