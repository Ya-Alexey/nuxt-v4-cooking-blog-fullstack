import { createError, defineEventHandler } from 'h3';
import { sendResponseSuccess } from '~~/server/utils/response'
import { HttpStatus } from '~~/server/utils/httpStatus'
import { db } from '~~/server/db' 
import { recipes } from '~~/server/schemas/recipes'

const isDev = import.meta.dev;

export default defineEventHandler(async (evt) => {
  try {
    const recipeCards = await db
      .select({
        id: recipes.id,
        title: recipes.title,
        preview: recipes.preview,
        description: recipes.description,
        welcomeDescription: recipes.welcomeDescription,
        prep: recipes.prep,
        prepTime: recipes.prepTime,
        servesCount: recipes.servesCount,
        vegan: recipes.vegan,
        category: recipes.category,
      })
      .from(recipes)
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
})
