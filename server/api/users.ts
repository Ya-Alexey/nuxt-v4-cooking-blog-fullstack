export default defineEventHandler(async (event) => {
  // Метод запроса (GET или POST)
  const method = getMethod(event)

  if (method === 'POST') {
    const body = await readBody(event)
    // Добавляем пользователя (валидацию опустим для простоты)
    const [newUser] = await db.insert(users).values({
      name: body.name,
      email: body.email
    }).returning()

    return newUser
  }

  if (method === 'GET') {
    // Получаем всех пользователей (IDE подсветит типы данных автоматически!)
    return await db.query.users.findMany()
  }
})
