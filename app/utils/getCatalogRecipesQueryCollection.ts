export function getCatalogRecipesQueryCollection(
  category: CatalogRecipeCategory,
) {
  if (category === NOT_FOUND_CATEGORY) {
    return null
  }
  let query = queryCollection('recipes');
  if (category !== 'all') {
    query = query.where('category', '=', category) 
  }
  return query;
}