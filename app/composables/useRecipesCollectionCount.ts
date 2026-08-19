export const useRecipesCollectionCount = (
  category: Ref<CatalogRecipeCategory>
) => {
  return useAsyncData(
    () => `recipes-count-${category.value}`, 
    () => {
      const query = getCatalogRecipesQueryCollection(category.value);
      if (!query) {
        return Promise.resolve(0);
      }
      return query.count()
    },
    {
      default: () => 0,
    }
  );
}
