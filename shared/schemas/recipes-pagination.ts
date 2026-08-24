import { z } from 'zod/v4'
import { RECIPE_CATEGORIES_LIST } from '~~/shared/constants';

const DEFAULT_PAGE_NUM = 1;
const DEFAULT_PAGE_LIMIT = 6;
const MAX_PAGE_LIMIT = 12;

const categoryZodSchema = z.enum(RECIPE_CATEGORIES_LIST)

export const queryRecipePaginationSchema = z.object({
  category: categoryZodSchema.optional().catch(undefined),
  page: z.coerce.number().int().positive().catch(DEFAULT_PAGE_NUM),
  limit: z.coerce.number().int().positive().max(MAX_PAGE_LIMIT).catch(DEFAULT_PAGE_LIMIT),
});

export type RecipePaginationParams = z.output<typeof queryRecipePaginationSchema>