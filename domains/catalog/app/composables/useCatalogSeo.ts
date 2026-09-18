import { type CatalogRecipeCategory, NOT_FOUND_CATEGORY } from "#domain_catalog/utils/catalogNav";
import { catalogSeo } from "#domain_catalog/utils/catalogSeo";

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
