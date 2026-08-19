import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './server/utils/schema.ts', // TS-модели таблиц
  out: './server/db/migrations',      // сгенерированные SQL-миграции
  dialect: 'postgresql',              // используемая СУБД
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
})