import type { RecipePrepDifficulty } from "~~/shared/constants"

export const prepRegistry: { [K in RecipePrepDifficulty]: string } = {
  'easy': 'Элементарно',
  'medium': 'Мастер',
  'hard': 'Профи',
} as const;