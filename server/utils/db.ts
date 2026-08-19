import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import * as schema from './schema'

// Создаем пул соединений
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})

// Инициализируем Drizzle, прокинув схему для работы Relational API
export const db = drizzle(pool, { schema })