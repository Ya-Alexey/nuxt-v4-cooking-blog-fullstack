/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it } from 'vitest'
import { useCatalogCategory } from '#domain_catalog/composables/useCatalogCategory'
import { NOT_FOUND_CATEGORY } from '#domain_catalog/utils/catalogNav'  

describe('useCatalogCategory composable', () => {
  let route: any

  beforeEach(() => {
    // Получаем доступ к текущему реактивному роуту Nuxt перед каждым тестом
    route = useRoute()
  })

  it('должен возвращать "all", если параметр категории в URL отсутствует', () => {
    // Симулируем URL без параметров: /recipes-catalog
    delete route.params.category

    const currentCategory = useCatalogCategory()
    
    expect(currentCategory.value).toBe('all')
  })

  it('должен возвращать правильный ключ категории, если параметр валиден', () => {
    route.params.category = 'breakfast'

    const currentCategory = useCatalogCategory()
    
    expect(currentCategory.value).toBe('breakfast')
  })

  it('должен возвращать NOT_FOUND_CATEGORY, если такой категории нет в списке', () => {
    route.params.category = 'unknown-category'

    const currentCategory = useCatalogCategory()
    
    expect(currentCategory.value).toBe(NOT_FOUND_CATEGORY)
  })
})
