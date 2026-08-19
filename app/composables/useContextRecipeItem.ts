import type { RecipesCollectionItem } from "@nuxt/content";

const provideKey: InjectionKey<Ref<RecipesCollectionItem | null | undefined>> = Symbol('context-recipe-item');

export const useProvideRecipeItemContext = (
  recipeItem: Ref<RecipesCollectionItem | null | undefined>
) => {
  provide(provideKey, recipeItem);
}

export const useInjectRecipeItemContext = () => {
  const recipeItem = inject(provideKey);
  if (!recipeItem) {
    throw new Error('useInjectRecipeItemContext должен вызываться строго внутри компонента с использованием useProvideRecipeItemContext')
  }
  return recipeItem;
}
