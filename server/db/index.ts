import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import * as recipesSchema from '../schemas/recipes'
import * as enumsSchema from '../schemas/_enums'

const schema = {
  ...recipesSchema,
  ...enumsSchema
}

// Создаем пул соединений
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})

// Инициализируем Drizzle, прокинув схему для работы Relational API
export const db = drizzle(pool, { schema })