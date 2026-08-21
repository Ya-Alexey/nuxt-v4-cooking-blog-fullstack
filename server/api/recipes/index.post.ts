import { z } from 'zod/v4';
import { createError, defineEventHandler, readBody } from 'h3'
import { db } from '~~/server/db';
import { insertRecipeSchema, recipes } from '~~/server/schemas/recipes';
import { HttpStatus } from '~~/server/utils/httpStatus';
import { sendResponseSuccess } from '~~/server/utils/response';

const isDev = import.meta.dev;

export default defineEventHandler(async (evt) => {
  try {
    const body = await readBody(evt);
    const validatedData = insertRecipeSchema.parse(body);
    const [ newRecipe ] = await db
      .insert(recipes)
      .values(validatedData)
      .returning();

    return sendResponseSuccess(evt, newRecipe, HttpStatus.Created);
  } catch (error: any) {
    const isZodError = error instanceof z.ZodError;
    const statusCode = isZodError 
      ? HttpStatus.BadRequest 
      : HttpStatus.InternalServerError;
    
    const errorMessage = isZodError 
      ? 'Ошибка валидации входящих данных' 
      : 'Внутренняя ошибка сервера';

    throw createError({
      statusCode,
      data: {
        success: false as const,
        message: errorMessage,
        error: isDev ? error?.message : null
      }
    });
  }
});