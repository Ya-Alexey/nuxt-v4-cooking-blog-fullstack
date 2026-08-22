import { eq } from 'drizzle-orm';
import { createError, defineEventHandler } from 'h3';
import { db } from '~~/server/db' 
import { recipes } from '~~/server/schemas/recipes';
import { HttpStatus } from '~~/server/utils/httpStatus';
import { recipeCardFields } from '~~/server/utils/recipes';
import { sendResponseSuccess } from '~~/server/utils/response';

const isDev = import.meta.dev;

export default defineEventHandler(async (evt) => {
  try {
    const recipeCards = await db
      .select(recipeCardFields)
      .from(recipes)
      .where(eq(recipes.featured, true))

    return sendResponseSuccess(evt, recipeCards)
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
});
