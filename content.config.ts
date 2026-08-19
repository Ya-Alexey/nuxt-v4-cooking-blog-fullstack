import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const recipeSchema = z.object({
  title: z.string(), // вариант как для seo, так и для контента
  description: z.string(), // техничное опиисания для seo
  welcomeDescription: z.string(), // более художественное описание
  preview: z.string(),
  category: z.enum([
    'breakfast', 
    'lunch', 
    'dinner', 
    'quick-bite', 
    'dessert',
    'vegan',
  ]),
  prep: z.enum([
    'easy',
    'medium',
    'hard',
  ]),
  vegan: z.boolean().optional(),
  servesCount: z.number(),
  featured: z.boolean().default(false), // Для слайдера "Рекомендуем"
  ingredients: z.array(z.string()),
  equipment: z.array(z.string()).optional(),
  prepTime: z.number(), // Время готовки в минутах
  nutritional: z.array(z.string()), // калории/белки/жирки/углеводы
  nutritionalNote: z.string(), // примечания к nutritional, порции разные пример: ("на 1 кг куры")
});

export default defineContentConfig({
  collections: {
    recipes: defineCollection({
      source: 'recipes/**/*.md',
      type: 'page',
      schema: recipeSchema,
    }),
  },
});

