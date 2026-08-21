import { describe, test, expect } from 'vitest'
import { registerEndpoint } from '@nuxt/test-utils/runtime'
// Импортируем наш реальный хендлер эндпоинта
import recipesGetHandler from './index.get'

describe('GET /api/recipes', () => {
  
  test('должен возвращать успешный ответ со структурой success и data', async () => {
    registerEndpoint('/api/recipes', {
      handler: recipesGetHandler,
      method: 'GET'
    })

    const response = await $fetch('/api/recipes')

    // Проверяем утверждения
    expect(response).toBeDefined()
    expect(response).toHaveProperty('success')
    expect(response).toHaveProperty('data')
    expect(response.success).toBe(true)
    expect(Array.isArray(response.data)).toBe(true)
  })

  test('поля карточки рецепта не должны содержать контент статьи (contentMap)', async () => {

    registerEndpoint('/api/recipes', {
      handler: recipesGetHandler,
      method: 'GET'
    })

    const response = await $fetch('/api/recipes')
    
    if (response.data.length > 0) {
      const firstCard = response.data[0] 
      
      expect(firstCard).not.toHaveProperty('contentMap')
      expect(firstCard).not.toHaveProperty('contentProcess')
    }
  })
})
