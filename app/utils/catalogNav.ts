import type { RecipeCategory } from "~~/shared/constants";

interface CatalogNav {
  key: RecipeCategory | 'all'
  label: string
  link: string
}

export type CatalogRecipeCategory = RecipeCategory | 'all' | 'not-found'

export const NOT_FOUND_CATEGORY = 'not-found';

export const catalogNav: Readonly<CatalogNav[]> = [
  {
    key: 'all',
    label: 'Все',
    link: '/recipes-catalog',
  },
  {
    key: 'breakfast',
    label: 'Завтрак',
    link: '/recipes-catalog/breakfast',
  },
  {
    key: 'lunch',
    label: 'Обед',
    link: '/recipes-catalog/lunch',
  },
  {
    key: 'dinner',
    label: 'Ужин',
    link: '/recipes-catalog/dinner',
  },
  {
    key: 'quick-bite',
    label: 'Перекус',
    link: '/recipes-catalog/quick-bite',
  },
  {
    key: 'dessert',
    label: 'Десерт',
    link: '/recipes-catalog/dessert',
  },
  {
    key: 'vegan',
    label: 'Веган',
    link: '/recipes-catalog/vegan',
  },
];