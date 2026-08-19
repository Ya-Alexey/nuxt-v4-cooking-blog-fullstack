export const useFeaturedRecipes = () => {
  return useLazyAsyncData(
    'recipe-featured', 
    () => {
      const query = queryCollection('recipes')
        .where('featured', '=', true);
        
      return selectRecipeCardFields(query)
        .limit(5)
        .all()
    } 
  );
}
