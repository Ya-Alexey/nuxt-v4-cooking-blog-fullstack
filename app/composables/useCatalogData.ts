// import type { RecipeCard } from "~/types/common";

// export const useCatalogData = ({
//   limit,
//   skip,
//   category,
//   page,
// }: {
//   category: Ref<CatalogRecipeCategory>
//   skip: Ref<number>
//   page: Ref<number>
//   limit: number
// }) => {
//   return useAsyncData<RecipeCard[]>(
//     () => `recipes-catalog-${category.value}-${page.value}`, 
//     () => {
//       const query = getCatalogRecipesQueryCollection(category.value);
//       if (!query) {
//         return Promise.resolve([])
//       }
//       return selectRecipeCardFields(query)
//         .limit(limit)
//         .skip(skip.value)
//         .all()
//     }
//   );
// }