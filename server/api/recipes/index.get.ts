import { createError, defineEventHandler, getQuery } from 'h3';
import { sendResponseSuccess } from '~~/server/utils/response'
import { HttpStatus } from '~~/server/utils/httpStatus'
import { db } from '~~/server/db' 
import { recipeCardFields } from '~~/server/utils/recipes';
import { and, count, eq } from 'drizzle-orm';
import { queryRecipePaginationSchema } from '~~/shared/schemas/recipes-pagination'
import { recipes } from '~~/server/schemas/recipes';

const isDev = import.meta.dev;

export default defineEventHandler(async (evt) => {
  const rawQuery = getQuery(evt);
  const { category, page, limit } = queryRecipePaginationSchema.parse(rawQuery);
  const offset = (page - 1) * limit;

  const conditions = [];
  if (category) {
    conditions.push(eq(recipes.category, category))
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined

  try {
    const [recipeCards, [countResult]] = await Promise.all([
      db.select(recipeCardFields)
        .from(recipes)
        .where(whereClause)
        .limit(limit)
        .offset(offset),
      db.select({ total: count() })
        .from(recipes)
        .where(whereClause)
    ]);

    const totalItems = countResult?.total ?? 0;
    const totalPages = Math.ceil(totalItems / limit);
    return sendResponseSuccess(evt, {
      data: recipeCards,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
        limit,
      }
    });
  } catch (error: any) {
    throw createError({
      statusCode: HttpStatus.InternalServerError,
      data: {
        success: false as const,
        message: 'Не удалось получить список рецептов',
        error: isDev ? error?.message : null
      }
    });
  }
})
