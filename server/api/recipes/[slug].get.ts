import { defineEventHandler, getRouterParam, createError } from 'h3';
import { db } from '~~/server/db';
import { HttpStatus } from '~~/server/utils/httpStatus'
import { sendResponseSuccess } from '~~/server/utils/response'

const isDev = import.meta.dev;

export default defineEventHandler(async (evt) => {
  try {
    const slug = getRouterParam(evt, 'slug');
    if (!slug || typeof slug !== 'string') {
      throw createError({ 
        statusCode: HttpStatus.BadRequest, 
        message: 'Невалидный slug' 
      });
    }
    const recipe = await db.query.recipes.findFirst({
      where: (recipes, { eq }) => eq(recipes.slug, slug)
    });
    if (!recipe) {
      throw createError({ 
        statusCode: HttpStatus.NotFound, 
        message: 'Рецепт не найден' 
      });
    }
    return sendResponseSuccess(evt, recipe)
  } catch (error: any) {
    const statusCode = error?.statusCode
    if (statusCode === HttpStatus.NotFound || statusCode === HttpStatus.BadRequest) {
      throw error
    } 
    throw createError({
      statusCode: HttpStatus.InternalServerError,
      data: {
        success: false as const,
        message: 'Не удалось получить рецепт',
        error: isDev ? error?.message : null
      }
    });
  }
});
