export const useCatalogCategory = () => {
  const route = useRoute();

  const currentCategory = computed<CatalogRecipeCategory>(() => {
    const routeCategory = route.params.category;
    if (!routeCategory) {
      return 'all'
    }
    const validCategory = catalogNav.find(({ key }) => key === routeCategory);
    if (!validCategory) {
      return NOT_FOUND_CATEGORY;
    }
    return validCategory.key;
  });

  return currentCategory;
}
