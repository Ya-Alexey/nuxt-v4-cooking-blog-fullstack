import pg from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { recipes } from '../schemas/recipes'
import { fakerRU as faker } from '@faker-js/faker'
import { transliterate } from 'transliteration'
import dotenv from 'dotenv'

dotenv.config()

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
})
const db = drizzle(pool)

function generateMockRecipes(count: number) {
  const categories = ['breakfast', 'lunch', 'dinner', 'quick-bite', 'dessert', 'vegan'] as const
  const preps = ['easy', 'medium', 'hard'] as const
  
  const result = []

  for (let i = 0; i < count; i++) {
    const title = faker.food.dish() 
    
    const slug = `${transliterate(title)
      .toLowerCase() 
      .replace(/[^a-z0-9]+/g, '-')}-${faker.number.int({ min: 1000, max: 9999 })}`;

    result.push({
      title,
      slug,
      description: faker.food.description(), // Описание вкуса/блюда
      welcomeDescription: `Потрясающий и очень нежный рецепт: ${title}!`,
      preview: faker.image.urlLoremFlickr({ category: 'food' }), 
      category: faker.helpers.arrayElement(categories),
      prep: faker.helpers.arrayElement(preps),       
      vegan: faker.datatype.boolean(),
      servesCount: faker.number.int({ min: 1, max: 6 }),
      featured: faker.datatype.boolean(0.2), // 20% рецептов станут "Рекомендуемыми"
      prepTime: faker.number.int({ min: 10, max: 120 }), 
      nutritionalNote: 'на 100 грамм блюда',
      

      ingredients: faker.helpers.multiple(() => `${faker.food.ingredient()} — по вкусу`, { count: { min: 3, max: 8 } }),
      nutritional: [
        `Калории: ${faker.number.int({ min: 100, max: 600 })} ккал`,
        `Белки: ${faker.number.int({ min: 2, max: 40 })} г`,
        `Жиры: ${faker.number.int({ min: 1, max: 35 })} г`
      ],
      equipment: faker.helpers.multiple(() => faker.food.spice(), { count: { min: 1, max: 3 } }), 
      
      contentMap: `### Ингредиенты на карте для ${title}\n\n* Используйте только свежие продукты.\n* Локация ингредиентов: местный маркет.`,
      contentProcess: `### Пошаговое руководство\n\n1. Подготовьте всё необходимое.\n2. Смешайте ингредиенты согласно рецепту.\n3. Подавайте к столу горячим.`
    })
  }

  return result
}

async function main() {
  const COUNT = 50 
  console.log(`⏳ Генерируем ${COUNT} случайных рецептов через Faker...`)
  
  const mockRecipes = generateMockRecipes(COUNT)

  try {
    // Перед заполнением можно очистить таблицу, если хотите начать с чистого листа:
    await db.delete(recipes)
    await db.insert(recipes).values(mockRecipes)
    console.log(`✅ База данных успешно заполнена! Залито ${COUNT} рецептов.`)
  } catch (error) {
    console.error('❌ Ошибка при сидинге базы:', error)
  } finally {
    await pool.end()
    process.exit(0)
  }
}

main()
