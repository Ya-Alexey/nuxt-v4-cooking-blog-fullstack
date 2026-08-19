import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Типы для фронтенда/бэкенда, которые Drizzle выведет автоматически!
export type User = typeof users.$inferSelect       // Тип юзера при выборке из БД
export type NewUser = typeof users.$inferInsert   // Тип юзера при создании (без ID)
