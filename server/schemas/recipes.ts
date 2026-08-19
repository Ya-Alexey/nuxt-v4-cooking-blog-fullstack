import { pgTable, serial, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core'
import { categoryEnum, prepDifficultyEnum } from './_enums'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description').notNull(),
  welcomeDescription: text('welcome_description').notNull(),
  preview: text('preview').notNull(),
  category: categoryEnum('category').notNull(),
  prep: prepDifficultyEnum('prep').notNull(),
  vegan: boolean('vegan').default(false).notNull(),
  servesCount: integer('serves_count').notNull(),
  featured: boolean('featured').default(false).notNull(),
  prepTime: integer('prep_time').notNull(),
  nutritionalNote: text('nutritional_note').notNull(),
  ingredients: text('ingredients').array().notNull(),
  nutritional: text('nutritional').array().notNull(),
  equipment: text('equipment').array(),
  contentMap: text('content_map').notNull(),
  contentProcess: text('content_process').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const recipeCardSchema = createSelectSchema(recipes).pick({
  id: true,
  preview: true,
  title: true,
  description: true,
  welcomeDescription: true,
  prep: true,
  prepTime: true,
  servesCount: true,
  vegan: true,
  slug: true,
});

type InferZodOutput<T> = T extends { _output: infer O } ? O : never;

export type Recipe = typeof recipes.$inferSelect
export type RecipeCard = InferZodOutput<typeof recipeCardSchema>

const baseInsertSchema = createInsertSchema(recipes)

// Схема для валидации при создании: добавляем правила, которых нет в БД (например, длину строки)
export const insertRecipeSchema = baseInsertSchema.extend({
  title: baseInsertSchema.shape.title.min(3, "Название слишком короткое"),
  description: baseInsertSchema.shape.description.max(255, "Описание слишком длинное"),
})

// Схема для отдачи наружу: например, мы хотим скрыть внутренние технические поля (updatedAt)
export const publicRecipeResponseSchema = createSelectSchema(recipes)
  .omit({ updatedAt: true }) // Фронтенд никогда не увидит это поле
