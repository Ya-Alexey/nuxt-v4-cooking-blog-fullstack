export const useCatalogSeo = (
  category: Ref<CatalogRecipeCategory>
) => {
  const currentSeo = computed(() => {
    if (category.value === NOT_FOUND_CATEGORY) {
      return null;
    }
    return catalogSeo.find(({ key }) => key === category.value) || null;
  });

  return currentSeo;
}
